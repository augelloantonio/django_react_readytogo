from ninja import NinjaAPI
from auth.api import router as auth_router

# Declare central API
api = NinjaAPI()

# Declare Routes
api.add_router("/auth", auth_router)    
