from django.db import models

from datetime import date
import json
from dateutil.relativedelta import relativedelta
from django.core.serializers.json import DjangoJSONEncoder
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        # 👇️ if passed in object is instance of Decimal convert it to a string
        if isinstance(obj, Decimal):
            return str(obj)
        # 👇️ otherwise use the default behavior
        return json.JSONEncoder.default(self, obj)
    
from accounts.models import Customer

# Create your models here.
class Investment(models.Model):
    client = models.ForeignKey(Customer, related_name='investment', on_delete=models.DO_NOTHING, null=True)
    investment_id = models.AutoField(primary_key=True, unique=True)
    interest_rate = models.DecimalField(max_digits=8, decimal_places=6)
    start_date = models.DateField()
    start_amount = models.DecimalField(max_digits=10, decimal_places=2)
    installment = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.client.user.first_name} {self.client.user.last_name} - {self.investment_id} - {self.start_amount} - {self.installment} - {self.interest_rate}"
    
    def save(self, *args, **kwargs):
        is_new = not self.pk

        super().save(*args, **kwargs)
        if is_new:

            start_dt = date(self.start_date.year, self.start_date.month+1, self.start_date.day)

            installment_status_list = ["Start", "Made"]
            installment_dates_list = [self.start_date, start_dt]
            installment_amount_list = [0, self.installment]
            total_principal_list = [self.start_amount, self.start_amount+self.installment]
            first_interest = (self.start_amount+self.installment) * (self.interest_rate/1200)
            total_interest_list = [0, first_interest]
            fees_amount_list = [50, 0]
            current_balance_list = [self.start_amount, self.start_amount+self.installment+first_interest]

            current_balance = json.dumps(current_balance_list, cls=DecimalEncoder) #cls=DjangoJSONEncoder
            installment_status = json.dumps(installment_status_list, cls=DjangoJSONEncoder)
            installment_dates = json.dumps(installment_dates_list, cls=DjangoJSONEncoder)
            installment_amount = json.dumps(installment_amount_list, cls=DecimalEncoder)
            total_principal = json.dumps(total_principal_list, cls=DecimalEncoder)
            total_interest = json.dumps(total_interest_list, cls=DecimalEncoder)
            fees_amount = json.dumps(fees_amount_list, cls=DecimalEncoder)

            Schedule.objects.create(investment_id_id=self.investment_id, interest_rate=self.interest_rate,
                                    start_date=self.start_date, start_amount=self.start_amount,
                                    installment=self.installment, current_balance=current_balance,
                                    installment_status=installment_status, installment_dates=installment_dates,
                                    installment_amount=installment_amount, total_principal=total_principal,
                                    total_interest=total_interest, fees_amount=fees_amount)

class Schedule(models.Model):

    investment_id = models.ForeignKey(Investment, related_name='schedule', on_delete=models.CASCADE)
    interest_rate = models.DecimalField(max_digits=10, decimal_places=6)
    start_date = models.DateField()
    start_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    installment = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    current_balance = models.JSONField(blank=True, null=True)
    installment_status = models.JSONField(blank=True, null=True)
    installment_dates = models.JSONField(blank=True, null=True)
    installment_amount = models.JSONField(blank=True, null=True)
    total_principal = models.JSONField(blank=True, null=True)
    total_interest = models.JSONField(blank=True, null=True)
    fees_amount = models.JSONField(blank=True, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)