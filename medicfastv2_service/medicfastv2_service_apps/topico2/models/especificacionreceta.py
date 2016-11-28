from django.db import models
from .tratamiento import Tratamiento
from .medicamento import Medicamento


class EspecificacionReceta(models.Model):

    tratamiento = models.ForeignKey(Tratamiento, on_delete=models.CASCADE)
    medicamento = models.ForeignKey(Medicamento)
    cantidad = models.IntegerField()
    dosis = models.IntegerField()
    periodo = models.CharField(max_length=20)
    recomendacion = models.TextField(null=True, blank=True)
    importe = models.FloatField(null=True, blank=True)
    precio_venta = models.FloatField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "EspecificacionReceta"
        verbose_name_plural = "EspecificacionRecetas"
        permissions = (
            ('list_especificacionreceta', 'Can list especificacionreceta'),
            ('get_especificacionreceta', 'Can get especificacionreceta'),
        )

    def __str__(self):
        return '%s %s' % (self.cantidad, self.medicamento.nombre)
