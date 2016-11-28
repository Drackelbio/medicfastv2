# import the logging library
import logging
from django.utils.encoding import force_text
from rest_framework import serializers, viewsets
# from django.db.models import Q
# from operator import __or__ as OR
# from functools import reduce
from rest_framework.response import Response
# from rest_framework.decorators import detail_route, list_route
from rest_framework import permissions
# from rest_framework import decorators
from rest_framework.views import APIView
from rest_framework import status
# from ioteca_service_apps.utils.serializers import RecursiveSerializer
# from ioteca_service_apps.utils.pagination import LocalPagination
from medicfastv2_service_apps.utils.security import log_params
from medicfastv2_service_apps.utils.permissions import ModelPermission
from django.db.models import Q

from django.contrib.auth.models import Group, Permission
from medicfastv2_service_apps.auths.models.hierarchy import Hierarchy
from medicfastv2_service_apps.auths.models.menu import Menu
from medicfastv2_service_apps.auths.models.user_hierarchy_group import UserHierarchyGroup
from medicfastv2_service_apps.auths.models.user_hierarchy_permission import (
    UserHierarchyPermission
)
from rest_framework import serializers, viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.utils.six import BytesIO
# Get an instance of a logger
log = logging.getLogger(__name__)


class CustomSerializer(serializers.BaseSerializer):

    def to_representation(self, obj):
        return {
            'id': str(obj.id),
            'module': obj.module,
            'title': obj.title,
            'type': obj.type,
            'parent_title': obj.parent.title,  # for data: { section: 'System',
            # page: 'Categoría' },
        }


class MenuInfoSerializer(serializers.ModelSerializer):
    # menu_items = serializers.ListField()

    class Meta:
        model = Menu
        fields = '__all__'
        # fields = ('id', 'module', 'title', 'type', 'menu_items')

    def to_representation(self, obj):
        return {
            'title': obj.title,
            # 'type': obj.type,
            'type': 'link' if obj.parent else 'toggle',
            'module': obj.module,
            'state': obj.state,
            'menu_items': [],
            'parent_title': obj.parent.title if obj.parent else '',
            # 'id': str(obj.id),

        }


class UserMenuView(APIView):
    """
    View to list menu of current user.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        """
        Return menu of current user.
        """
        self.request.session.set_expiry(30)
        menu_module = 'BACKEND'  # Variable para indicar el entorno
        menu_parents = []  # Variable que contiene los menus
        menu_childrens = {}  # Variable que contien los items del menu
        h_list = []
        user = request.user

        # 1° obtener los permisos del usuario
        permission_list = []  # Variable que contien los permisos del usuario
        if request.user.is_superuser:
            permission_list = []  # si es uperuser, no se restringe
        else:
            try:
                # Obtener los Hierarchy a los que el usuario tiene acceso
                h_list = list(col["id"] for col in Hierarchy.objects
                              .values("id")
                              .filter(Q(userhierarchygroup__user__id=user.id) |
                                      Q(userhierarchypermission__user__id=user.id)
                                      ).distinct())

                # h_list = set(h_x_g_list + h_x_p_list)  # merge distinct
                # print ('h_list', h_list)

                group_list = list(col["id"] for col in Group.objects
                                  .values("id")
                                  .filter((Q(userhierarchygroup__user__id=user.id) &
                                           Q(userhierarchygroup__hierarchy__in=h_list))
                                          # o para todos los Hierarchy
                                          | Q(user__id=user.id)
                                          ).distinct())
                # print ('group_list=', group_list)

                # Permisos del User a través de sus Group y
                # Permisos del User a través de sus Permission
                permission_list = list(col["id"] for col in Permission.objects
                                       .values("id")
                                       .filter(Q(group__in=group_list) |
                                               (Q(userhierarchypermission__user__id=user.id) &
                                                Q(userhierarchypermission__hierarchy__in=h_list))
                                               # o para todos los Hierarchy
                                               | Q(user__id=user.id)
                                               ).distinct())

            except Exception as e:
                print("Error", e)
                # pass
        print('permission_list=', permission_list)

        # 2° Obtener menu
        # obtengo los hijos y luego saco sus padres, esto es para no mostrar un
        # menu sin items
        menu_childrens_t = list(col["id"] for col in Menu.objects
                                .values("id")
                                .filter(Q(permission__in=permission_list) |
                                        Q(id__isnull=True if permission_list else False),
                                        module=menu_module,
                                        is_active=True
                                        ).order_by("pos"))

        menu_parents = Menu.objects.filter(childrens__in=menu_childrens_t,
                                           module=menu_module,
                                           is_active=True
                                           ).order_by("pos").distinct()

        menu_json = []

        if menu_parents:
            for menu in menu_parents:
                menu_s = MenuInfoSerializer(menu)
                items = Menu.objects.filter(
                    Q(permission__in=permission_list) |
                    Q(id__isnull=True if permission_list else False),
                    parent_id=menu.id,
                    module=menu_module,
                    is_active=True).order_by("pos")

                items_s = MenuInfoSerializer(items, many=True)
                content = JSONRenderer().render(items_s.data)
                stream = BytesIO(content)
                data = JSONParser().parse(stream)

                print("=======")
                print((data))
                print("=======")
                menu_s.data['menu_items'].extend(
                    data)

                '''
                menu_json.append({
                    'menu': menu_s.data
                })
                '''
                menu_json.append(
                    menu_s.data
                )

        print('menu_json=', (menu_json))

        content = {
            'user': user.username,
            'hierarchys': h_list,
            'permissions': permission_list,
            'menu_json': menu_json,

        }
        return Response({'menu': menu_json})
