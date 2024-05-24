from django.shortcuts import render
from django.views import View


class DashBoardIndex(View):
    def get(self, request):

        domain = request.get_host().split('.')[0]
        if domain == 'hris':
            return render(request, 'frontend/index.html')
        else:
            return render(request, 'frontend/404.html')


