from django.db import models

# Create your models here.
class Peripheral(models.Model):
    """
    Represents a single PC component with its details.
    """
    COMPONENT_TYPES = [
        ('headset', 'Headset'),
        ('keyboard', 'Keyboard'),
        ('mouse', 'Mouse'),
        ('mousepad', 'Mousepad'),
        ('monitor', 'Monitor'),
    ]

    name = models.CharField(max_length=255, unique=True)
    shortName = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=20, choices=COMPONENT_TYPES)
    description = models.JSONField(blank=True, null=True)
    discount = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=0.00,
        help_text="Discount percentage (e.g., 10.00 for 10% off)",
    )
    image = models.URLField(
        max_length=200, 
        blank=True, 
        null=True,
    )

    class Meta:
        verbose_name_plural = "Peripherals"
        ordering = ['type', 'name']

    def __str__(self):
        return f"{self.type.upper()}: {self.name}"