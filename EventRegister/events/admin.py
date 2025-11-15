from django.contrib import admin
from .models import*


# Register your models here.
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display=('title','date','location')
    
@admin.register(Registration)
class RegisterAdmin(admin.ModelAdmin):
    list_display= ('name', 'event', 'email', 'phone', 'registered_at')
