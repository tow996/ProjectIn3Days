from django.db import models

class CartItem(models.Model):
    product = models.JSONField()
    quantity = models.PositiveIntegerField(default=1)

# Create your models here.
class Cart(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    items = models.ManyToManyField(CartItem, related_name='carts')