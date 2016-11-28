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

from medicfastv2_service_apps.auths.models.user import User
# Get an instance of a logger
log = logging.getLogger(__name__)


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

    '''
    @detail_route()
    def group_names(self, request):
        """
        Returns a list of all the group names that the given
        user belongs to.
        """
        user = self.get_object()
        groups = user.groups.all()
        return Response([group.name for group in groups])
    '''


class UserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ('password', )


class LocalUserInfoView(APIView):
    """
    View to list all users in the system.
    """
    permission_classes = [ModelPermission]
    permission_replace_by_model = 'todo.localuserinfo'

    # permission required = ['myaccounts.list_localuserinfo', ] =  GET method
    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        user = self.request.user
        serializer = UserInfoSerializer(user)
        if not self.request.user:
            return Response(
                {'detail': 'AUTHENTICATION IS REQUIRED'},
                status=status.HTTP_511_NETWORK_AUTHENTICATION_REQUIRED
            )
        if not self.request.user.is_anonymous():
            log.info(force_text('User is authenticated'),
                     extra=log_params(self.request))
            return Response(serializer.data)
        else:
            log.warning(force_text('User is anonymous'),
                        extra=log_params(self.request))
        return Response({'detail': 'AUTHENTICATION IS REQUIRED'},
                        status=status.HTTP_511_NETWORK_AUTHENTICATION_REQUIRED)
        '''
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        '''
