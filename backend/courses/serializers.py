from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ['id', 'stream', 'level', 'name', 'description', 'image', 'image_url', 'created_at', 'updated_at']
    
def get_image_url(self, obj):
    try:
        return obj.get_image_url()
    except Exception:
        return ""



