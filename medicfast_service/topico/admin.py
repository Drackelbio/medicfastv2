from django.contrib import admin
from topico.models import Historialmedic, Antecedente, Consulta, Derivacion, Tipestado, Triaje
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


class ConsultaAdmin(admin.ModelAdmin):
    list_display = ("estadoact", "examfis", "historialmedic")

    list_per_page = 3

admin.site.register(Consulta, ConsultaAdmin)


class DerivacionAdmin(admin.ModelAdmin):
    list_display = ("destino", "consulta")
    search_fields = ("destino", "consulta")

    list_per_page = 2

admin.site.register(Derivacion, DerivacionAdmin)


class TipestadoAdmin(admin.ModelAdmin):
    list_display = ("estado", "derivacion")

    list_per_page = 2

admin.site.register(Tipestado, TipestadoAdmin)


class TriajeAdmin(admin.ModelAdmin):
    list_display = ("descripcion", "peso", "presion",
                    "talla", "temperatura", "consulta")
    search_fields = ("descripcion", "peso", "presion",
                     "talla", "temperatura", "consulta")

    list_per_page = 3

admin.site.register(Triaje, TriajeAdmin)
