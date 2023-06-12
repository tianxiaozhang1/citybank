from rest_framework import serializers
from .models import Account, Transaction

from django.contrib.auth.models import User

from rest_framework.validators import UniqueValidator, UniqueTogetherValidator
from django.contrib.auth.password_validation import validate_password

from .models import Branch, Account, Customer#, Product

# class CustomerSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Customer
#         fields = ['id', 'bank', 'account']

class UserSerializer(serializers.ModelSerializer):
    # accounts = serializers.PrimaryKeyRelatedField(many=True, queryset=Account.objects.all())
    # branch = serializers.PrimaryKeyRelatedField(queryset=Branch.objects.all())
    # transactions = serializers.PrimaryKeyRelatedField(many=True, queryset=Transaction.objects.all())
    # address = serializers.CharField()

    customer = serializers.PrimaryKeyRelatedField(read_only=True)
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])    
    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=False)

    class Meta:
        validators = [
            UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['first_name', 'last_name']
            )
        ]

        model = User
        fields = ['id', 'username', 'password', 'password2', 'email', 'first_name', 'last_name', 'customer'] #, 'transactions' ,  , 'branch' , 'address'    , 'accounts'

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            # email="SOME@EMAIL.COM",
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        # customer = Customer.objects.create(
        #     address="20 Testing Street",
        # )

        user.set_password(validated_data['password'])
        user.save()

        # customer.save()

        return user #customer #,  

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email')  #, 'first_name', 'last_name' , 'bio', 'website'
        extra_kwargs = {
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs
    


    # def create(self, validated_data):
    # #     # user = User.objects.create(
    # #     #     username=validated_data['username'],
    # #     #     email=validated_data['email'],
    # #     # )

    #     customer = Customer.objects.create(
    #         address="Customer address!"#serializers.CharField(write_only=True, required=False)
    #     )

    # #     # user.set_password(validated_data['password'])
    # #     # user.save()

    #     customer.save()

    #     return customer #user, 

class BranchSerializer(serializers.ModelSerializer):
    # users = UserSerializer(many=True, read_only=True)
    # groups = GroupSerializer(many=True, read_only = True)

    class Meta:
        model = Branch
        fields = ['branch', 'address', 'id', 'customers'] #,'groups'

# class ProductSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Product
#         fields = ['id','account_options','account_type']

class AccountSerializer(serializers.ModelSerializer):
    # account_customer = models.f
    # owner = serializers.ReadOnlyField(source='owner.username')
    # # user = UserSerializer(many=True, read_only=True)
    # owner_id = serializers.ReadOnlyField(source='owner.id')
    # transaction = serializers.PrimaryKeyRelatedField(many=True, queryset=Transaction.objects.all())

    class Meta:
        model = Account
        fields = ['id', 'userid', 'owner', 'created', 'account_type', 'account_number', 'branch', 'account_name', 'transaction_sender', 'transaction_recipient', 'balance'] #, 'user' 'type', 'owner', 'owner_id',  , 'userid', 

class TransactionSerializer(serializers.ModelSerializer):
    # accountname = serializers.ReadOnlyField()
    # owner = serializers.ReadOnlyField(source='owner.username')
    # owner_id = serializers.ReadOnlyField(source='owner.id')
    # amount = serializers.ReadOnlyField()

    class Meta:
        model = Transaction 
        fields = ['sender', 'recipient', 'sender_email', 'recipient_email', 'created', 'amount', 'currency', 'description', 'type', 'budget_type'] #, 'accountname' 'userid', 

class CustomerSerializer(serializers.ModelSerializer):

    address = serializers.CharField()
    phone_number = serializers.CharField()
    date_of_birth = serializers.DateField()
    customer_since = serializers.DateTimeField()

    # user = UserSerializer()

    # queryset = Customer.objects.all()
    # serializer = CustomerSerializer(queryset, many)

    class Meta:
        model = Customer
        fields = ['id', 'user', "accounts", "branch", "address", "phone_number", "date_of_birth", "customer_since",]

    # def create(self, validated_data):
    #     customer_data = validated_data.pop('customer')
    #     user = User.objects.create(**validated_data)
    #     Customer.objects.create(user=user, **customer_data)

    #     return user


    # def create(self, validated_data):
    #     """
    #     Create and return a new `Snippet` instance, given the validated data.
    #     """

    #     customer = Customer.objects.create(**validated_data)

    #     return customer
    

    # def create(self, validated_data):
    #     customer = Customer.objects.create(
    #         address="20 Testing Street",
    #     )

    #     customer.save()

    #     return customer

    # def put(self, request, *args, **kwargs):

    #     return self



    # def get_branch(self, obj):
    #     return "obj.user.branch"
    
    # def get_address(self, obj):
    #     return "321"
    
    # def get_phonenumber(self, obj):
    #     return "321"
    
    # def get_dateofbirth(self, obj):
    #     return "321"
    
    # def get_customersince(self, obj):
    #     return "321"
    
    # def get_first_name(self, obj):
    #     return obj.user.first_name