from django.db import models

from datetime import date
from dateutil.relativedelta import relativedelta
from django.core.serializers.json import DjangoJSONEncoder

import decimal, json
from decimal import Decimal

from accounts.models import Customer

# Create your models here.

class CommonClass(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        # 👇️ if passed in object is instance of Decimal convert it to a string
        if isinstance(obj, Decimal):
            return str(obj)
        # 👇️ otherwise use the default behavior
        return json.JSONEncoder.default(self, obj)
    
class Mortgage(models.Model):
    client = models.ForeignKey(Customer, related_name='mortgage', on_delete=models.DO_NOTHING, null=True)
    mortgage_id = models.AutoField(primary_key=True, unique=True)
    interest_rate = models.DecimalField(max_digits=8, decimal_places=6)
    mortgage_term = models.IntegerField()
    total_principal = models.DecimalField(max_digits=10, decimal_places=2)
    total_mortgage = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    issue_date = models.DateField()

    def __str__(self):
        return f"{self.client.user.first_name} {self.client.user.last_name} - {self.mortgage_id} - {self.total_principal} - {self.interest_rate}"

    def save(self, *args, **kwargs):
        is_new = not self.pk

        total_number_of_payments = self.mortgage_term * 12
        monthly = round(((self.interest_rate/1200) * self.total_principal * ((1+(self.interest_rate/1200))**total_number_of_payments)) / ((1+(self.interest_rate/1200))**total_number_of_payments - 1), 2)
        self.total_mortgage = round(monthly * total_number_of_payments, 2)

        super().save(*args, **kwargs)
        if is_new:

            first_interest = round((self.interest_rate/1200) * self.total_principal, 2)
            first_principal = round(monthly - first_interest, 2)
            interest_list = [first_interest]
            principal_list = [first_principal]
            remaining_balance_list = [self.total_principal-first_principal]
            other_amount_list = [0] * total_number_of_payments

            start_dt = date(self.issue_date.year, self.issue_date.month+1, self.issue_date.day)
            end_dt = date(self.issue_date.year+self.mortgage_term, self.issue_date.month+1, self.issue_date.day)
            payment_dates_list = []
            while start_dt <= end_dt:
                payment_dates_list.append(start_dt.isoformat())
                start_dt += relativedelta(months=1)

            for i in range(1, total_number_of_payments):
                interest = round((self.interest_rate/1200) * remaining_balance_list[-1], 2)
                principal = round(monthly - interest, 2)
                remaining_balance_list.append(remaining_balance_list[-1] - principal)
                interest_list.append(interest)
                principal_list.append(principal)

            remaining_balance_list[-1] = 0
            payment_status = json.dumps(["Scheduled"] * total_number_of_payments)
            payment_dates = json.dumps(payment_dates_list, cls=DjangoJSONEncoder)
            payment_amount = json.dumps([monthly] * total_number_of_payments, cls=DecimalEncoder)
            mortgage_amount = json.dumps(principal_list, cls=DecimalEncoder)
            interest_amount = json.dumps(interest_list, cls=DecimalEncoder)
            other_amount = json.dumps(other_amount_list, cls=DecimalEncoder)
            remaining_balance = json.dumps(remaining_balance_list, cls=DecimalEncoder)

            Schedule.objects.create(mortgage_id_id=self.mortgage_id, issue_date=self.issue_date,
                                    total_principal=self.total_principal, total_mortgage=self.total_mortgage,
                                    mortgage_term=self.mortgage_term, interest_rate=self.interest_rate,
                                    total_number_of_payments=total_number_of_payments, payment_status=payment_status,
                                    payment_dates=payment_dates, payment_amount=payment_amount, 
                                    mortgage_amount=mortgage_amount, interest_amount=interest_amount,
                                    remaining_balance=remaining_balance, other_amount=other_amount)

class Payment(models.Model):

    client = models.ForeignKey(Customer, related_name='payment', on_delete=models.CASCADE, null=True)

    PAYMENT_STATUS = (('Made', 'Made'), ('Missed', 'Missed'))

    mortgage_id = models.ForeignKey(Mortgage, on_delete=models.CASCADE)
    payment_status = models.CharField(max_length=6, choices=PAYMENT_STATUS, blank=True)
    payment_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    interest_rate = models.DecimalField(max_digits=10, decimal_places=6)
    payment_amount = models.DecimalField(max_digits=15, decimal_places=2)
    mortgage_amount = models.DecimalField(max_digits=15, decimal_places=2, blank=True)
    interest_amount = models.DecimalField(max_digits=15, decimal_places=2, blank=True)
    other_amount = models.DecimalField(max_digits=15, decimal_places=2, blank=True)
    
    def __str__(self):
        return f"Payment (mortgage_id={self.mortgage_id}, payment_status={self.payment_status}, payment_date={self.payment_date}, payment_amount={self.payment_amount})"
    
class Schedule(models.Model):

    mortgage_id = models.ForeignKey(Mortgage, related_name='schedule', on_delete=models.CASCADE) # , unique=True , null=True, blank=True , primary_key=True
    issue_date = models.DateField()
    total_principal = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    total_mortgage = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    mortgage_term = models.IntegerField()
    interest_rate = models.DecimalField(max_digits=10, decimal_places=6)

    total_number_of_payments = models.IntegerField(blank=True, null=True)

    remaining_balance = models.JSONField(blank=True, null=True)
    payment_status = models.JSONField(blank=True, null=True)
    payment_dates = models.JSONField(blank=True, null=True)
    payment_amount = models.JSONField(blank=True, null=True)
    mortgage_amount = models.JSONField(blank=True, null=True)
    interest_amount = models.JSONField(blank=True, null=True)
    other_amount = models.JSONField(blank=True, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

class Balance(CommonClass):
    client = models.ForeignKey(Customer, related_name='balance', on_delete=models.DO_NOTHING, null=True)
    mortgage_id = models.OneToOneField(Mortgage, on_delete=models.CASCADE)
    interest_rate = models.DecimalField(max_digits=8, decimal_places=6)
    issue_date = models.DateField()
    mortgage_term = models.IntegerField()
    term_remaining = models.IntegerField()

    total_unpaid = models.DecimalField(max_digits=10, decimal_places=2)
    total_paid = models.DecimalField(max_digits=10, decimal_places=2)
    mortgage_paid = models.DecimalField(max_digits=10, decimal_places=2)
    interest_paid = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Balance (mortgage_id={self.mortgage_id}, total_paid={self.total_paid}, mortgage_paid={self.mortgage_paid}, term_remaining={self.term_remaining})"
    