from django.db import models


class Tratamiento(models.Model):
    """
    Description: Model Description
    """
    consulta = models.CharField(max_length=30)
    periododescanso = models.CharField(max_length=20)
    diagnostico = models.TextField(null=True, blank=True)
    fecha = models.DateTimeField(auto_now=True)
    citafecha = models.DateTimeField(null=True)
    aministracion = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Tratamiento"
        verbose_name_plural = "Tratamientos"

    def __str__(self):
        return self.consulta
