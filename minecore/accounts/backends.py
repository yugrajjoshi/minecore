from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

from .models import EmployeeProfile

User = get_user_model()


class EmployeeIDBackend(BaseBackend):
    """Authenticate using EmployeeProfile.employee_id linked to a Django user.

    Usage: `authenticate(request, employee_id='EM2026001', password='...')`
    """

    def authenticate(self, request, employee_id=None, password=None, **kwargs):
        if not employee_id or not password:
            return None
        try:
            profile = EmployeeProfile.objects.select_related('user').get(employee_id=employee_id)
            user = profile.user
        except EmployeeProfile.DoesNotExist:
            return None

        if user and user.check_password(password):
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
