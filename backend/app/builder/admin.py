from django.contrib import admin
from .models import PartComponent, TierConfig, TierPart

@admin.register(PartComponent)
class PartComponentAdmin(admin.ModelAdmin):
    """
    Admin configuration for PartComponent model.
    """
    list_display = ('name', 'shortName', 'price', 'type')
    search_fields = ('name', 'shortName')
    list_filter = ('type',)
    readonly_fields = ('id',)

class TierPartInline(admin.TabularInline):
    """
    Inline admin for TierPart to manage components within a TierConfig.
    """
    model = TierPart
    extra = 1  

@admin.register(TierConfig)
class TierConfigAdmin(admin.ModelAdmin):
    """
    Admin configuration for TierConfig model.
    """
    list_display = ('tier',)
    inlines = [TierPartInline]
    
    def get_inline_instances(self, request, obj=None):
        return [inline(self.model, self.admin_site) for inline in self.inlines]
