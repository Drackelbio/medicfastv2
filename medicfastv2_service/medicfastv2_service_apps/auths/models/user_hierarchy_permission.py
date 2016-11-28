from uuid import uuid4
from datetime import datetime, timedelta
from django.db import models
from django.contrib.auth.models import Permission
from django.utils.translation import ugettext_lazy as _
from django.utils.text import capfirst, get_text_list

# models
from .user import User
from .hierarchy import Hierarchy


class UserHierarchyPermission(models.Model):

    """
    Permisos a nivel de Hierarchy según permission o recurso simple
    """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    user = models.ForeignKey(User, verbose_name=_('user'))
    hierarchy = models.ForeignKey(Hierarchy, verbose_name=_('hierarchy'))
    permission = models.ForeignKey(Permission, verbose_name=_('permission'))
    access_info = models.TextField(
        null=True, blank=True
    )
    start_date = models.DateTimeField(
        _('start date'), null=True, blank=True

    )
    end_date = models.DateTimeField(
        _('end date'), null=True, blank=True
    )

    created_at = models.DateTimeField(
        _('created at'), auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _('updated at'), auto_now=True, blank=True, null=True
    )
    registered_by = models.TextField(
        blank=True, null=True
    )

    class Meta:
        verbose_name = _('user hierarchy permission')
        verbose_name_plural = _('user hierarchy permission')
        db_table = 'auths_user_hierarchy_permission'

    def __str__(self):
        return '%s %s - %s' % (self.user.username, self.hierarchy.name,
                               self.permission.name)
