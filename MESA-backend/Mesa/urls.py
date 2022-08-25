from Mesa import views
from django.urls import include, path, re_path
from rest_framework import routers

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'chapters', views.ChapterViewSet, basename='Chapter')

urlpatterns=[
     path('', include(router.urls)),
     re_path(r'^user$',views.userApi),
     # re_path(r'^home$',views.homeApi),
     re_path(r'^user/validate$',views.validateUserApi),     
     re_path(r'^game/(?P<game_no>\d+)$', views.gameApi, name='game')
     # re_path(r'^mcq/(?P<chapter_id>\d+)/$', views.mcqApi, name='mcq')
]