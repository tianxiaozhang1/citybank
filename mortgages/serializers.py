from rest_framework import serializers
from .models import Mortgage, Payment, Balance, Schedule#, TestObject

from django.db.models import Sum
from accounts.serializers import CustomerSerializer

import json

class MortgageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Mortgage 
        fields = ['client', 'mortgage_id', 'interest_rate', 'mortgage_term', 'total_principal', 'total_mortgage', 'issue_date'] #"__all__"

    # def create(self, obj):
    # print("MortgageSerializer create obj", serializers)
    # def create(self):
    #     return Schedule()

    # def create(self, validated_data):

    #     mortgage = Mortgage.objects.create()
    #     Schedule.objects.create(mortgage=mortgage)

    #     return mortgage

        # schedule_serializer = ScheduleSerializer(data=validated_data) #validated_data.get('schedule')
        # schedule_serializer.is_valid(raise_exception=True)
        # schedule_serializer.save()
        # return Mortgage.objects.create(**validated_data)
    
# class MortgageScheduleSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Mortgage 
#         fields = ['number_of_months', 'monthly_payment']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"

    def validate(self, attrs):
        if attrs['payment_amount'] < 0:
            raise serializers.ValidationError({"Payment Amount": "Can't be negative."})
        return attrs

    def create(self, validated_data):
        payment = Payment.objects.create(
            mortgage_id = validated_data['mortgage_id'],
            payment_status = validated_data['payment_status'],
            payment_date = validated_data['payment_date'],
            payment_amount = validated_data['payment_amount'],
            mortgage_amount = 100,
            interest_amount = 18,
            other_amount = 2,
        )
        payment.save()
        return payment
    
    # def to_representation(self, obj):
    #     return {}

    # def validate(self, data):
    #     payments = Payment.objects.filter(mortgage_id=data["mortgage_id"]).last()
    #     mortgage = data["mortgage_id"]
        # current_payment_date = data["date"].replace(
        #     day=1, hour=0, minute=0, second=0, microsecond=0
        # )
        # mortgage_date = mortgage.issue_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

# class TestObjectSerializer():

#     some_number = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = TestObject
#         fields = ['some_number']
#         #"__all__"

# class Customer:
#     def toJSON(self):
#         return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

class ScheduleSerializer(serializers.ModelSerializer):

    # client = serializers.SerializerMethodField(read_only=True)
    # mortgage_id = serializers.SerializerMethodField(read_only=True)
    # issue_date = serializers.SerializerMethodField(read_only=True)
    # mortgage_term = serializers.SerializerMethodField(read_only=True)
    # # something_else = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Schedule
        fields = "__all__"#['issue_date', 'mortgage_id', 'mortgage_term', 'total_number_of_payments', 'payment_index', 'schedule_month', 'payment_status', 'interest_rate', 'payment_amount', 'mortgage_amount', 'interest_amount', 'other_amount'] #'client'
        #

    # def get_client(self, obj):
    #     return obj.client
    
    # def get_mortgage_id(self, obj):
    #     return obj.mortgage_id
    
    # def get_issue_date(self, obj):
    #     return obj.issue_date
    
    # def get_mortgage_term(self, obj):
    #     return obj.mortgage_term


    # def create(self, obj):
    #     print("ScheduleSerializer create obj", obj)
        # schedule = Schedule.objects.create(
            
            
        # )

        # schedule.save()

        # return schedule

class BalanceSerializer(serializers.ModelSerializer):

    total_paid = serializers.SerializerMethodField()
    total_unpaid = serializers.SerializerMethodField()
    # total_paid = list(Payment.objects.aggregate(Sum('payment_amount')).values())[0]   #Total in dict format => isolate value

    total_paid = list(Payment.objects.aggregate(Sum('payment_amount')).values())[0]
    Balance.total_paid = list(Payment.objects.aggregate(Sum('payment_amount')).values())[0]
    # print("Total", total_paid)

    class Meta:
        model = Balance
        fields = ['client', 'mortgage_id', 'interest_rate', 'issue_date', 'mortgage_term', 'term_remaining', 'total_unpaid', 'total_paid', 'mortgage_paid', 'interest_paid']

    def get_total_paid(self, obj):
        total_paid = total_paid
        return total_paid
    
    def get_total_unpaid(self, obj):
        # print("XXX", obj.total_paid)
        total_unpaid = Mortgage.objects.get().total_mortgage - list(Payment.objects.aggregate(Sum('payment_amount')).values())[0]
        return total_unpaid