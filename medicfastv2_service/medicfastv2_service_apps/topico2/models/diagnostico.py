from django.db import models


class Diagnostico(models.Model):

    codigo = models.CharField(max_length=25)
    nombre = models.CharField(max_length=60)

    class Meta:
        verbose_name = "Diagnostico"
        verbose_name_plural = "Diagnosticos"
        permissions = (
            ('list_diagnostico', 'Can list diagnostico'),
            ('get_diagnostico', 'Can get diagnostico'),
        )

    def __str__(self):
        return self.nombre
