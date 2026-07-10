from django.urls import path
from .views import CreateShift, ListShifts

urlpatterns = [
    path('create/', CreateShift, name='create_shift'),
    path('list/', ListShifts, name='list_shifts'),
]
