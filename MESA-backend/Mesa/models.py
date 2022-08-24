import djongo
from djongo import models


class User(models.Model):
    userId = models.AutoField(primary_key=True)
    userName = models.CharField(max_length=500)
    contactNumber = models.CharField(max_length=500)
    emailId = models.CharField(max_length=500)
    password = models.CharField(max_length=500)
    dateOfBirth = models.DateField()
    markForDelete = models.BooleanField(default=False)


class CustomStringList(models.Model):
    item = models.TextField()

    class Meta:
        abstract = True


class Vocab(models.Model):
    word = models.CharField(max_length=100)
    definition = models.ArrayField(
        model_container=CustomStringList
    )
    synonyms = models.ArrayField(
        model_container=CustomStringList
    )
    antonyms = models.ArrayField(
        model_container=CustomStringList
    )
    example = models.ArrayField(
        model_container=CustomStringList
    )
    audioLink = models.TextField()
    translatedWord = models.CharField(max_length=250)

    class Meta:
        abstract = True

class SummaryTranslation(models.Model):
    summary = models.TextField()
    translation = models.TextField()

    class Meta:
        abstract = True

# class GrammarInfo(models.Model):
#     grammarticalInfo = models.TextField()
#     translation = models.TextField()

#     class Meta:
#         abstract = True

class Chapter(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500)
    content = models.TextField()
    vocabularyDevelopment = models.ArrayField(
        model_container=Vocab
    )
    summaryNTranslation = models.EmbeddedField(
        model_container=SummaryTranslation
    )
    # grammarInformation = models.EmbeddedField(
    #     model_container=SummaryTranslation
    # )
    creationDate = models.DateTimeField(auto_now=True)
