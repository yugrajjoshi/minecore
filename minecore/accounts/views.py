from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)

    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)