from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.



class ShiftDetails(models.Model):
    shift_id = models.CharField(max_length=50, unique=True, blank=True)
    shift_type= models.CharField(max_length=50)
    shift_start_date = models.DateField(default=timezone.now)
    shift_end_date = models.DateField(null=True, blank=True)
    shift_start_time = models.TimeField(null=True, blank=True)
    shift_end_time = models.TimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def CreateShiftID(self):
        import uuid
        from django.utils import timezone
        date_str = timezone.now().strftime("%Y%m%d")
        unique_suffix = uuid.uuid4().hex[:6].upper()
        return f"SH-{date_str}-{unique_suffix}"

    def save(self, *args, **kwargs):
        if not self.shift_id:
            self.shift_id = self.CreateShiftID()
        super().save(*args, **kwargs)


    def __str__(self):
        return f"{self.shift_type} - {self.shift_start_date} - {self.shift_start_time} - {self.shift_end_time}"


class ShiftAssign(models.Model):
    
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    shift = models.ForeignKey(ShiftDetails, on_delete=models.CASCADE)
    assign_date = models.DateField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.employee} - {self.shift} - {self.assign_date}"
    