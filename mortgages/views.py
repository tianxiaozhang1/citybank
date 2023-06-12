from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import viewsets, generics, permissions
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework.response import Response

from .models import Mortgage, Payment, Balance, Schedule#, TestObject
from .serializers import MortgageSerializer, PaymentSerializer, BalanceSerializer, ScheduleSerializer#, TestObjectSerializer
# from. schedule import PaymentScheduler

from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser

from django.db.models.functions import TruncMonth
from django.db.models import Count

from accounts.serializers import CustomerSerializer

# Create your views here.
class MortgageViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Mortgage.objects.all()
    serializer_class = MortgageSerializer
    permission_classes = [permissions.IsAuthenticated]

class MortgageList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    # def perform_create(self, serializer):
    #     serializer.save(client=self.request.user)

    # def create(self, validated_data):
    #     Schedule.objects.create(client="Customer", mortgage_id=28, interest_rate=222, issue_date="2023-04-03", mortgage_term=32)

    # def create_schedule(instance, **kwargs):
    #     # mortgage_
    #     pass
        
    # def create(self, validated_data):
    #     Schedule.objects.create(client=2, mortgage_id=Mortgage.objects.get(id=2), interest_rate=222, issue_date="2023-04-03", mortgage_term=32) #, customer="Customer" objects.get(Mortgage.client)   

        # Customer = CustomerSerializer()
        # return Schedule.objects.create(client=Customer, mortgage_id=28, interest_rate=222, issue_date="2023-04-03", mortgage_term=32)

    queryset = Mortgage.objects.all()
    serializer_class = MortgageSerializer

class PaymentCreateView(CreateAPIView):
    serializer_class = PaymentSerializer

    def post(self, request, mortgage_id, *args, **kwargs):
        data = request.data

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class PaymentList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class IndividualPayment(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class BalanceView(RetrieveAPIView):

    serializer_class = BalanceSerializer
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Balance.objects.all()

    def get(self, request, mortgage_id, *args, **kwargs):
        mortgage = get_object_or_404(Balance, mortgage_id=mortgage_id)
        serializer = BalanceSerializer(mortgage)
        # print("serializer.data", serializer.data)
        return Response(serializer.data)

class MortgageScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save() 

class MortgageScheduleList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

@parser_classes([MultiPartParser])
class MortgageScheduleDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer



# class PaymentScheduleView(generics.ListCreateAPIView):

#     permission_classes = [permissions.IsAuthenticated]
#     queryset = Schedule.objects.all()
#     # queryset = Schedule.objects.annotate(month=TruncMonth('schedule_month')).values('month').annotate(count=Count('id')).values('month', 'count').order_by('-month')
#     serializer_class = ScheduleSerializer

# class TestObjectView(ListCreateAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     queryset = TestObject.objects.all()
#     # queryset = Schedule.objects.annotate(month=TruncMonth('schedule_month')).values('month').annotate(count=Count('id')).values('month', 'count').order_by('-month')
#     serializer_class = TestObjectSerializer

    # serializer_class = BalanceSerializer

    # def get(self, request, mortgage_id, *args, **kwargs):
    #     mortgage = get_object_or_404(Mortgage, mortgage_id=mortgage_id)
    #     serializer = BalanceSerializer(mortgage)
    #     return Response(serializer.data)

    ''''''


      # testobject = TestObject(some_number=88)
    # testobject.save()

    # schedule = Schedule(client="tian", mortgage_id=88, issue_date="2023-04-05", schedule_month='2023-04-05', mortgage_term=12, interest_rate=12,payment_amount=12, mortgage_amount=10, interest_amount=1,other_amount=1)
    # schedule.save()

    # print("SOMETHING ***")
    # schedule = Schedule()
    # schedule.save()

    # def create(self, validated_data):
    #     Customer = CustomerSerializer()
    #     return Schedule.objects.create(client="tian", interest_rate=222, issue_date="2023-04-03", mortgage_term=32, payment_amount=888, mortgage_amount=666, interest_amount=222, other_amount=252)
    




    # def perform_create(self, serializer):

    #     for x in range(3):
    #         schedule = Schedule(client=self.request.user.customer, mortgage_id=22+x, issue_date="2023-02-22", schedule_month='2023-02-22', mortgage_term=22, interest_rate=22,payment_amount=22, mortgage_amount=22, interest_amount=22,other_amount=22)
    #         schedule.save()
    #         serializer.save() 
    #     #Mortgage.mortgage_id