from django.contrib import admin
from .models import Patient, Sample, Variant

class PatientAdmin(admin.ModelAdmin):
	list_display = ('id', 'firstname', 'middleInitial', 'lastname', 'gender', 'dateOfBirth','diagnosis', 'dateOfDiagnosis')

class SampleAdmin(admin.ModelAdmin):
	list_display = ('id', 'patientId', 'sampleType', 'date', 'quality')

class VariantAdmin(admin.ModelAdmin):
	list_display = ('id', 'sampleId', 'reference_base', 'alternativeBase', 'geneName', 'position', 'mutationType', 'alleleFrequency')

admin.site.register(Patient, PatientAdmin)
admin.site.register(Sample, SampleAdmin)
admin.site.register(Variant, VariantAdmin)
