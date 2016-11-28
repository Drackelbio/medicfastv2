from django.db import models


class Historia(models.Model):

    numero = models.CharField(max_length=30)
    atencion = models.BooleanField(default=True)
    estado = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Historia"
        verbose_name_plural = "Historias"

        permissions = (
            ('list_historia', 'Can list historia'),
            ('get_historia', 'Can get historia'),
        )

    def __str__(self):
        return self.numero
