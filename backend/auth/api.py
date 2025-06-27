from ninja import Router
from ninja.errors import HttpError
from django.contrib.auth import authenticate
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from .schema import LoginInput, LoginOutput
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from django.contrib.auth.models import Permission
from .utils import create_token

router = Router()

@router.get("/setCsrfToken")
@ensure_csrf_cookie
def setCsrfToken(request):
    """
    Endpoint to set the CSRF token cookie.
    This endpoint is used to ensure that the CSRF token is set in the user's browser.
    """

    token = get_token(request)
    return JsonResponse({"csrf_token": token})

@router.post("/login", response={200: LoginOutput, 401:str})
def login_user(request, data: LoginInput):
    """
    Endpoint to authenticate a user and return a JWT token.
    This endpoint takes a username and password, authenticates the user,
    and returns a JWT token if the credentials are valid.
    If the credentials are invalid, it raises a 401 error.
    """
    
    # Authenticate the user using Django's authenticate function.
    user = authenticate(request, username=data.username, password=data.password)
    
    if user is not None:        
        
        token = create_token(user)
               
        return {"success": True, "token": token}
    else:
        raise HttpError(401, "Invalid credentials")
