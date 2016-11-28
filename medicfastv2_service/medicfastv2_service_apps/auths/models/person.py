import uuid
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.text import capfirst, get_text_list
from django.dispatch import receiver
from django.db.models import signals
from unicodedata import normalize
from django.core.exceptions import ValidationError
from django.core.exceptions import NON_FIELD_ERRORS

# models
# others


class Person(models.Model):

    """
    Tabla para persons
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    national_id_doc = models.CharField(
        capfirst(_('national identity document')), max_length=20,
        null=True, blank=True
    )  # extend person documents in DocumentPersonType

    first_name = models.CharField(
        capfirst(_('first name')), max_length=50,
        help_text=_(
            'primer nombre'
        ),
    )
    other_names = models.CharField(
        capfirst(_('other names')), max_length=50, null=True, blank=True,
        help_text=_(
            'otros nombres'
        ),
    )
    last_name = models.CharField(
        capfirst(_('last name')), max_length=50, null=True, blank=True,
        help_text=_(
            'apellido paterno'
        ),
    )
    mother_last_name = models.CharField(
        capfirst(_('mother\'s last name')), max_length=50,
        null=True, blank=True,
        help_text=_(
            'apellido materno'
        ),
    )
    birth_date = models.DateField(
        _('birth date'), null=True, blank=True
    )
    photo = models.ImageField(
        capfirst(_('photo')), upload_to='persons',
        default='persons/default.png', null=True, blank=True,
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
        verbose_name = capfirst(_('person'))
        verbose_name_plural = capfirst(_('persons'))
        '''
        unique_together = (
            ('first_name', 'other_names', 'last_name', 'mother_last_name',
                'national_id_doc'),
            ('national_id_doc'),
        )
        '''

    def __str__(self):
        return '%s %s %s (%s)' % (self.first_name, self.last_name, self.mother_last_name, self.national_id_doc)
