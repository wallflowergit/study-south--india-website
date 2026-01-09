from django.db import models

class Institution(models.Model):
    STATE_CHOICES = [
        ('Andhra Pradesh', 'Andhra Pradesh'),
        ('Kerala', 'Kerala'),
        ('Karnataka', 'Karnataka'),
        ('Tamil Nadu', 'Tamil Nadu'),
    ]

    name = models.CharField(max_length=255, db_index=True)
    location = models.CharField(max_length=255)
    state = models.CharField(max_length=100, choices=STATE_CHOICES, db_index=True)
    image = models.URLField(max_length=500, blank=True, null=True, help_text="Image URL (external or asset path)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        db_table = 'institutions'
        indexes = [
            models.Index(fields=['state', 'name']),
        ]

    def __str__(self):
        return self.name
    
    def get_image_url(self):
        """Returns the image URL or generates one based on name if not set"""
        if self.image:
            return self.image
        # Generate asset path based on institution name
        # e.g., "IIT Madras" -> "assets/images/institutions/iit-madras.png"
        slug = self.name.lower().replace(' ', '-').replace('.', '').replace(',', '')
        return f"assets/images/institutions/{slug}.png"