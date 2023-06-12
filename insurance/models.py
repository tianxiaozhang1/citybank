from django.db import models

from datetime import date
import json
from dateutil.relativedelta import relativedelta
from django.core.serializers.json import DjangoJSONEncoder
from decimal import Decimal

from accounts.models import Customer

# Create your models here.
class AutoInsurance(models.Model):
    client = models.ForeignKey(Customer, related_name='autoinsurance', on_delete=models.DO_NOTHING, null=True)
    auto_insurance_id = models.AutoField(primary_key=True, unique=True)

    auto_brand = models.CharField(max_length=20, null=True, blank=True)
    auto_model = models.CharField(max_length=20, null=True, blank=True)
    auto_year = models.IntegerField(null=True, blank=True)
    auto_mileage = models.IntegerField(null=True, blank=True)
    auto_driving_distance = models.IntegerField(null=True, blank=True)

    auto_driver_license_years = models.IntegerField(null=True, blank=True)
    auto_driver_accidents = models.IntegerField(null=True, blank=True)
    auto_driver_age = models.IntegerField(null=True, blank=True)
    auto_policy_start_date = models.DateField(null=True, blank=True)
    auto_home_address = models.CharField(max_length=200, null=True, blank=True)

    auto_monthly_premium = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    bundle_discount = models.BooleanField(default=False, null=True, blank=True)
    bundle_discount_amount = models.DecimalField(decimal_places=2, max_digits=8, null=True, blank=True)
    
    def __str__(self):
        return f"{self.client.user.first_name} {self.client.user.last_name} - {self.auto_brand} - {self.auto_year} - {self.auto_policy_start_date} - {self.auto_monthly_premium}"
    
    def save(self, *args, **kwargs):

        self.auto_monthly_premium = 200 * 0.95**self.auto_driver_license_years * 1.2**self.auto_driver_accidents * 0.96**(2023-self.auto_year) * 1.00002**self.auto_mileage * 1.005**self.auto_driving_distance

        if self.auto_driver_age < 25:
            self.auto_monthly_premium *= (25 - self.auto_driver_age)/10 + 1
        elif self.auto_driver_age > 60:
            self.auto_monthly_premium *= (self.auto_driver_age-60)/10 + 1

        if len(HomeInsurance.objects.filter(pk=self.client.user.pk)) > 0:
            self.bundle_discount = True
            self.bundle_discount_amount = self.auto_monthly_premium * 0.1
            self.auto_monthly_premium -= self.bundle_discount_amount
            # HomeInsurance.bundle_discount = True
            # HomeInsurance.bundle_discount_amount = HomeInsurance.home_monthly_premium * 0.1
            # HomeInsurance.home_monthly_premium -= HomeInsurance.bundle_discount_amount
        else:
            self.bundle_discount = False
            self.bundle_discount_amount = 0
            
        super().save(*args, **kwargs)

class HomeInsurance(models.Model):
    client = models.ForeignKey(Customer, related_name='homeinsurance', on_delete=models.DO_NOTHING, null=True)
    home_insurance_id = models.AutoField(primary_key=True, unique=True)

    home_value = models.IntegerField(null=True, blank=True)
    home_address = models.CharField(max_length=200, null=True, blank=True)
    home_population = models.IntegerField(null=True, blank=True)

    home_policy_start_date = models.DateField(null=True, blank=True)

    home_monthly_premium = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    bundle_discount = models.BooleanField(default=False, null=True, blank=True)
    bundle_discount_amount = models.DecimalField(decimal_places=2, max_digits=8, null=True, blank=True)

    def __str__(self):
        return f"{self.client.user.first_name} {self.client.user.last_name} - {self.client} - {self.home_address} - {self.home_policy_start_date} - {self.home_monthly_premium}"
    
    def save(self, *args, **kwargs):

        self.home_monthly_premium = 180 * 1.25**(self.home_value/1000000) * 1.15**(self.home_population/4)
    
        if len(AutoInsurance.objects.filter(pk=self.client.user.pk)) > 0:
            self.bundle_discount = True
            self.bundle_discount_amount = self.home_monthly_premium * 0.1
            self.home_monthly_premium -= self.bundle_discount_amount
            # AutoInsurance.bundle_discount = True
            # AutoInsurance.bundle_discount_amount = AutoInsurance.auto_monthly_premium * 0.1
            # AutoInsurance.auto_monthly_premium -= AutoInsurance.bundle_discount_amount
        else:
            self.bundle_discount = False
            self.bundle_discount_amount = 0

        super().save(*args, **kwargs)