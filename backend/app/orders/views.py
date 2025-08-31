from .models import Order, BillingAddress
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def create_order(request):
    if request.user.is_authenticated and request.method == 'POST':
        data = json.loads(request.body)
        total_price = data.get('total_price')
        order_info = data.get('order_info')
        billing_address = data.get('billing_address', {})
        address = billing_address.get('address')
        city = billing_address.get('city')
        state = billing_address.get('state')
        postal_code = billing_address.get('postal_code')
        country = billing_address.get('country')
        phone_number = billing_address.get('phone_number')
        if not total_price or not order_info:
            return JsonResponse({'error': 'Fields are missing'}, status=400)
        
        if not all([address, city, state, postal_code, country]):
            return JsonResponse({'error': 'Billing address fields are missing'}, status=400)
        
        billing_address = BillingAddress.objects.create(
            address=address,
            city=city,
            state=state,
            postal_code=postal_code,
            country=country,
            phone_number=phone_number,
            user=request.user
        )
        order = Order.objects.create(
            billing_address=billing_address,
            total_price=total_price,
            order_info=order_info
        )

        return JsonResponse({'message': 'Order created successfully', 'order_id': order.id})

@csrf_exempt
def order_detail(request, order_id):
    if request.user.is_authenticated:
        try:
            order = Order.objects.get(id=order_id, user=request.user)
            return JsonResponse({
                'order_id': order.id,
                'total_price': str(order.total_price),
                'status': order.status,
                'order_info': order.order_info,
                'created_at': order.created_at,
                'updated_at': order.updated_at,
                'billing_address': {
                    'address': order.billing_address.address,
                    'city': order.billing_address.city,
                    'state': order.billing_address.state,
                    'postal_code': order.billing_address.postal_code,
                    'country': order.billing_address.country,
                }
            })
        except Order.DoesNotExist:
            return JsonResponse({'error': 'Order not found'}, status=404)
    else:
        return JsonResponse({'error': 'Not authenticated'}, status=401)

@csrf_exempt
def order_list(request):
    if request.user.is_authenticated:
        orders = Order.objects.filter(user=request.user).values('id', 'total_price', 'status', 'created_at', 'updated_at')
        return JsonResponse(list(orders), safe=False)
    else:
        return JsonResponse({'error': 'Not authenticated'}, status=401)
    