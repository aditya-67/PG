from django.db import models

class Patient(models.Model):
	id = models.IntegerField(primary_key=True)
	firstname = models.CharField(max_length=120)
	middleInitial = models.CharField(max_length=10)
	lastname = models.CharField(max_length=120)
	gender = models.CharField(max_length=10)
	dateOfBirth = models.DateField()
	diagnosis = models.CharField(max_length=20, default="")
	dateOfDiagnosis = models.CharField(max_length=20, default="")

	def _str_(self):
		return self.firstname + " " + self.middleInitial + " " + self.lastname

class Sample(models.Model):
	id = models.IntegerField(primary_key=True)
	patientId = models.ForeignKey(Patient, on_delete=models.CASCADE)
	sampleType = models.CharField(max_length=25)
	date = models.DateTimeField()
	quality = models.CharField(max_length=25)

	def _str_(self):
		return self.sampleType

class Variant(models.Model):
	id = models.IntegerField(primary_key=True)
	sampleId = models.ForeignKey(Sample, on_delete=models.CASCADE)
	reference_base = models.CharField(max_length=10)
	alternativeBase = models.CharField(max_length=10)
	geneName = models.CharField(max_length=10)
	position = models.IntegerField()
	mutationType = models.CharField(max_length=10)
	alleleFrequency = models.DecimalField(max_digits=40, decimal_places=20)

	def _str_(self):
		return self.geneName
