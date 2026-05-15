from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class DangerDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    danger_type = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.danger_type} at {self.location} by {self.user.username}"
    
