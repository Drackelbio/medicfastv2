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


def log_params(request):
    """
    Usar en todos los log
    Usage::
        import logging
        log = logging.getLogger(__name__)
        ...
        log.info('Writing in log file', extra=log_params(self.request))
        log.warning('Writing in log file ',extra=log_params(self.request))
        log.error(force_text('Writing file'), extra=log_params(self.request))
        log.critical('Writing in log file', extra=log_params(self.request))
        log.debug('Writing in log file',
                  extra=log_params(self.request))  # no usar en consola
    """
    return {
        'path': request.get_full_path(),
        'ip': request.META['REMOTE_ADDR'],
        'user': request.user,
        'method': request.method
    }
