from django.contrib import admin

from .models import Investment, Schedule

# Register your models here.

class InvestmentAdmin(admin.ModelAdmin):
    list_display = (
        "client",
        "investment_id",
        "interest_rate",
        "start_date",
        "start_amount",
        "installment",
    )

class ScheduleAdmin(admin.ModelAdmin):
    list_display = (
        "investment_id",
        "interest_rate",
        "start_date",
        "start_amount",
        "installment",
        "current_balance",
        "installment_status",
        "installment_dates",
        "installment_amount",
        "total_principal",
        "total_interest",
        "fees_amount",
    )

admin.site.register(Investment, InvestmentAdmin)
admin.site.register(Schedule, ScheduleAdmin)