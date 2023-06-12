from django.shortcuts import render

from .models import Account, Transaction
from .serializers import UserSerializer, AccountSerializer, TransactionSerializer

from django.contrib.auth.models import User

from rest_framework import viewsets, generics, permissions
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.parsers import MultiPartParser

from .models import Branch, Account, Customer#,  #, Product
from .serializers import UserSerializer, BranchSerializer, AccountSerializer, CustomerSerializer#, ProductSerializer, AccountSerializer , 

# Create your views here

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'accounts': reverse('account-list', request=request, format=format),
        'transactions': reverse('transaction-list', request=request, format=format),
    })

class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def get_queryset(self):
    #     return User.objects.all()#filter(username=self.request.user.pk)

    #user and customer generated even with this commented out
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

        # Customer.objects.create()

class AccountViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.AllowAny] #IsAuthenticated

    def perform_create(self, serializer):
        serializer.save() #owner=self.request.user

class TransactionViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save() #userid=self.request.user

class TransactionList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

@parser_classes([MultiPartParser])
class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows user to be viewed and edit
#     """
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer

# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows group to be viewed or edit.
#     """
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

# class AccountViewSet(viewsets.ModelViewSet):
#     queryset = Account.objects.all()
#     serializer_class = AccountSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    permission_classes = [permissions.AllowAny] #IsAuthenticated
    # serializer = CustomerSerializer(queryset, many=True)                   ###
    # print(serializer.data[-1])
    serializer_class = CustomerSerializer

class CustomerList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny] #IsAuthenticated
    
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    #Generates customer even with this commented
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # print("queryset", queryset[0].branch)

@parser_classes([MultiPartParser])
class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny] #IsAuthenticated
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

# @api_view(['GET'])
# def api_root(request, format=None):
#     return Response({})

    # def get_queryset(self):
    #     return self.request.user.customers.all()#[0]

    # def perform_create(self, serializer):
    #     serializer.save(customer=self.request.user)

# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer

# from django.shortcuts import render, redirect
# from django.contrib.auth import login, logout, authenticate
# from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
# # Create your views here.

# # Function based views to Class Based Views

# def login_view(request, *args, **kwargs):
#     form = AuthenticationForm(request, data=request.POST or None)
#     if form.is_valid():
#         user_ = form.get_user()
#         login(request, user_)
#         return redirect("/")
#     context = {
#         "form": form,
#         "btn_label": "Login",
#         "title": "Login"
#     }
#     return render(request, "accounts/auth.html", context)

# def logout_view(request, *args, **kwargs):
#     if request.method == "POST":
#         logout(request)
#         return redirect("/login")
#     context = {
#         "form": None,
#         "description": "Are you sure you want to logout?",
#         "btn_label": "Click to Confirm",
#         "title": "Logout"
#     }
#     return render(request, "accounts/auth.html", context)


# def register_view(request, *args, **kwargs):
#     form = UserCreationForm(request.POST or None)
#     if form.is_valid():
#         user = form.save(commit=True)
#         user.set_password(form.cleaned_data.get("password1"))
#         # send a confirmation email to verify their account
#         login(request, user)
#         return redirect("/")
#     context = {
#         "form": form,
#         "btn_label": "Register",
#         "title": "Register"
#     }
#     return render(request, "accounts/auth.html", context)