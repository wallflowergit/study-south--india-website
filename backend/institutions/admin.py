from django.contrib import admin
from .models import Institution

@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'state', 'created_at']
    search_fields = ['name', 'location', 'state']
    list_filter = ['state', 'created_at']
    ordering = ['name']