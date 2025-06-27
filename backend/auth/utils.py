import jwt
from datetime import datetime, timedelta
from django.conf import settings

def create_token(user):
    """
    Create JWT token utils
    """
    # If the user is authenticated, create a payload for the JWT token.
    user_obj = { 
        "user_id": user.id,
        "username": user.username,
        "email": user.email
    }
        
    payload = {
        "user_id": user.id,
        "exp": datetime.utcnow() + timedelta(hours=24), #Set expiring date in 24 hours
        "iat": datetime.utcnow(),
        "user": user_obj
    }
    
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256")