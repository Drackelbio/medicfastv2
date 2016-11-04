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


class Antecedente(models.Model):

    estado = models.CharField(max_length=60, null=True, blank=True)
    nombre = models.CharField(max_length=60, null=True, blank=True)
    historialmedic = models.ForeignKey('Historialmedic')

    class Meta:
        verbose_name = "Antecedente"
        verbose_name_plural = "Antecedentes"

    def __str__(self):
        return self.nombre


class Consulta(models.Model):

    estadoact = models.TextField(null=True, blank=True)
    examfis = models.TextField(null=True, blank=True)
    historialmedic = models.ForeignKey('Historialmedic')

    class Meta:
        verbose_name = "Consulta"
        verbose_name_plural = "Consultas"

    def __str__(self):
        return self.estadoact


class Derivacion(models.Model):

    destino = models.CharField(max_length=60, null=True, blank=True)
    consulta = models.ForeignKey('Consulta')

    class Meta:
        verbose_name = "Derivacion"
        verbose_name_plural = "Derivacions"

    def __str__(self):
        return self.destino


class Tipestado(models.Model):

    estado = models.CharField(max_length=60, null=True, blank=True)
    derivacion = models.ForeignKey('Derivacion')

    class Meta:
        verbose_name = "Tipestado"
        verbose_name_plural = "Tipestados"

    def __str__(self):
        return self.estado
