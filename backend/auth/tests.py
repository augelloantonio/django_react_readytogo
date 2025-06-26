from django.test import TestCase
from ninja.testing import TestClient
from django.contrib.auth.models import User
from .api import router  # importa il Router Ninja, non solo la funzione

class TestUserAuth(TestCase):
    """
    Test for User Auth procedure
    """

    def setUp(self):
        self.username = 'test'
        self.password = 'test'
        self.email = 'test@test.com'
        
        # Create test user
        User.objects.create_user(
            username=self.username,
            email=self.email,
            password=self.password  # la password viene hashata
        )
        
        # Set client
        self.client = TestClient(router)
    
        
    def test_correct_user_login_with_username(self):
        """
        Test correct user login with username and password
        """
        response = self.client.post("/login", json={
            "username": self.username,
            "password": self.password
        })
        
        self.assertEqual(response.status_code, 200)