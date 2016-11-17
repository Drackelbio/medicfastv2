from django.contrib import admin
from .models.Tratamiento import Tratamiento

# Register your models here.


class TratamientoAdmin(admin.ModelAdmin):
    list_display = ("consulta", "periododescanso",
                    "diagnostico", "citafecha", "aministracion")
    search_fields = ("consulta",)
    list_per_page = 3


admin.site.register(Tratamiento, TratamientoAdmin)
