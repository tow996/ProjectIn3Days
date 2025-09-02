from .models import Order, BillingAddress
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from cart.operations import delete_cart
from cart.models import Cart

@csrf_exempt
def create_order(request):
    if request.user.is_authenticated and request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        total_price = data.get('total_price')
        billing_address_data = data.get('billing_address', {})
        address = billing_address_data.get('address')
        city = billing_address_data.get('city')
        state = billing_address_data.get('state')
        postal_code = billing_address_data.get('postal_code')
        country = billing_address_data.get('country')
        phone_number = billing_address_data.get('phone_number')

        if not total_price:
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

        cart = Cart.objects.filter(user=request.user, is_active=True).first()
        if not cart:
            return JsonResponse({'error': 'No active cart found'}, status=400)

        order_info = list(cart.items.values('product', 'quantity'))

        order = Order.objects.create(
            billing_address=billing_address,
            total_price=total_price,
            order_info=order_info,
        )

        delete_cart(request.user)

        return JsonResponse({'message': 'Order created successfully', 'order_id': order.id})

    return JsonResponse({'error': 'Not authenticated or wrong method'}, status=401)

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
                'created_at': order.created_at.isoformat(),
                'updated_at': order.updated_at.isoformat(),
                'billing_address': {
                    'address': order.billing_address.address,
                    'city': order.billing_address.city,
                    'state': order.billing_address.state,
                    'postal_code': order.billing_address.postal_code,
                    'country': order.billing_address.country,
                    'phone_number': order.billing_address.phone_number,
                }
            })
        except Order.DoesNotExist:
            return JsonResponse({'error': 'Order not found'}, status=404)
    return JsonResponse({'error': 'Not authenticated'}, status=401)


@csrf_exempt
def order_list(request):
    if request.user.is_authenticated:
        orders = Order.objects.filter(user=request.user).values('id', 'total_price', 'status', 'created_at', 'updated_at')
        orders_list = list(orders)
        # Optionally convert datetime to isoformat for JSON serialization
        for order in orders_list:
            order['created_at'] = order['created_at'].isoformat()
            order['updated_at'] = order['updated_at'].isoformat()
        return JsonResponse(orders_list, safe=False)
    return JsonResponse({'error': 'Not authenticated'}, status=401)
