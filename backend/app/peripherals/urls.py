from .views import peripheral, peripheral_list 
from django.urls import path
urlpatterns = [
    path('', peripheral_list, name='peripheral_list'),
    path('<int:pk>/', peripheral, name='peripheral_detail'),
]