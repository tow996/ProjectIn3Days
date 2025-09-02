from .models import Cart 

def delete_cart(user):
    cart = Cart.objects.filter(user=user, is_active=True).first()
    if cart:
        cart.is_active = False
        cart.save()