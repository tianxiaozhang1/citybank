from rest_framework import serializers

from .models import HomeInsurance, AutoInsurance

class HomeInsuranceSerializer(serializers.ModelSerializer):

    class Meta:
        model = HomeInsurance 
        fields = "__all__"

class AutoInsuranceSerializer(serializers.ModelSerializer):

    class Meta:
        model = AutoInsurance 
        fields = "__all__"