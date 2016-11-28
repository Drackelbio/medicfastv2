from uuid import uuid4
from datetime import datetime, timedelta
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import ugettext_lazy as _
from django.utils.text import capfirst, get_text_list
# enums

# models
from .person import Person
# managers

from django.contrib.auth.models import UserManager
from django.conf import settings


class UserQuerySet(models.query.QuerySet):

    """ """

    def with_status(self):
        return self.extra(
            select={
                'status': '''SELECT
                status FROM (
                SELECT * FROM sad_user_status  ORDER BY id %(desc)s
                ) AS estado
                WHERE  estado.user_id = auth_user.id
                GROUP BY estado.user_id
                ''' % {'desc': settings.DESC}  # MySQL es DESC
            },
        )

# http://agiliq.com/books/djangodesignpatterns/models.html


class UserManager(UserManager):  # models.Manager

    """ """

    def get_queryset(self):
        return UserQuerySet(self.model, using=self._db)

    def with_status(self):
        return self.get_queryset().with_status()

    def get_by_natural_key(self, username):
        return self.get(username=username)


class User(AbstractUser):
    """
    Tabla para usuarios
    """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    class Meta:
        verbose_name = capfirst(_('user'))
        verbose_name_plural = capfirst(_('users'))
        permissions = (
            ('list_user', 'Can list user'),
            ('get_user', 'Can get user'),
        )

    # add nuevos campos al modelo User
    last_hierarchy_id = models.CharField(max_length=50, null=True, blank=True)
    last_module_id = models.CharField(max_length=50, null=True, blank=True)
    person = models.OneToOneField(
        Person, verbose_name=capfirst(_('person')),
        null=True, blank=True,  # solo User, para otro tipo de person, False
        # unique=True OneToOneField ya es unico
        # related_name='user'
    )

    updated_at = models.DateTimeField(
        _('updated at'), auto_now=True, blank=True, null=True
    )
    registered_by = models.TextField(
        blank=True, null=True
    )

    objects = UserManager()  # override the default manager

    def __str__(self):
        return self.username
