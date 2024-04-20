
#  connecting the views to url
from django.urls import path 
from . import views 

urlpatterns  = [
    #homepage
    path('', views.getRoutes , name= 'routes'),
    path('products/', views.getProducts , name= 'products'),
    path('products/<str:pk>', views.getProduct , name= 'product'),
]