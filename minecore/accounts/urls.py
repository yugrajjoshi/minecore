from django.urls import path

from .views import login,EmployeeListCreateView,EmployeeRetrieveUpdateDestroyView

urlpatterns = [
    path('login/', login, name='login'),
    path('employees/',EmployeeListCreateView.as_view(),name='employee-list-create'),
    path('employees/<int:pk>/',EmployeeRetrieveUpdateDestroyView.as_view(),name='employee-retrieve-update-destroy')
]