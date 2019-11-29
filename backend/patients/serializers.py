from rest_framework import serializers
from .models import Patient, Sample, Variant

class PatientSerializer(serializers.ModelSerializer):
	class Meta:
	  	model = Patient
	  	fields = '__all__'

class SampleSerializer(serializers.ModelSerializer):
	class Meta:
		model = Sample
		fields = '__all__'

class VariantSerializer(serializers.ModelSerializer):
	class Meta:
		model = Variant
		fields = '__all__'


class TestSerializer(serializers.Serializer):
	id = serializers.IntegerField(read_only=True)
	firstname = serializers.CharField(max_length=120)
	middleInitial = serializers.CharField(max_length=10)
	lastname = serializers.CharField(max_length=120)
	gender = serializers.CharField(max_length=10)
	dateOfBirth = serializers.DateField()
	diagnosis = serializers.CharField(max_length=20, default="")
	dateOfDiagnosis = serializers.CharField(max_length=20, default="")

	def create(self, validated_data):
		return Patient.objects.create(**validated_data)

	def update(self, instance, validated_data):
		"""
		Update and return an existing `Snippet` instance, given the validated data.
		"""
		instance.firstname = validated_data.get('firstname', instance.firstname)
		instance.middleInitial = validated_data.get('middleInitial', instance.middleInitial)
		instance.lastname = validated_data.get('lastname', instance.lastname)
		instance.gender = validated_data.get('gender', instance.gender)
		instance.dateOfBirth = validated_data.get('dateOfBirth', instance.dateOfBirth)
		instance.diagnosis = validated_data.get('diagnosis', instance.diagnosis)
		instance.dateOfDiagnosis = validated_data.get('dateOfDiagnosis', instance.dateOfDiagnosis)
		instance.save()
		return instance
