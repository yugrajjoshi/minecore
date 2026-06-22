from django.db import models
from django.contrib.auth.models import User

# Create your models here.



class ShiftDetails(models.Model):
    
    shift_name = models.CharField(max_length=50)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.shift_name


class ShiftAssign(models.Model):
    
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    shift = models.ForeignKey(ShiftDetails, on_delete=models.CASCADE)
    assign_date = models.DateField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.employee} - {self.shift} - {self.assign_date}"
    