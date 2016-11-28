from uuid import uuid4
from datetime import datetime, timedelta
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import ugettext_lazy as _
from django.utils.text import capfirst, get_text_list
# models
from .hierarchy_type import HierarchyType
from .user import User


class Hierarchy(models.Model):
    """
    Hierarchy
    """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    logo = models.ImageField(
        capfirst(_('logo')), upload_to='logos',
        default='logo/default.png', null=True, blank=True
    )
    code = models.CharField(
        capfirst(_('code')), max_length=60, null=True, blank=True
    )
    name = models.CharField(
        capfirst(_('name')), max_length=60
    )
    name_short = models.CharField(
        capfirst(_('name short')), max_length=40, null=True, blank=True
    )
    fiscal_creation_date = models.DateField(
        _('fiscal creation date'), null=True, blank=True
    )
    fiscal_address = models.CharField(
        capfirst(_('fiscal address')), max_length=40, null=True, blank=True
    )
    is_active = models.BooleanField(
        capfirst(_('active')), default=True
    )

    parent = models.ForeignKey(
        'self', related_name='childrens', null=True, blank=True
    )
    hierarchy_type = models.ForeignKey(
        HierarchyType, related_name='hierarchy_set'
    )
    immediate_parent = models.ForeignKey(
        'self', related_name='immediate_childrens', null=True, blank=True
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

    # colocar debajo tus nuevos campos

    class Meta:
        verbose_name = _("hierarchy")
        verbose_name_plural = _("hierarchys")
        permissions = (
            ('list_hierarchy', 'Can list hierarchy'),
            ('get_hierarchy', 'Can get hierarchy'),
        )

    def __str__(self):
        return self.name
