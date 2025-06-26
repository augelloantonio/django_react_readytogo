import jwt
from datetime import datetime, timedelta
from django.conf import settings

def create_token(user):
    """
    Create JWT token utils
    """
    payload = {
        "sub": str(user.id),
        "exp": datetime.utcnow() + timedelta(hours=1),
        "iat": datetime.utcnow()
    }
    
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256")