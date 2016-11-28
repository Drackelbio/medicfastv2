from django.conf.urls import url, include
from rest_framework import routers
from .permission_view import PermissionViewSet

from .menu_view import MenuViewSet
from .user_view import UserViewSet, LocalUserInfoView
from .api_user_menu import UserMenuView
from .api_logs import LogView
from .api_routers import RouterView


# from .api_views import load_menu

# router = ExtendedSimpleRouter()
router = routers.DefaultRouter()

router.register(r'permissions', PermissionViewSet)

router.register(r'users', UserViewSet)

router.register(r'menus', MenuViewSet)


urlpatterns = [

    url(r'^localuserinfo/$', LocalUserInfoView.as_view()),
    # url(r'^load_menu/$', load_menu, name='load_menu'),
    url(r'^usermenu/$', UserMenuView.as_view()),
    url(r'^logs/(?P<param>[^/]+)/$', LogView.as_view()),

    url(r'^routers/$', RouterView.as_view()),

    url(r'^', include(router.urls)),
]
