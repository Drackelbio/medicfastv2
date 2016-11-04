from django.db import models

# Create your models here.


class Historialmedic(models.Model):

    fecha = models.DateField(null=True, blank=True)
    hora = models.DateTimeField(auto_now=True)
    numhistorial = models.CharField(max_length=60, null=True, blank=True)

    class Meta:
        verbose_name = "Historialmedic"
        verbose_name_plural = "Historialmedics"

    def __str__(self):
        return self.numhistorial
