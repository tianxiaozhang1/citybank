from django.db import models

from django.contrib.auth.models import User

from django.contrib.auth import get_user_model
from django.db.models.signals import post_save

from django.dispatch import receiver

# Create your models here.

# class User(models.Model):
#     # bank = models.ForeignKey(Branch, related_name='bank', on_delete = models.CASCADE)
#     # customer = models.ForeignKey(User, related_name = "user", on_delete = models.CASCADE, null = True)
#     # account = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
#     # branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True) # 
#     # address = models.CharField(max_length=120, null=True)
    
#     def __str__(self):
#         return f"{self.user}"

class Branch(models.Model):
    branch = models.CharField(max_length=100)
    address = models.CharField(max_length=200)

    # users = models.ManyToManyField(User)
    # customers = models.
    # users = models.ManyToOneRel(User, field_name='branch', to='')

    class Meta:
        verbose_name_plural = "branches"

    def save(self, *args, **kwargs):
        super(Branch, self).save(*args, **kwargs)
        # super().save(*args, **kwargs)

    def __str__(self): 
        return f"{self.branch}"

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) #, , null=True blank=True
    # branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, related_name='branches', null=True) #, blank=True #, queryset=Branch.objects()
    # branch = models.CharField(Branch, max_length=120, null=True, blank=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='customers', null=True, blank=True) 
    # account = models.ManyToManyField(User, through='Customer')
    # account = models.ManyToManyField(through='Account')
    address = models.CharField(max_length=120, null=True, blank=True)
    phone_number = models.CharField(max_length=16, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    customer_since = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        super(Customer, self).save(*args, **kwargs)
        # super().save(*args, **kwargs)
        
class Account(models.Model):
    userid = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True)
    owner = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='accounts', null=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='accounts_branch', null=True) 
    # transactions = models.ForeignKey(to="transaction", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, null=True)
    balance = models.DecimalField(max_digits=19, decimal_places=8)
    account_name = models.SlugField(max_length=100)
    account_number = models.SlugField(max_length=16, null=True) #, primary_key=True    
    account_type_options = (('chequing','CHEQUING'), ('saving','SAVING'), ('business','BUSINESS'))
    account_type = models.CharField(max_length=20, choices=account_type_options, default=account_type_options[0])

    # type_choices = (('business','BUSINESS'), ('personal','PERSONAL'), ('charity','CHARITY'))
    # type = models.CharField(max_length=20, choices=type_choices, default=type[1])

    def __str__(self):
        # return f"Account option: {self.owner} - Account type: {self.account_type}"
        # return f"{self.owner.user.first_name} {self.owner.user.last_name} - {self.account_type} - {self.account_number}"
        return "THIS IS FOR NOW"

    # def form_valid(self, form):
    #     form.instance.customer = Customer.objects.get(owner=self.request.user)
    #     return super().form_valid(form)

    def save(self, *args, **kwargs):
        # super().save(*args, **kwargs) #user = 
        super(Account, self).save(*args, **kwargs)
        # self.balance += 20
        # return user
        # super().save(*args, **kwargs)
        # print("** Account", Account)
        # if self.user.is_authenticated:
        #print("HELLO HELLO")#.is_authenticated

        #super(Account, self).save(*args, **kwargs)
    
    # def __str__(self):
    #     return f"{self.userid} - {self.account_type} - {self.accountnumber}"
    # - {self.accountname}
        # return f"Account option: {self.account_type_options} - Account balance: {self.balance}" #- Account type: {self.type}

def user_did_save(sender, instance, created, *args, **kwargs):
    if created:
        # print("**kwargs", **kwargs)
        # print("XX", Customer.objects.all())
        Customer.objects.create(user=instance) #, address=Customer.address, phone_number="4165555555", date_of_birth="1988-01-01"
        # Customer.objects.create(**validated_data)

post_save.connect(user_did_save, sender=User)


class Transaction(models.Model):

    typeChoices = (
                    ('Income', 'Income'),
                    ('Expense', 'Expense'),
                    ('Transfer', 'Transfer'),
                    )

    categoryChoices = (
                        ('Rent', 'Rent'),
                        ('Mortgage', 'Mortgage'),
                        ('Utilities', 'Utilities'),
                        ('Food', 'Food'),
                        ('Leisure', 'Leisure'),
                        ('Insurance', 'Insurance'),
                        ('Fuel', 'Fuel'),
                        ('Savings', 'Savings'),
                        ('Investment', 'Investment'),
                        ('Phone Payment', 'Phone Payment'),
                        ('Gym Payment','Gym Payment'),
                        ('Salary', 'Salary'),
                        ('Asset', 'Asset'),
                        ('Miscellaneous', 'Miscellaneous'),
                        ('Transfer', 'Transfer'),
                        )

    currencyChoices = (
                        ('Canadian Dollar', 'CAD'),
                        ('US Dollar', 'USD'),
                        ('Euro', 'EURO'),
                        ('Chinese Yuan', 'RMB'),
                        )
    
    sender = models.ForeignKey(Account, related_name='transaction_sender', on_delete=models.CASCADE)
    recipient = models.ForeignKey(Account, related_name='transaction_recipient', on_delete=models.CASCADE)

    # accountname = models.CharField(max_length=100)
    # customername = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)
    sender_email = models.EmailField(max_length=30, null=True)
    recipient_email = models.EmailField(max_length=30, null=True)
    created = models.DateTimeField()
    type = models.CharField(max_length=8, choices=typeChoices, default=typeChoices[2])
    description = models.CharField(max_length=200)
    budget_type = models.CharField(max_length=20, choices=categoryChoices, default=categoryChoices[14])
    amount = models.DecimalField(max_digits=19, decimal_places=8)
    currency = models.CharField(max_length=20, choices=currencyChoices, null=True, default=currencyChoices[0])

    def save(self, *args, **kwargs):
        
        self.sender.balance -= self.amount
        self.sender.save()
        self.recipient.balance += self.amount
        self.recipient.save()
        super(Transaction, self).save(*args, **kwargs)

        # print("self.accountname.balance", self.accountname.balance)
    #    print(sender.accountname)
        # print(self.amount)
        # print("self.sender.balance", self.sender.balance)
        # print("self.recipient.balance", self.recipient.balance)
        # self.accountname.balance += self.amount
        # self.accountname.save()

    class Meta:
        ordering = ['-created']







    # def __str__(self):
    #     return f"{self.user}"

# class Product(models.Model):
#     account_options = (('chequing','CHEQUING'), ('saving','SAVING'), ('business','BUSINESS'))
#     account_type = (('business','BUSINESS'), ('personal','PERSONAL'), ('charity','CHARITY'))
#     account_options = models.CharField(max_length = 20, choices = account_options, default = account_options[0])
#     account_type = models.CharField(max_length = 20, choices = account_type, default = account_type[0])
    
#     def __str__(self):
#         return f"Account option: {self.account_options} - Account type: {self.account_type} "