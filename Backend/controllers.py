import os

import bcrypt
from dotenv import find_dotenv, load_dotenv
from flask import jsonify, request
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
)
from googlemaps import Client
from main import app, ma
from models import User, db

load_dotenv(dotenv_path=find_dotenv())

jwt = JWTManager(app)


salt = bcrypt.gensalt()

# Access the environment variables
secret_key = os.getenv("VITE_GOOGLE_MAPS_API_KEY")

if secret_key:
    gmaps = Client(key=secret_key)


# Auto generate Schema using models
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


matched_users = {}

# searching_users = {
#     1: {
#         "currentloc": {"lat": 20.01840125104431, "lng": 72.8372607837342},
#         "dest": "asc",
#     },
#     9: {
#         "currentloc": {"lat": 20.01840125104431, "lng": 72.8372607837342},
#         "dest": "asc",
#     },
# }

searching_users = {}


@app.post("/api/login")
def login():
    # Getting user Creds
    userdata = request.get_json()
    email = userdata["email"]
    password = userdata["password"].encode()

    # Getting Creds from db
    curr_user = User.query.filter_by(email=email).first()

    # checking creds
    if curr_user is None:
        return jsonify({"msg": "Invalid Email"}), 401
    elif bcrypt.checkpw(password, curr_user.password):
        # Creating JWT token
        access_token = create_access_token(identity=curr_user.id)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"msg": "Bad password"}), 401


# Create User
@app.post("/api/register")
def register():
    userdata = request.get_json()

    if not userdata["username"] or not userdata["password"]:
        return jsonify({"msg": "Please enter username and pasword"}), 400

    usr = User.query.filter_by(username=userdata["username"]).first()
    em = User.query.filter_by(email=userdata["email"]).first()

    if usr or em:
        return jsonify({"msg": "User already Exists"}), 400
    password = userdata["password"].encode()

    # Hashing Password
    hashed_pass = bcrypt.hashpw(password, salt)

    # commiting Data
    db.session.add(
        User(
            username=userdata["username"],
            age=userdata["age"],
            gender=userdata["gender"],
            pgender=userdata["pgender"],
            pagegrp=userdata["pagegrp"],
            email=userdata["email"],
            password=hashed_pass,
        )
    )
    db.session.commit()
    return jsonify("Success")


@app.post("/api/destination")
def destination():
    autocomplete_data = request.get_json()
    # coordinates = autocomplete_data["geometry"]["location"]
    name = autocomplete_data["name"]
    return name


@app.post("/api/route")
def generate_route():
    locations = request.get_json()
    waypoint = locations["waypoint"]
    destination = locations["destination"]
    # maps_link = f"https://www.google.com/maps/dir/My+Location/{waypoint['lat']},{waypoint['lng']}/{destination['lat']},{destination['lng']} "
    maps_link = f"https://www.google.com/maps/dir/My+Location/{waypoint['lat']},{waypoint['lng']}/{destination}"

    return maps_link


# Adds users to a searching queue
@app.post("/api/search")
@jwt_required()
def search():
    current_userid = get_jwt_identity()
    data = request.get_json()

    global searching_users

    user_obj = {"currentloc": data["loc"], "dest": data["dest"]}
    searching_users.update({current_userid: user_obj})

    return searching_users


# Compares curr user with all other users in the search queue and matchs with nearest one
@app.get("/api/match")
@jwt_required()
def match():
    global searching_users

    current_userid = get_jwt_identity()

    origin = searching_users[current_userid]["currentloc"]

    if origin is None:
        return jsonify("Location not enabled"), 400

    destinations = []
    # print(searching_users)
    # print(len(searching_users))

    if len(searching_users) < 2:
        return jsonify("No other user currently searching"), 401

    for user_id, user_data in searching_users.items():
        if user_id == current_userid:
            continue
        currentloc = user_data.get("currentloc", {})
        if currentloc:
            destination = user_data.get("dest", "")
            result = gmaps.distance_matrix(
                origins=origin,
                destinations=[currentloc],
                units="metric",
                mode="walking",
            )
            if result and "rows" in result and result["rows"]:
                elements = result["rows"][0]["elements"]
                if elements and elements[0]["status"] == "OK":
                    distance_text = elements[0]["distance"].get("value")
                else:
                    distance_text = "N/A"
            else:
                distance_text = "N/A"
            # print(distance_text)
            if (
                distance_text < 50000
                and destination == searching_users[current_userid]["dest"]
            ):
                response_data = {
                    "user_id": user_id,
                    "destination": destination,
                    "distance": distance_text,
                    "loc": currentloc,
                }
                destinations.append(response_data)

    # print(len(destinations), destinations)
    if len(destinations) == 0:
        return jsonify("No user near you!"), 402

    destinations = sorted(destinations, key=lambda x: x["distance"])

    global matched_users

    user1 = {
        "user_id": current_userid,
        "accepted": False,
        "loc": origin,
        "matched_id": destinations[0]["user_id"],
    }

    user2 = {
        "user_id": destinations[0]["user_id"],
        "accepted": False,
        "loc": destinations[0]["loc"],
        "matched_id": current_userid,
    }
    if user1["user_id"] not in matched_users:
        matched_users[user1["user_id"]] = user1

    if user2["user_id"] not in matched_users:
        matched_users[user2["user_id"]] = user2

    # print(matched_users)

    return matched_users


# Checks if a user has accepted
@app.get("/api/accepted")
@jwt_required()
def origin_accepted():
    current_userid = get_jwt_identity()
    global matched_users

    try:
        matched_users[current_userid]["accepted"] = True

        return matched_users
    except:  # noqa
        return "no user is matched with current user.", 401


@app.get("/api/reject")
@jwt_required()
def reject():
    global matched_users
    global searching_users

    current_userid = get_jwt_identity()
    try:
        other_user_id = matched_users[current_userid]["matched_id"]
        del searching_users[current_userid]
        del matched_users[current_userid]

        del searching_users[other_user_id]
        del matched_users[other_user_id]

    except:
        return "Something went wrong. fix it", 400

    return jsonify("Rejected")


# Checks if both user accepted
@app.get("/api/consent")
@jwt_required()
def consent():
    current_userid = get_jwt_identity()

    try:
        other_user_id = matched_users[current_userid]["matched_id"]

        if (
            matched_users[current_userid]["accepted"]
            and matched_users[other_user_id]["accepted"]
        ):
            return "both accepted"
        else:
            return "both did not accepted", 401
    except:  # noqa
        return "no user is matched with current user.", 401


@app.get("/api/id")
@jwt_required()
def id():
    current_userid = get_jwt_identity()
    user_detail = User.query.filter_by(id=current_userid).first()
    # print(user_detail)
    if user_detail:
        user_data = {
            "id": user_detail.id,
            "username": user_detail.username,
            "age": user_detail.age,
            "gender": user_detail.gender,
        }
        return user_data, 200
    else:
        return {"message": "User not found"}
    # return str(current_userid)


@app.get("/api/id/<int:matchedId>")
# @jwt_required()
def get_user_by_id(matchedId):
    user_detail = User.query.filter_by(id=matchedId).first()
    if user_detail:
        user_data = {
            "id": user_detail.id,
            "username": user_detail.username,
            "age": user_detail.age,
            "gender": user_detail.gender,
        }
        print(user_data)
        return user_data, 200
    else:
        return {"message": "User not found"}, 404


@app.route("/api")
def index():
    return "I love automate"
