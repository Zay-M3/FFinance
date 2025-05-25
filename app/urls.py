from django.urls import path
from .views import Home
from . import views

urlpatterns = [
    path('', Home.as_view(), name='home'),
    path('get_char/', views.get_char, name='get_char'),
    path('get_char2/', views.get_char2, name='get_char2'),
]