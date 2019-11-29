from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PatientSerializer, SampleSerializer, VariantSerializer
from .models import Patient, Sample, Variant
from django_filters import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Patient
from .serializers import TestSerializer


class PatientView(viewsets.ModelViewSet):
	serializer_class = PatientSerializer
	queryset = Patient.objects.all()

class SampleView(viewsets.ModelViewSet):
	serializer_class = SampleSerializer
	queryset = Sample.objects.all()
	filterset_fields = ('patientId', 'id')

class VariantView(viewsets.ModelViewSet):
	serializer_class = VariantSerializer
	queryset = Variant.objects.all()
	filterset_fields = ('sampleId', 'id')

@api_view(['GET', 'PUT', 'DELETE'])
def snippet_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Patient.objects.get(pk=pk)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TestSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TestSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)