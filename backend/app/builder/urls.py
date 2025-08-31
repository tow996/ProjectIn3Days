from django.urls import path
from .views import builder_data_view, validate_build

urlpatterns = [
    path('data/', builder_data_view, name='builder_data'),
    path('validate_build', validate_build, name='validate_build')
]
