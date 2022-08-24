import djongo
from djongo import models
from django.contrib.postgres.fields import ArrayField


class User(models.Model):
    userId = models.AutoField(primary_key=True)
    userName = models.CharField(max_length=500)
    contactNumber = models.CharField(max_length=500)
    emailId = models.CharField(max_length=500)
    password = models.CharField(max_length=500)
    dateOfBirth = models.DateField()
    markForDelete = models.BooleanField(default=False)


class Vocab(models.Model):
    word = models.CharField(max_length=100)
    definition = ArrayField(
        models.CharField(max_length=300, blank=True)
    )
    synonyms = ArrayField(
        models.CharField(max_length=100, blank=True)
    )
    antonyms = ArrayField(
        models.CharField(max_length=100, blank=True)
    )
    example = ArrayField(
        models.CharField(max_length=300, blank=True)
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


class WordPosExplaination(models.Model):
    word = models.CharField(max_length=100)
    tagExp = models.CharField(max_length=200)

    class Meta:
        abstract = True


class PosInfo(models.Model):
    sentence = models.TextField()
    noun = models.ArrayField(
        model_container=WordPosExplaination
    )
    verb = models.ArrayField(
        model_container=WordPosExplaination
    )
    adjective = models.ArrayField(
        model_container=WordPosExplaination
    )
    adposition = models.ArrayField(
        model_container=WordPosExplaination
    )

    class Meta:
        abstract = True


class SvoInfo(models.Model):
    sentence = models.TextField()
    subject = models.CharField(max_length=500)
    verb = models.CharField(max_length=500)
    object = models.CharField(max_length=500)
    phrase = models.TextField()

    class Meta:
        abstract = True


class GrammarInfo(models.Model):
    grammarticalInfo = models.ArrayField(
        model_container=PosInfo
    )
    svoInfo = models.ArrayField(
        model_container=SvoInfo
    )

    class Meta:
        abstract = True


class Chapter(models.Model):
    name = models.CharField(max_length=500)
    content = models.TextField()
    vocabularyDevelopment = models.ArrayField(
        model_container=Vocab
    )
    summaryNTranslation = models.EmbeddedField(
        model_container=SummaryTranslation
    )
    grammarInformation = models.EmbeddedField(
        model_container=GrammarInfo
    )
    creationDate = models.DateTimeField(auto_now=True)
