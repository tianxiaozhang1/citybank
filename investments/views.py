from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import viewsets, generics, permissions
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework.response import Response

from .models import Investment, Schedule
from .serializers import InvestmentSerializer, ScheduleSerializer

from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser

from django.db.models.functions import TruncMonth
from django.db.models import Count

# Create your views here.
class InvestmentViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class InvestmentList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer

class InvestmentScheduleViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save() 

class InvestmentScheduleList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer

@parser_classes([MultiPartParser])
class InvestmentScheduleDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer