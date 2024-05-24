from django.urls import path

from .views import *

app_name = 'company_shared'
urlpatterns = [
    path('', DashBoardIndex.as_view(), ),


]