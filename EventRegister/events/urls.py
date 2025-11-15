from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns=[
    path('events/',views.EventListView.as_view(),name='event-list'),
     path('events/<int:pk>/', views.EventDetailView.as_view(), name='event-detail'),
    path('register/', views.RegistrationCreateView.as_view(), name='register'),
    path('events/<int:event_id>/registrations/', views.EventRegistrationListView.as_view(), name='event-registrations'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('my-registrations/', views.MyRegistrationsListView.as_view(), name='my-registrations'),
    path('registrations/<int:pk>/delete/', views.RegistrationDeleteView.as_view(), name='registration-delete'),


]