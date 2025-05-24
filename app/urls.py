from django.urls import path
from .views import Home
from . import views
from .stylesheet_view import StylesheetView

urlpatterns = [
    path('', Home.as_view(), name='home'),
    path('get_char/', views.get_char, name='get_char'),
    path('get_char2/', views.get_char2, name='get_char2'),
    # URL para servir CSS dinámicamente
    path('css/<str:css_file>', StylesheetView.as_view(), name='css'),
    path('api/tickers/', views.list_tickers, name='list_tickers'),
]