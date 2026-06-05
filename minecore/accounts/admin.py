from django.contrib import admin
from .models import EmployeeProfile


@admin.register(EmployeeProfile)
class EmployeeProfileAdmin(admin.ModelAdmin):
	list_display = ("employee_id", "full_name", "phone_number", "designation", "is_active")
	search_fields = ("employee_id", "full_name", "phone_number")
