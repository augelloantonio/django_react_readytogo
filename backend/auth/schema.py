from ninja import Schema

class LoginInput(Schema):
    """
    Login input schema
    """
    username: str
    password: str

class LoginOutput(Schema):
    """ 
    Login output schema
    """
    success: bool
    token: str = None
    error: str = None
    usermane: str = None
    email: str = None
