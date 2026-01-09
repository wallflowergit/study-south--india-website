from django.urls import path
from .views import CoursesView, StateDataView

urlpatterns = [
    path('courses/', CoursesView.as_view()),
    path('state/<str:state>/', StateDataView.as_view()),
]
