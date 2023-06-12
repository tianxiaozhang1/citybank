from rest_framework import serializers

from .models import Investment, Schedule

class InvestmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Investment 
        fields = "__all__"

class ScheduleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Schedule 
        fields = "__all__"