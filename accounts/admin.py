from django.contrib import admin

from .models import Account, Customer, Transaction, Branch

# Register your models here.
admin.site.register(Account)
admin.site.register(Customer)
admin.site.register(Transaction)
admin.site.register(Branch)