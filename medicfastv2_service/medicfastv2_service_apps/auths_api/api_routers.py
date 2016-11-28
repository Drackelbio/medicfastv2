# import the logging library
import logging
import json
from django.utils.encoding import force_text
from rest_framework import serializers, viewsets

from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework import status
from medicfastv2_service_apps.utils.security import log_params
from medicfastv2_service_apps.auths.models.menu import Menu

# Get an instance of a logger
log = logging.getLogger(__name__)


class RouterView(APIView):
    """
    View to list routers of menu.
    """

    def get(self, request, format=None):
        """
        Insertar json en el campo router_json
    {
        "catalogo.catalogo.categorias": {
            "url": "/categorias",
            "data": {
                "section": "Catálogo",
                "page": "Categorías"
            },
            "templateUrl": "_apps/catalogo_web/views/categorias/index.html"
        },
        "catalogo.catalogo.categoriasEdit": {
            "url": "/categorias/:id/edit",
            "data": {
                "section": "Catálogo",
                "page": "Categorías"
            },
            "templateUrl": "_apps/catalogo_web/views/categorias/form.html"
        },
        "catalogo.catalogo.categoriasNew": {
            "url": "/categorias/new",
            "data": {
                "section": "Catálogo",
                "page": "Categorías"
            },
            "templateUrl": "_apps/catalogo_web/views/categorias/form.html"
        }
    }
        """

        router_list = list(col["router_json"] for col in Menu.objects
                           .values("router_json")
                           .filter().order_by("pos"))

        router_json = []

        if router_list:
            for router in router_list:
                # '{"key": "value"}'
                # '{\r\n    \"catalogo\": {\r\n \"url\": \"/catalogo\" }\r\n}'
                if router:
                    router_json.append(
                        json.loads(router)
                    )
        # print('router_json=', (router_json))

        return Response(router_json)
