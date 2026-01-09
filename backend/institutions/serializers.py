from rest_framework import serializers
from .models import Institution

class InstitutionSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Institution
        fields = ['id', 'name', 'location', 'state', 'image', 'image_url', 'created_at', 'updated_at']
        read_only_fields = ['image_url']
    
    def get_image_url(self, obj):
        return obj.get_image_url()