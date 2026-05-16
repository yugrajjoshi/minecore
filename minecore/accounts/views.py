from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user_type = request.data.get('userType')

    if not username or not password or not user_type:
        return Response({'error': 'Username, password, and userType are required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(request, username=username, password=password)

    if user is None:
        return Response(
            {'message': "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    if user_type == 'ADMIN' and not user.is_staff:
        return Response(
            {'message' : "you are not allowed to login as admin"},
            status = status.HTTP_403_FORBIDDEN
        )
    if user_type == "USER" and  user.is_staff:
        return Response(
            {'message': "Please login as admin"},
            status = status.HTTP_403_FORBIDDEN
        )
    return Response(
        {
          'message' : "Login successful",
          'username' : username,
          "isAdmin" : user.is_staff,
        },
        status=status.HTTP_200_OK
    )
