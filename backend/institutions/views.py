from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Institution
from .serializers import InstitutionSerializer

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'location', 'state']
    ordering_fields = ['name', 'state', 'created_at']
    ordering = ['name']
    
    @action(detail=False, methods=['get'])
    def by_state(self, request):
        state = request.query_params.get('state', None)
        if state:
            institutions = self.queryset.filter(state=state)
            serializer = self.get_serializer(institutions, many=True)
            return Response(serializer.data)
        return Response({'error': 'State parameter required'}, 
                       status=status.HTTP_400_BAD_REQUEST)