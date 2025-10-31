import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'coreapi', 'data')

class CoursesView(APIView):
    def get(self, request):
        try:
            file_path = os.path.join(DATA_DIR, 'courses.csv')
            data = pd.read_csv(file_path)
            return Response(data.to_dict(orient='records'))
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StateDataView(APIView):
    def get(self, request, state):
        try:
            state = state.lower()
            file_map = {
                'kerala': 'kerala.csv',
                'tamilnadu': 'tamil_nadu.csv',
                'karnataka': 'karnataka.csv'
            }

            if state not in file_map:
                return Response({'error': 'Invalid state name'}, status=status.HTTP_400_BAD_REQUEST)

            file_path = os.path.join(DATA_DIR, file_map[state])
            data = pd.read_csv(file_path)
            return Response(data.to_dict(orient='records'))
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
