from django.shortcuts import render
from .models import Peripheral
from django.http import JsonResponse

def peripheral_list(request):
    peripherals = Peripheral.objects.all()
    return JsonResponse({'peripherals': list(peripherals.values())})

def peripheral(request, pk):
    try:
        peripheral = Peripheral.objects.get(pk=pk)
        return JsonResponse({
            'id': peripheral.id,
            'name': peripheral.name,
            'shortName': peripheral.shortName,
            'price': peripheral.price,
            'type': peripheral.type,
            'image': peripheral.image,
            'description': peripheral.description,
            'discount': peripheral.discount,
        })
    except Peripheral.DoesNotExist:
        return JsonResponse({'error': 'Peripheral not found'}, status=404)