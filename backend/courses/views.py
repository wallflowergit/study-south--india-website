from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer

    queryset = Course.objects.exclude(
        name__isnull=True
    ).exclude(
        name=""
    ).exclude(
        stream__isnull=True
    ).exclude(
        stream=""
    ).exclude(
        level__isnull=True
    ).exclude(
        level=""
    )

    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'stream']
    ordering_fields = ['name', 'stream', 'created_at']
    ordering = ['stream', 'name']
    
    @action(detail=False, methods=['get'])
    def by_stream(self, request):
        stream = request.query_params.get('stream', None)
        if stream:
            courses = self.queryset.filter(stream=stream)
            serializer = self.get_serializer(courses, many=True)
            return Response(serializer.data)
        return Response({'error': 'Stream parameter required'}, 
                       status=status.HTTP_400_BAD_REQUEST)