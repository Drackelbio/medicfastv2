from rest_framework import serializers, viewsets
#from django.db.models import Q
#from operator import __or__ as OR
#from functools import reduce

from medicfastv2_service_apps.topico2.models.especificacionreceta import EspecificacionReceta


class EspecificacionRecetaSerializer(serializers.ModelSerializer):

    class Meta:
        model = EspecificacionReceta
        fields = '__all__'
        # fields = ('id', 'codigo', 'nombre', 'estado',)
        # read_only_fields = ('id',)
        # exclude = ('users',)


class EspecificacionRecetaViewSet(viewsets.ModelViewSet):
    queryset = EspecificacionReceta.objects.all()
    serializer_class = EspecificacionRecetaSerializer
