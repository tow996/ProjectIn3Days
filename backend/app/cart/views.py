import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Cart, CartItem


@csrf_exempt
def add_to_cart(request):
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({'status': 'error', 'message': 'User not authenticated'}, status=401)

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product = data.get('product')  # Expecting full product as dict
            quantity = int(data.get('quantity', 1))
        except (ValueError, json.JSONDecodeError):
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

        if not product or not isinstance(product, dict):
            return JsonResponse({'status': 'error', 'message': 'Product must be a valid JSON object'}, status=400)

        product_id = product.get('id')
        if not product_id:
            return JsonResponse({'status': 'error', 'message': 'Product must have an id'}, status=400)

        cart = Cart.objects.filter(user=user, is_active=True).first()
        if not cart:
            cart = Cart.objects.create(user=user, is_active=True)

        # Find existing item with this product id
        existing_item = None
        for item in cart.items.all():
            if item.product.get('id') == product_id:
                existing_item = item
                break

        if existing_item:
            existing_item.quantity += quantity
            existing_item.save()
        else:
            cart_item = CartItem.objects.create(product=product, quantity=quantity)
            cart.items.add(cart_item)

        cart.save()
        return JsonResponse({'status': 'success', 'message': 'Item added to cart'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


@csrf_exempt
def remove_from_cart(request):
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({'status': 'error', 'message': 'User not authenticated'}, status=401)

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product_id = data.get('product_id')
        except (ValueError, json.JSONDecodeError):
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

        if not product_id:
            return JsonResponse({'status': 'error', 'message': 'Missing product_id'}, status=400)

        cart = Cart.objects.filter(user=user, is_active=True).first()
        if not cart:
            return JsonResponse({'status': 'error', 'message': 'Cart not found'}, status=404)

        for item in cart.items.all():
            if item.product.get('id') == product_id:
                cart.items.remove(item)
                item.delete()
                cart.save()
                return JsonResponse({'status': 'success', 'message': 'Item removed from cart'})

        return JsonResponse({'status': 'error', 'message': 'Item not found in cart'}, status=404)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


@csrf_exempt
def view_cart(request):
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({'status': 'error', 'message': 'User not authenticated'}, status=401)

    cart = Cart.objects.filter(user=user, is_active=True).first()
    if not cart:
        cart = Cart.objects.create(user=user, is_active=True)

    items = cart.items.all()
    cart_data = [
        {
            'product': item.product,
            'quantity': item.quantity
        }
        for item in items
    ]

    return JsonResponse({'status': 'success', 'cart': cart_data})


@csrf_exempt
def delete_cart(request):
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({'status': 'error', 'message': 'User not authenticated'}, status=401)

    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

    cart = Cart.objects.filter(user=user, is_active=True).first()
    if cart:
        cart.items.clear()
        cart.is_active = False
        cart.save()
        Cart.objects.create(user=user, is_active=True)

    return JsonResponse({'status': 'success', 'message': 'Cart cleared and reset'})
