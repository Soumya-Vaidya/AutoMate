from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///automate.db"

app.config["JWT_SECRET_KEY"] = "SKBw2u4x246vBnTxBcGrwpUNjbvXZm"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1500)

# Live Link - https://udayp.live
db = SQLAlchemy(app)


ma = Marshmallow(app)

CORS(app)


from controllers import *

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", debug=True)
