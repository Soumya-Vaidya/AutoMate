# main.py

from controllers import app as controllers
from flask import Flask
from models import db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///automate.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS "] = False


db.init_app(app)

app.register_blueprint(controllers)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
