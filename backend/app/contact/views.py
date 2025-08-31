from django.shortcuts import render
import json 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ContactMessage

@csrf_exempt
def send_message(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        title = data.get('title')
        message = data.get('message')

        if not all([email, title, message]):
            return JsonResponse({'error': 'All fields are required'}, status=400)
    
        ContactMessage.objects.create(email=email, title=title, message=message)
        return JsonResponse({'message': 'Message sent successfully'})