from rest_framework import serializers
from .models import EmployeeProfile

class EmployeeProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeProfile
        fields = ["id", "employee_id", "full_name", "phone_number", "designation", "is_active"]
        read_only_fields = ["employee_id", "id"]