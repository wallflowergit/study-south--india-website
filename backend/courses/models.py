# courses/models.py
from django.db import models

class Course(models.Model):
    STREAM_CHOICES = [
        ('ENGINEERING', 'Engineering'),
        ('MEDICAL', 'Medical'),
        ('ARTS AND SCIENCE', 'Arts and Science'),
        ('MANAGEMENT', 'Management'),
        ('LAW', 'Law'),
        ('ARCHITECTURE', 'Architecture'),
    ]
    
    LEVEL_CHOICES = [
        ('UG', 'Undergraduate'),
        ('PG', 'Postgraduate'),
    ]
    
    stream = models.CharField(max_length=50, choices=STREAM_CHOICES, db_index=True)
    level = models.CharField(max_length=2, choices=LEVEL_CHOICES, db_index=True)
    name = models.CharField(max_length=255, db_index=True)
    description = models.TextField()
    image = models.URLField(max_length=500, blank=True, null=True, help_text="Image URL (external or asset path)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['stream', 'name']
        db_table = 'courses'
        indexes = [
            models.Index(fields=['stream', 'level']),
        ]

    def __str__(self):
        return self.name
    

temp_fix = models.BooleanField(default=True)
