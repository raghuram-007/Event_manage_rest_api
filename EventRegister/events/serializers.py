from rest_framework import  serializers
from .models import*

class EventSerializers(serializers.ModelSerializer):
    class Meta:
        model=Event
        fields='__all__'
    
class RegisterSerializers(serializers.ModelSerializer):
    user=serializers.ReadOnlyField(source='user.username')
    event = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all()
    ) 
    event_title = serializers.ReadOnlyField(source='event.title')

    class Meta:
        model=Registration
        fields='__all__'