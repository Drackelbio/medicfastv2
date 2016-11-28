
from uuid import uuid4
from datetime import datetime, timedelta
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import ugettext_lazy as _
from django.utils.text import capfirst, get_text_list
# enums
from ..enums import MODULE_CHOICES, BACKEND
# models


class Menu(models.Model):

    """
    Menus del sistema, menu a dos niveles. Example
    [
    {title: 'System', menu_items:[{title:'Permissions'}, {title:'Groups'},]}
    {title: 'Accounts', menu_items:[{title:'Users'}, {title:'Hierarchy'},]}
    ]
    """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    module = models.CharField(
        _('module'), max_length=50, choices=MODULE_CHOICES, default=BACKEND
    )

    state = models.CharField(
        capfirst(_('state or section')), max_length=50,
        help_text=_(
            'state or section (estado o grupo de estados)'
        ),
    )
    title = models.CharField(
        capfirst(_('title')), max_length=50
    )
    url = models.CharField(
        capfirst(_('url')), max_length=150, default='#'
    )
    template_url = models.CharField(
        capfirst(_('template url')), max_length=250, default='#'
    )
    pos = models.IntegerField(
        _('position'), default=1
    )
    icon = models.CharField(
        _('icon'), max_length=50, null=True, blank=True, default=''
    )
    is_active = models.BooleanField(
        capfirst(_('active')), default=True
    )

    is_abstract = models.BooleanField(
        capfirst(_('is_abstract')), default=False
    )
    description = models.TextField(
        _('description'), null=True, blank=True
    )
    router_json = models.TextField(
        _('router json'), null=True, blank=True
    )
    permission = models.ForeignKey(
        Permission, verbose_name=_('permission'), null=True, blank=True,
        help_text=_(
            'NULL if is root'
        ),
    )
    parent = models.ForeignKey(
        'self',  related_name='childrens', verbose_name=_('parent'),
        null=True, blank=True
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
        verbose_name = _('menu')
        verbose_name_plural = _('menus')
        permissions = (
            ('list_menu', 'Can list menu'),
            ('get_menu', 'Can get menu'),
        )

    def __str__(self):
        return '%s (%s)' % (
            self.title, dict((x, y) for x, y in MODULE_CHOICES)[self.module]
        )
