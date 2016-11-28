from django.conf.urls import url, include
from rest_framework import routers

from .historia_view import HistoriaViewSet
from .consulta_view import ConsultaViewSet
from .diagnostico_view import DiagnosticoViewSet
from .especificacionreceta_view import EspecificacionRecetaViewSet
from .medicamento_view import MedicamentoViewSet
from .tratamiento_view import TratamientoViewSet

router = routers.DefaultRouter()

router.register(r'historias', HistoriaViewSet, 'historias-view')
router.register(r'consultas', ConsultaViewSet, 'consultas-view')
router.register(r'diagnosticos', DiagnosticoViewSet, 'diagnosticos-view')
router.register(r'especificacionrecetas',
                EspecificacionRecetaViewSet, 'especificacionrecetas-view')
router.register(r'medicamentos', MedicamentoViewSet, 'medicamentos-view')
router.register(r'tratamientos', TratamientoViewSet, 'tratamientos-view')

urlpatterns = [

    url(r'^', include(router.urls)),



]
