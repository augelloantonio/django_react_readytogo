from django.contrib.auth.models import User
from django.db.models import Q


class CaseInsensitiveAuth:
    """
    Authenticate a of User by using a case-insensitive query to check a
    combination of the supplied email/username and password.
    To avoid the risk of having two users with similar usernames,
    distinguished only by letter case (e.g. 'john' and 'John'), consider
    updating your User model to save usernames as lower case entries to
    the database.
    This will ensure all usernames have unique spellings, and as a result,
    our case insensitive query will return a single result only.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        """
        Get an instance of User using the supplied username
        or email (case insensitive) and verify the password
        """
        user_qs = User.objects.filter(
            Q(username__iexact=username) | Q(email__iexact=username)
        )

        if not user_qs.exists():
            return None

        # Then get the first result of the query (which is your user).
        user = user_qs.first()
        # If the password is correct, return user object
        if user.check_password(password):
            return user

        return None

    def get_user(self, user_id):
        """
        Used by the Django authentication system to retrieve a User instance
        """
        try:
            user = User.objects.get(pk=user_id)
            return user
        except User.DoesNotExist:
            return None