from django.contrib import admin

from .models import Mortgage, Payment, Balance, Schedule
# from accounts.models import Customer

class MortgageAdmin(admin.ModelAdmin):
    list_display = [
        'client',
        'mortgage_id',
        'interest_rate',
        'mortgage_term',
        'total_principal',
        'total_mortgage',
        # 'first_payment_amount',
        'issue_date'
    ]

class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        "mortgage_id",
        "payment_status",
        "payment_date",
        "payment_amount"
    )

class BalanceAdmin(admin.ModelAdmin):
    list_display = (
        "client",
        "mortgage_id",
        "interest_rate",
        "issue_date",
        "mortgage_term",
        "term_remaining",
        "total_paid",
        "mortgage_paid",
        "interest_paid"
    )

class ScheduleAdmin(admin.ModelAdmin):
    list_display = (
        # "client",
        "mortgage_id",
        "issue_date",
        "mortgage_term",
        "interest_rate",
        "total_number_of_payments",
        # "payment_status",
        # "payment_amount",
        # "mortgage_amount",
        # "interest_amount",
        # "other_amount",
    )

admin.site.register(Mortgage, MortgageAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(Balance, BalanceAdmin)
admin.site.register(Schedule, ScheduleAdmin)