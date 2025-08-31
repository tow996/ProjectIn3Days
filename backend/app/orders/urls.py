from .views import create_order, order_detail
from django.urls import path    

urlpatterns = [
    path('create/', create_order, name='order-create'),
    path('<int:order_id>/', order_detail, name='order-detail'),
]