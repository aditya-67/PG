"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers                    # add this
from patients import views 
from rest_framework.urlpatterns import format_suffix_patterns

admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'patients', views.PatientView, 'Patient')
router.register(r'samples', views.SampleView, 'Sample')
router.register(r'variants', views.VariantView, 'Variant')

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'api/', include(router.urls)),
    path('snippets/<int:pk>', views.snippet_detail),
]
