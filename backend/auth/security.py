from ninja.security import HttpBearer
import jwt
from django.conf import settings

# Set the JWT secret key into Django settings
JWT_SECRET_KEY = settings.JWT_SECRET_KEY 

class AuthBearer(HttpBearer):
    """
    Custom authentication class that uses JWT tokens.
    This class extends HttpBearer from Ninja to handle JWT authentication.
    """
    def authenticate(self, request, token):
        try:
            # Decode the JWT token using the secret key
            # and the HS256 algorithm.
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
            # Return the payload
            return payload  
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None