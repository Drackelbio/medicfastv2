from django.contrib import admin
from .models.medicamento import Medicamento
from .models.especificacionreceta import EspecificacionReceta
from .models.tratamiento import Tratamiento
from .models.diagnostico import Diagnostico
from .models.consulta import Consulta
from .models.historia import Historia


# Register your models here.


# Register your models here.


class MedicamentoAdmin(admin.ModelAdmin):

    list_display = ("nombre", "preciocompra")
    search_fields = ("nombre",)
    list_per_page = 3

admin.site.register(Medicamento, MedicamentoAdmin)


class EspecificacionRecetaAdmin(admin.ModelAdmin):

    list_display = ("cantidad", "dosis", "periodo",
                    "recomendacion", "importe", "precio_venta")
    list_per_page = 3

admin.site.register(EspecificacionReceta, EspecificacionRecetaAdmin)


class TratamientoAdmin(admin.ModelAdmin):

    list_display = ("diagnostico", "periododescanso",
                    "citafecha", "aministracion")
    search_fields = ("diagnostico",)
    list_per_page = 3

admin.site.register(Tratamiento, TratamientoAdmin)


class DiagnosticoAdmin(admin.ModelAdmin):

    list_display = ("codigo", "nombre")
    search_fields = ("codigo",)
    list_per_page = 3

admin.site.register(Diagnostico, DiagnosticoAdmin)


class ConsultaAdmin(admin.ModelAdmin):

    list_display = ("enfermedadactual", "examenfisico")
    search_fields = ("enfermedadactual",)
    list_per_page = 3

admin.site.register(Consulta, ConsultaAdmin)


class HistoriaAdmin(admin.ModelAdmin):

    list_display = ("numero", "estado", "created_at", "updated_at")
    search_fields = ("numero",)
    list_per_page = 3

admin.site.register(Historia, HistoriaAdmin)
