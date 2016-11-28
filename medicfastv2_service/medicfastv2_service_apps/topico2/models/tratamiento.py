from django.db import models
from .consulta import Consulta

# Create your models here.


class Tratamiento(models.Model):
    """
        Description: Model Description
    """
    consulta = models.OneToOneField(Consulta)
    diagnostico = models.TextField(null=True, blank=True)
    periododescanso = models.CharField(max_length=20, null=True, blank=True)
    fecha = models.DateTimeField(auto_now=True)
    citafecha = models.DateTimeField(null=True, blank=True)
    aministracion = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Tratamiento"
        verbose_name_plural = "Tratamientos"
        permissions = (
            ('list_tratamiento', 'Can list tratamiento'),
            ('get_tratamiento', 'Can get tratamiento'),
        )

    def __str__(self):
        return '%s' % (self.consulta.enfermedadactual)
