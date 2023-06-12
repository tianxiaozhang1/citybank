from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import viewsets, generics, permissions
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework.response import Response

from .models import HomeInsurance, AutoInsurance
from .serializers import HomeInsuranceSerializer, AutoInsuranceSerializer

from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser

from django.db.models.functions import TruncMonth
from django.db.models import Count

# Create your views here.
class HomeInsuranceViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = HomeInsurance.objects.all()
    serializer_class = HomeInsuranceSerializer
    permission_classes = [permissions.IsAuthenticated]

class HomeInsuranceList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = HomeInsurance.objects.all()
    serializer_class = HomeInsuranceSerializer

class AutoInsuranceViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = AutoInsurance.objects.all()
    serializer_class = AutoInsuranceSerializer
    permission_classes = [permissions.IsAuthenticated]

class AutoInsuranceList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = AutoInsurance.objects.all()
    serializer_class = AutoInsuranceSerializer