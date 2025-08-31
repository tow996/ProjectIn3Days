from django.db import models
from django.core.exceptions import ValidationError

class PartComponent(models.Model):
    """
    Represents a single PC component with its details.
    """
    COMPONENT_TYPES = [
        ('cpu', 'CPU'),
        ('gpu', 'GPU'),
        ('motherboard', 'Motherboard'),
        ('psu', 'PSU'),
        ('ram', 'RAM'),
        ('case', 'Case'),
        ('storage', 'Storage'),
        ('cooling', 'Cooling'),
    ]

    name = models.CharField(max_length=255, unique=True)
    shortName = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=20, choices=COMPONENT_TYPES)
    image = models.URLField(
        max_length=200, 
        blank=True, 
        null=True,
        help_text="Optional. An image URL, primarily for PC cases."
    )

    class Meta:
        verbose_name_plural = "Part Components"
        ordering = ['type', 'name']

    def __str__(self):
        return f"{self.type.upper()}: {self.name}"

class TierConfig(models.Model):
    """
    Represents a specific PC build tier (e.g., Basic, Standard).
    """
    TIER_CHOICES = [
        ('basic', 'Basic'),
        ('standard', 'Standard'),
        ('premium', 'Premium'),
    ]

    tier = models.CharField(max_length=20, choices=TIER_CHOICES, unique=True)
    
    # Using a ManyToManyField through an intermediate model to handle
    # different component groups within a tier.
    parts = models.ManyToManyField(
        PartComponent,
        through='TierPart',
        related_name='tier_configs'
    )

    class Meta:
        verbose_name_plural = "Tier Configurations"

    def __str__(self):
        return f"{self.tier.capitalize()} Tier"

class TierPart(models.Model):
    """
    Intermediate model linking tiers and parts, defining the part's role within the tier.
    """
    PART_GROUP_CHOICES = [
        ('components', 'Fixed Components'),
        ('cpuOptions', 'CPU Options'),
        ('gpuOptions', 'GPU Options'),
    ]

    tier_config = models.ForeignKey(TierConfig, on_delete=models.CASCADE)
    part_component = models.ForeignKey(PartComponent, on_delete=models.CASCADE)
    part_group = models.CharField(max_length=20, choices=PART_GROUP_CHOICES)

    class Meta:
        unique_together = ('tier_config', 'part_component')
        ordering = ['tier_config', 'part_group', 'part_component__name']

    def __str__(self):
        return f"{self.tier_config.tier.capitalize()} - {self.part_group}: {self.part_component.name}"
