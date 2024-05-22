from django.shortcuts import render
from django.http import JsonResponse 
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products
from .serializers import ProductSerializer, UserSerializer , UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
   def validate(self, attrs):
        data = super().validate(attrs)
        # data['username'] = self.user.username
        # data['email'] = self.user.email
        serializer = UserSerializerWithToken(self.user).data

        for k , v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer#return back the user data

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/'
        '/api/products/create/',
        
        '/api/products/upload/',
        '/api/products/<id>/reviews/',

        '/api/products/top/',
        '/products/<id>/',

        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',

    ]

    return Response(routes )

@api_view(['GET'])
def getUserProfile(request):
    user  = request.user #the authenticated user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProducts(request):
    products =Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request , pk): #pk for primary key
    product = Product.objects.get(_id = pk)
    serializer = ProductSerializer(product, many=False) #just return one item so set many to false 
    return Response(serializer.data)




