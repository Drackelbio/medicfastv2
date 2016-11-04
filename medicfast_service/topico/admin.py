from django.contrib import admin
from topico.models import Historialmedic, Antecedente
# Register your models here.


class HistorialmedicAdmin(admin.ModelAdmin):
    list_display = ("fecha", "hora", "numhistorial")

    search_fields = ("fecha", "hora", "numhistorial")
    list_per_page = 2

admin.site.register(Historialmedic, HistorialmedicAdmin)


class AntecedenteAdmin(admin.ModelAdmin):
    list_display = ("estado", "nombre", "historialmedic")

    list_per_page = 2

admin.site.register(Antecedente, AntecedenteAdmin)
