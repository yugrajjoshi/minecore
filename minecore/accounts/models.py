from django.db import models, transaction
from django.contrib.auth import get_user_model
from django.utils import timezone
    
User = get_user_model()


class EmployeeIDCounter(models.Model):
    """Maintain a per-year counter for employee IDs."""
    year = models.PositiveIntegerField(unique=True)
    last = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.year} -> {self.last}"


class EmployeeProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="employee_profile", null=True, blank=True)
    employee_id = models.CharField(max_length=30, unique=True, null=True, blank=True)
    full_name = models.CharField(max_length=150)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    marital_status = models.CharField(max_length=20, blank=True)
    designation = models.CharField(max_length=120, blank=True)
    employment_type = models.CharField(max_length=50, blank=True)
    joining_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    SHIFT_CHOICES = [
        ("Morning", "Morning"),
        ("Night", "Night"),
    ]
    shift_assigned = models.CharField(
        max_length=10,
        choices=SHIFT_CHOICES,
        default="Morning"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["employee_id"]

    def __str__(self):
        return f"{self.employee_id} - {self.full_name} - {self.designation} - {self.phone_number}"

    def _generate_employee_id(self):
        year = timezone.now().year
        with transaction.atomic():
            qs = EmployeeIDCounter.objects.select_for_update().filter(year=year)
            if qs.exists():
                counter = qs.get()
                counter.last += 1
                counter.save()
            else:
                counter = EmployeeIDCounter.objects.create(year=year, last=1)
            seq = counter.last
        return f"EM{year}{seq:03d}"

    def save(self, *args, **kwargs):
        if not self.employee_id:
            self.employee_id = self._generate_employee_id()
        super().save(*args, **kwargs)