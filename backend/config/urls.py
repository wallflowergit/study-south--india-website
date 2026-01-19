from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('institutions.urls')),
     path('api/courses/', include('courses.urls')),
    path('api/auth/', include('authentication.urls')),
]