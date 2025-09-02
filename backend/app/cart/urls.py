from django.urls import path
from .views import add_to_cart, remove_from_cart, view_cart, delete_cart

urlpatterns = [
    path('add/', add_to_cart, name='add_to_cart'),
    path('remove/', remove_from_cart, name='remove_from_cart'),
    path('view/', view_cart, name='view_cart'),
    path('cart/', view_cart, name='cart'),  
    path('delete/', delete_cart, name='delete_cart'),
]