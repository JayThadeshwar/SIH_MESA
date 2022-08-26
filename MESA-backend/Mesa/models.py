from django.db import models

class User(models.Model):
    userId = models.AutoField(primary_key=True)
    userName = models.CharField(max_length=500)
    contactNumber = models.CharField(max_length=500)
    emailId = models.CharField(max_length=500, unique=True)
    password = models.CharField(max_length=500)
    dateOfBirth = models.DateField()
    markForDelete = models.BooleanField(default=False)
    isAdmin=models.BooleanField(default=False)

class Chapter(models.Model):
    userId = models.IntegerField()
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500)
    content = models.TextField()
    vocabularyDevelopment = models.JSONField()
    summaryNTranslation = models.JSONField()
    grammarInformation = models.JSONField()
    # mcq = models.JSONField()
    creationDate = models.DateTimeField(auto_now=True)

class Languages(models.Model):
    code=models.CharField(max_length=500)
    name=models.CharField(max_length=500)
    country=models.CharField(max_length=500)
    

