from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')  
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')

        if not all([username, password, first_name, last_name]):
            return JsonResponse({'error': 'All fields are required'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'User already exists'}, status=400)

        User.objects.create_user(
            email=email,
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name
        )

        return JsonResponse({'message': 'User created successfully'})

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Logged in successfully'})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

def user_logout(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})

def get_user(request):
    if request.user.is_authenticated:
        return JsonResponse({'username': request.user.username, 'isAdmin': request.user.is_staff})
    else:
        return JsonResponse({'error': 'Not authenticated'}, status=401)