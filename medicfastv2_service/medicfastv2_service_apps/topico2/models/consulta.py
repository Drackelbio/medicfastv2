from django.db import models
from .diagnostico import Diagnostico
from .historia import Historia


class Consulta(models.Model):

    historia = models.ForeignKey(Historia)
    enfermedadactual = models.CharField(max_length=60)
    examenfisico = models.CharField(max_length=60)
    diagnostico = models.ManyToManyField(Diagnostico, blank=True)
    fecha = models.DateTimeField(auto_now=True)
    suministrar = models.BooleanField(default=True)
    estado = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Consulta"
        verbose_name_plural = "Consultas"

        permissions = (
            ('list_consulta', 'Can list consulta'),
            ('get_consulta', 'Can get consulta'),
        )

    def __str__(self):
        return self.enfermedadactual
