from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def login(request):
    """Authenticate using employee_id and password.

    Expected payload: { "employee_id": "EM2026001", "password": "...", "userType": "ADMIN" }
    """
    employee_id = request.data.get('employee_id')
    password = request.data.get('password')
    user_type = request.data.get('userType')

    if not employee_id or not password or not user_type:
        return Response({'error': 'employee_id, password, and userType are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, employee_id=employee_id, password=password)

    if user is None:
        return Response({'message': 'invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    if user_type == 'ADMIN' and not user.is_staff:
        return Response({'message': 'you are not allowed to login as admin'}, status=status.HTTP_403_FORBIDDEN)

    if user_type == 'USER' and user.is_staff:
        return Response({'message': 'Please login as admin'}, status=status.HTTP_403_FORBIDDEN)

    return Response({'message': 'Login successful', 'employee_id': employee_id, 'isAdmin': user.is_staff}, status=status.HTTP_200_OK)

