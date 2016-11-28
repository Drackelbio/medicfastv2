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
from django.db.models import Q

from rest_framework import serializers, viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.utils.six import BytesIO
# Get an instance of a logger
log = logging.getLogger(__name__)

import os
from django.conf import settings
from django.utils.encoding import force_text
import codecs


class LogView(APIView):
    """
    View to list log.
    """
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None, param=None):
        """
        Return menu of current user.
        """
        filedebug = 'temp\logs\log%s.txt' % (param)
        LOG_FILE = os.path.join(settings.BASE_DIR, filedebug)

        list = []
        try:

            audit = None
            try:
                audit = open(LOG_FILE, 'r')
            except (OSError, IOError) as e:
                print("%s no se encuentra" % filedebug)
                pass
            if audit:
                try:
                    for row in reversed(audit.readlines()):

                        data = row.split(']')
                        print (data)

                        list.append({
                            "date": data[0].strip().strip('['),
                            "type": data[1].strip().strip('['),
                            "mod": data[2].strip().strip('['),
                            "path": data[3].strip().strip('['),
                            "ip": data[4].strip().strip('['),
                            "user": data[5].strip().strip('['),
                            "method": data[6].strip().strip('['),

                            "desc": data[7].strip(),
                        })
                except:
                    pass

            if audit:
                audit.close()

        except Exception as e:
            print(e)

        return Response(list)
