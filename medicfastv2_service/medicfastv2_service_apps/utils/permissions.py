"""
@copyright   Copyright (c) 2013
@author      Angel Sullon (@asullom)
@package     utils

Descripcion: Componenetes para controlar los permisos por roles de los usuarios
y los permisos a la información a la que ha sido asignado
"""


import logging
log = logging.getLogger(__name__)

from django.utils.encoding import force_text

from rest_framework import permissions
# from django.utils.decorators import method_decorator
# from rest_framework import status

from django.conf import settings
from django.utils.translation import ugettext as _  # , ungettext
# from django.contrib.auth.decorators import permission_required
from .security import log_params


class ModelPermission(permissions.BasePermission):

    """
    Valida o por queryset.model para los Models de DB 1°
    o por permission_replace_by_model para modelos "virtuales" 2°
    Usage::

        1° in permission_classes add ModelPermission:

            permission_classes = [ModelPermission]

        2° use permission_replace_by_model de la forma:

            permission_classes = [ModelPermission]
            permission_replace_by_model = 'app_label.model'

    HEAD don't require a permission but specified is authenticated
    GET and OPTIONS map to list
    POST maps to add
    PUT and PATCH map to change
    DELETE maps to delete

    importante, para permisos personalizados ver MiPermission y su uso en
    @api_view(['GET'])
    @permission_classes((permissions.IsAuthenticated, MiPermission, ))
    def load_menu(request, format=None):
    """

    perms_map = {
        'GET': ['%(app_label)s.list_%(model_name)s'],
        'OPTIONS': ['%(app_label)s.list_%(model_name)s'],
        'HEAD': [],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }

    def get_required_virtual_permissions(self, method, model_cls):
        """
        Given a virtual model and an HTTP method, return the list of permission
        codes that the user is required to have.
        """
        app_label, model_name = model_cls.split('.', 1)
        kwargs = {
            'app_label': app_label,
            'model_name': model_name
        }
        return [perm % kwargs for perm in self.perms_map[method]]

    def get_required_permissions(self, method, model_cls):
        """
        Given a model and an HTTP method, return the list of permission
        codes that the user is required to have.
        """
        kwargs = {
            'app_label': model_cls._meta.app_label,
            'model_name': model_cls._meta.model_name
        }
        return [perm % kwargs for perm in self.perms_map[method]]

    def has_permission(self, request, view):
        if not request.user.is_authenticated():
            return False  # raise PermissionDenied  # 403.html

        #print ("view.action :", view.action)
        #print ("permissions.SAFE_METHODS:", permissions.SAFE_METHODS)
        print ("request.method:", request.method)
        # if request.method in permissions.SAFE_METHODS:
        #    retuchecksrn True
        # return True
        # if getattr(view, '_ignore_model_permissions', False):
        #    return True

        if hasattr(view, 'permission_replace_by_model'):
            model = view.permission_replace_by_model
            print ("permission_replace_by_model:", model)
            perms = self.get_required_virtual_permissions(
                request.method, model
            )
        else:
            if hasattr(view, 'get_queryset'):
                queryset = view.get_queryset()
            else:
                queryset = getattr(view, 'queryset', None)

            assert queryset is not None, (
                'Cannot apply ModelPermissions on a view that '
                'does not set `.queryset` or have a `.get_queryset()` method. '
                'Add permission_replace_by_model = \'app_label.model_name\' '
                ' variable to APIView class'
            )
            print ("queryset.model:", queryset.model)
            perms = self.get_required_permissions(
                request.method, queryset.model
            )

        print ("perms:", perms)
        if request.user.has_perms(perms):
            return True
        else:
            log.info(
                _('Permission denied. You don\'t have permission to %s.'
                  ) % (perms),
                extra=log_params(request)
            )
            return False
