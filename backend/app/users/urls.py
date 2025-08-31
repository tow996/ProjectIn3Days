from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup),
    path('login/', views.user_login),
    path('logout/', views.user_logout),
    path('me/', views.get_user),
]
