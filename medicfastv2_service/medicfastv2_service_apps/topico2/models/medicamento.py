from django.db import models
from ..enums import MEDICAMENTO_TIPO_CHOICES, PASTILLA


class Medicamento(models.Model):
    """
    medicamento poseera tipo medicamento ya sea pastilla inyectables o jarabes otros
    """
    nombre = models.CharField(max_length=20)
    preciocompra = models.FloatField()
    stock = models.IntegerField()
    fecha = models.DateTimeField(auto_now=True)
    tipo = models.CharField(
        max_length=50, choices=MEDICAMENTO_TIPO_CHOICES, default=PASTILLA)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Medicamento"
        verbose_name_plural = "Medicamentos"
        permissions = (
            ('list_medicamento', 'Can list medicamento'),
            ('get_medicamento', 'Can get medicamento'),
        )

    def __str__(self):
        return self.nombre
