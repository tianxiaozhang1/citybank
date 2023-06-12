from django.contrib import admin

from .models import AutoInsurance, HomeInsurance

# Register your models here.

class AutoInsuranceAdmin(admin.ModelAdmin):
    list_display = (
        "client",
        "auto_insurance_id",
        "auto_brand",
        "auto_model",
        "auto_year",
        "auto_mileage",
        "auto_driving_distance",
        "auto_driver_license_years",
        "auto_driver_accidents",
        "auto_driver_age",
        "auto_policy_start_date",
        "auto_home_address",
        "auto_monthly_premium",
        "bundle_discount",
        "bundle_discount_amount",
    )

class HomeInsuranceAdmin(admin.ModelAdmin):
    list_display = (
        "client",
        "home_insurance_id",
        "home_value",
        "home_address",
        "home_population",
        "home_policy_start_date",
        "home_monthly_premium",
    )

admin.site.register(AutoInsurance, AutoInsuranceAdmin)
admin.site.register(HomeInsurance, HomeInsuranceAdmin)