from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import jwt
import datetime

# Secret key for JWT
SECRET_KEY = "your_secret_key"

router = APIRouter()

class User(BaseModel):
    username: str
    password: str

# Dummy user database
fake_users = {
    "testuser": {"password": "testpass"}
}

def create_jwt_token(username: str):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    token = jwt.encode({"sub": username, "exp": expiration}, SECRET_KEY, algorithm="HS256")
    return token

@router.post("/login")
def login(user: User):
    if user.username in fake_users and fake_users[user.username]["password"] == user.password:
        token = create_jwt_token(user.username)
        return {"access_token": token}
    raise HTTPException(status_code=401, detail="Invalid credentials")

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
