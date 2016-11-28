"""
@copyright   Copyright (c) 2016  Devhres Team
@author      Angel Sullon (@asullom)
@package     utils

Descripcion: pagination
"""

from django.db.models import Q
from rest_framework import pagination
from rest_framework.response import Response


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'

    def siguente(self):
        if not self.page.has_next():
            return None
        page_number = self.page.next_page_number()
        return page_number

    def anterior(self):
        if not self.page.has_previous():
            return None
        page_number = self.page.previous_page_number()
        return page_number

    def plus(self):
        if not self.page.has_next():
            return None
        page = self.page.next_page_number() - 1
        return page

    def range(self):
        total = self.page.paginator.count
        start = self.page.start_index()
        end = self.page.end_index()
        rangep = '{0} - {1} of {2} items'.format(start, end, total)
        return rangep

    def get_paginated_response(self, data):
        """
        return Response({
            'options': {
                'count': self.page.paginator.count,
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
                'pagination': self.page_size,
                'page': self.page.number,
            },
            'results': data
        })
        """
        return Response({
            'options': {
                'count': self.page.paginator.count,
                'pages': self.page.paginator.num_pages,

                'page': self.page.number,
                'next': self.siguente(),
                'previous': self.anterior(),
                'range': self.range(),
                'page_size': self.page_size,
            },
            'results': data
        })


class ModelPagination():
    pagination_class = StandardResultsSetPagination
    page = StandardResultsSetPagination
    default_fields = 'codename'

    def search(self, fields, term):
        query = Q()
        for c in fields.split(','):
            dynamic_field = c + '__icontains'
            query = query | Q(**{dynamic_field: term})
        return query

    def default_search(self, default_fields, term):
        query = Q()
        for c in default_fields.split(','):
            dynamic_field = c + '__icontains'
            query = query | Q(**{dynamic_field: term})
        return query

    def get_queryset(self):

        queryset = self.queryset
        search = self.request.query_params.get('query', None)
        page_size = self.request.query_params.get('page_size', None)
        fields = self.request.query_params.get('fields', None)
        sort = self.request.query_params.get('sort', None)
        all = self.request.query_params.get('all', None)
        print ('all=', all)
        pag = self.request.query_params.get('page', None)
        if (self.request.query_params.get('page', None) is None):
            pag = 1

        if all == 'true':
            self.pagination_class = None
        if page_size is not None:
            try:
                page_int = int(page_size)
                if page_int > 0:
                    self.page.page_size = page_int
            except ValueError:
                self.page.page_size

        if (search and fields) is not None:
            queryset = queryset.filter(self.search(fields, search))

        elif search is not None:
            queryset = queryset.filter(
                self.default_search(self.default_fields, search))

        valor = []
        if sort is not None:
            for ss in sort.split(','):
                valor.append(ss)

        queryset = queryset.order_by(*valor)
        return queryset
