from rest_framework import generics
from .models import*
from .serializers import*
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class EventListView(generics.ListAPIView):
    queryset=Event.objects.all()
    serializer_class=EventSerializers
    
class EventDetailView(generics.RetrieveAPIView):
    queryset=Event.objects.all()
    serializer_class=EventSerializers
    

    
class EventRegistrationListView(generics.ListAPIView):
    serializer_class=RegisterSerializers
    
    def get_queryset(self):
        event_id=self.kwargs['event_id']
        return Registration.objects.filter(event_id=event_id)


class RegistrationDeleteView(generics.DestroyAPIView):
    serializer_class = RegisterSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Registration.objects.filter(user=self.request.user)

    
    
class RegistrationCreateView(generics.CreateAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegisterSerializers
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class MyRegistrationsListView(generics.ListAPIView):
    serializer_class = RegisterSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Registration.objects.filter(user=self.request.user)
