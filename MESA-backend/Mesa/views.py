import datetime
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse

from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
# from Mesa.bl.mcq import extractMCQ

from Mesa.models import Chapter, User
from Mesa.serializers import UserSerializer, ChapterSerializer
from Mesa.bl.vocabularyDev import extractKeywordsFromContent
from Mesa.bl.summaryNTranslation import summarizemethod
from Mesa.bl.grammarMod import generateGrammarDetails
from Mesa.bl.game import mixNMatch
from Mesa.bl.game import flyingBallon

# Create your views here.

class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

    def list(self, request):
        uId = request.GET.get('userId', 0)
        if (uId == 0):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        chpData = Chapter.objects.filter(userId=uId).order_by('creationDate')        
        result = ChapterSerializer(chpData, many=True)        
        return JsonResponse(result.data, safe=False)

    def create(self, request):
        chapterDetails = {}
        uId = request.data['userId'] 
        chpName = request.data['name']
        chpContent = request.data['content']

        chapterDetails['userId'] = uId
        chapterDetails['name'] = chpName
        chapterDetails['content'] = chpContent
        chapterDetails['vocabularyDevelopment'] = extractKeywordsFromContent(
            chpContent)
        chapterDetails['summaryNTranslation'] = summarizemethod(chpContent)
        chapterDetails['grammarInformation'] = generateGrammarDetails(
            chpContent, 3)

        Chapter.objects.create(**chapterDetails)
        return Response(status=status.HTTP_201_CREATED)


@csrf_exempt
def userApi(request, id=0):
    if request.method == 'GET':
        users = User.objects.all()
        users_serializer = UserSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)
    elif request.method == 'POST':
        user_info = JSONParser().parse(request)

        data = User(userName=user_info["userName"], emailId=user_info["emailId"],
                    password=user_info["password"], contactNumber='9820998981', dateOfBirth=datetime.date(1997, 10, 19))
        data.save()
        return JsonResponse("User information added successfully.", safe=False)

    elif request.method == 'PUT':
        user_info = JSONParser().parse(request)
        user = User.objects.get(UserId=user_info['userId'])
        users_serializer = UserSerializer(user, data=user_info)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse("Update successfully.", safe=False)
        return JsonResponse("Failed to update.", safe=False)

@csrf_exempt
def validateUserApi(request, id=0):
    if request.method == 'POST':
        user_info = JSONParser().parse(request)

        isValid = True
        msg = "Login successfully"
        info = None

        user = User.objects.filter(
            emailId=user_info['emailId'], password=user_info['password'])
        if not user.exists():
            isValid = False
            msg = "Either username or password is invalid"

        resp = {"msg": msg, "isValid": isValid, "info": info}
        return JsonResponse(resp, safe=False)

@csrf_exempt
def gameApi(request, game_no):
    if request.method == 'GET':
        result = {}
        if (int(game_no) == 1):
            result['words'] = mixNMatch()
        if (int(game_no) == 2):
            result['words'] = flyingBallon()
        return JsonResponse(result, safe=False)

# @csrf_exempt
# def homeApi(request, id=0):    
#     if request.method == 'GET':
#         uId = request.GET.get('userId', 0)
#         if (uId == 0):
#             return Response(status=status.HTTP_400_BAD_REQUEST)
#         chpData = Chapter.objects.filter(userId=uId).order_by('creationDate')        
#         result = ChapterSerializer(chpData, many=True)        
#         return JsonResponse(result.data, safe=False)        

# @csrf_exempt
# def mcqApi(request, chapter_id):
#     if request.method=='GET':
#         chapter=Chapter.objects.get(id = chapter_id)
#         result = extractMCQ(chapter.content)
#         return JsonResponse(result, safe=False)
