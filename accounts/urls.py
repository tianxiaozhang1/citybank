from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from django.contrib import admin

from accounts import views as AccountsViews

from mortgages import views as MortgageViews

from investments import views as InvestmentViews

from insurance import views as InsuranceViews


from .views import MyTokenObtainPairView
# from profiles.views import follow

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
router = DefaultRouter()
router.register(r'users', AccountsViews.UserViewSet, basename="user")
router.register(r'customers', AccountsViews.CustomerViewSet, basename='customer')
router.register(r'accounts', AccountsViews.AccountViewSet, basename="account")
router.register(r'transactions', AccountsViews.TransactionViewSet, basename="transaction")
router.register(r'branches', AccountsViews.BranchViewSet, basename='branches')
router.register(r'mortgages', MortgageViews.MortgageViewSet, basename='mortgages')
router.register(r'mortgageschedule', MortgageViews.MortgageScheduleViewSet, basename='mortgageschedule')
router.register(r'branches', AccountsViews.BranchViewSet, basename='branches')
router.register(r'investments', InvestmentViews.InvestmentViewSet, basename='investments')
router.register(r'investmentschedule', InvestmentViews.InvestmentScheduleViewSet, basename='investmentschedule')
router.register(r'homeinsurance', InsuranceViews.HomeInsuranceViewSet, basename='homeinsurance')
router.register(r'autoinsurance', InsuranceViews.AutoInsuranceViewSet, basename='autoinsurance')

#path('loans/<int:loan_id>/payments/', views.PaymentCreateView.as_view(), name='payments'),
# router.register(r'mortgages/<int:mortgage_id>/payments', MortgageViews.PaymentCreateView, basename='mortgagepayments')

# router.register(r'mortgageschedule', MortgageViews.MortgageScheduleViewSet, basename='mortgageschedule')
# router.register(r'mortgages', ListCreateMortgageAPIView, basename='mortgages')

# router.register(r'products', AccountsViews.ProductViewSet, basename='products')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('mortgages/<int:mortgage_id>/payments/pay/', MortgageViews.PaymentCreateView.as_view(), name='paymortgage'),
    path('mortgages/<int:mortgage_id>/payments/', MortgageViews.PaymentList.as_view(), name='paymentslist'),
    path('mortgages/<int:mortgage_id>/payments/<int:pk>/', MortgageViews.IndividualPayment.as_view(), name='paymentitem'),
    path('mortgages/<int:mortgage_id>/balance/', MortgageViews.BalanceView.as_view(), name='balance'),

    # path('mortgages/<int:mortgage_id>/schedule/', MortgageViews.PaymentScheduleView.as_view(), name='schedule'),
    # path('mortgageschedule/<int:mortgage_id>/', MortgageViews.MortgageScheduleDetail.as_view(), name='mortgageschedule'),
    
    
    # path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path("follow/<str:username>/", ProfileViews.follow, name="profile_follow"),
    # path("register/", RegisterView.as_view(), name="register"),
]


# from mortgages.yasg import urlpatterns as doc_urls
# from mortgages.views import ListCreateMortgageAPIView
# urlpatterns += doc_urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)