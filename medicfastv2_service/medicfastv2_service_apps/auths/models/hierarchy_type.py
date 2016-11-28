from uuid import uuid4
from datetime import datetime, timedelta
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.text import capfirst, get_text_list
# enums
from ..enums import HIERARCHY_TYPE_CHOICES
# models


class HierarchyType(models.Model):
    """
    Tabla para HierarchyType
    """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    hierarchy_type = models.CharField(
        max_length=50, choices=HIERARCHY_TYPE_CHOICES
    )

    name = models.CharField(
        capfirst(_('name')),  max_length=60
    )

    level = models.BigIntegerField(
        capfirst(_('level')),
    )

    is_active = models.BooleanField(
        capfirst(_('active')), default=True
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
        verbose_name = _("hierarchy type")
        verbose_name_plural = _("hierarchy types")
        permissions = (
            ('list_hierarchytype', 'Can list hierarchytype'),
            ('get_hierarchytype', 'Can get hierarchytype'),
        )
        db_table = 'auths_hierarchy_type'

    def __str__(self):
        return self.name
