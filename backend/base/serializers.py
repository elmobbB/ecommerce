from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product

#the serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Product
        fields = '__all__'  #return everything
        #turn the product model , turn it into json formats