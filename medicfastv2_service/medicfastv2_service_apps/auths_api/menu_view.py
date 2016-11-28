from django.utils.encoding import force_text
from rest_framework import serializers, viewsets
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route
from rest_framework import permissions
from django.utils.decorators import method_decorator
# from django.contrib.auth.decorators import permission_required

from medicfastv2_service_apps.utils.serializers import RecursiveSerializer
from medicfastv2_service_apps.utils.pagination import ModelPagination
from medicfastv2_service_apps.utils.security import log_params
from medicfastv2_service_apps.utils.permissions import ModelPermission

from medicfastv2_service_apps.auths.models.menu import Menu
import logging
log = logging.getLogger(__name__)


class MenuParentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Menu
        fields = '__all__'


class MenuSerializer(serializers.ModelSerializer):
    childrens = RecursiveSerializer(many=True, read_only=True)
    # parent_title = serializers.ReadOnlyField(source='parent.title')
    parent = MenuParentSerializer(required=False, many=False, read_only=True)

    class Meta:
        model = Menu
        fields = '__all__'
        # fields = ('id', 'title', 'parent', 'childrens')


class MenuViewSet(ModelPagination, viewsets.ModelViewSet):  # ModelPagination
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [ModelPermission, ]

    def get_queryset(self):
        '''


        print("Hola %s (id=%s)" %
              (self.request.user.username, self.request.user.id))
        if self.request.user.person:
            print("dni=%s)" % self.request.user.person.identity_num)
        print("==========\n")
        '''
        log.info('!!Writing in log file!!', extra=log_params(self.request))
        all = self.request.query_params.get('all', None)
        print ('MenuViewSet all=', all)
        self.queryset = self.queryset.filter(parent=None)  # si vas a modificar
        return ModelPagination.get_queryset(self)
        # return self.queryset.filter(parent=None)  # if is Recursive Tree
        # MenuViewSet(ModelPagination, viewsets.ModelViewSet)

    """
    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        queryall = (Q(module__icontains=query),
                    Q(title__icontains=query))
        #queryset = self.queryset.filter(reduce(OR, queryall), parent=None)
        queryset = self.queryset.filter(reduce(OR, queryall))
        return queryset
    """
    """
    @list_route()
    def roots(self, request):
        queryset = Menu.objects.filter(parent=None)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    """
