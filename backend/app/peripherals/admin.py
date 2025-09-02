from django.contrib import admin
from .models import Peripheral
# Register your models here.

@admin.register(Peripheral)
class PeripheralAdmin(admin.ModelAdmin):
    list_display = ('name', 'shortName', 'price', 'type')
    search_fields = ('name', 'shortName', 'type')
    list_filter = ('type',)
    ordering = ('type', 'name')
    readonly_fields = ('id',)
    fieldsets = (
        (None, {
            'fields': ('name', 'shortName', 'price', 'type', 'image')
        }),
        ('Metadata', {
            'fields': ('id',),
            'classes': ('collapse',),
        }),
    )
