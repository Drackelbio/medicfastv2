from django.contrib import admin
from topico.models import Historialmedic
# Register your models here.


class HistorialmedicAdmin(admin.ModelAdmin):
    list_display = ("fecha", "hora", "numhistorial")

    search_fields = ("fecha", "hora", "numhistorial")
    list_per_page = 2

admin.site.register(Historialmedic, HistorialmedicAdmin)
