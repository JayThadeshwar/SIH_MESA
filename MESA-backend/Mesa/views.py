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
        queryset = Chapter.objects.all()
        serializer_class = ChapterSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def create(self, request):
        chapterDetails = {}
        chpContent = request.data['content']

        chapterDetails['name'] = request.data['name']
        chapterDetails['content'] = chpContent
        chapterDetails['vocabularyDevelopment'] = extractKeywordsFromContent(chpContent)
        chapterDetails['summaryNTranslation'] = summarizemethod(chpContent)        
        chapterDetails['grammarInformation'] = generateGrammarDetails(chpContent, 3)
        
        Chapter.objects.create(**chapterDetails)
        # print(Chapter.objects.create(**request.data))
        return Response(status=status.HTTP_201_CREATED)

@csrf_exempt
def userApi(request, id=0):
    if request.method == 'GET':
        users = User.objects.all()
        users_serializer = UserSerializer(users, many = True)
        return JsonResponse(users_serializer.data, safe=False)
    elif request.method == 'POST':
        user_info = JSONParser().parse(request)

        data=User(userName=user_info["userName"],emailId=user_info["emailId"],password=user_info["password"],contactNumber='9820998981',dateOfBirth= datetime.date(1997, 10, 19))
        data.save()
        return JsonResponse("User information added successfully.", safe=False)

    elif request.method == 'PUT':
        user_info = JSONParser().parse(request)
        user = User.objects.get(UserId = user_info['userId'])
        users_serializer = UserSerializer(user, data = user_info)
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
       
        user = User.objects.filter(emailId = user_info['emailId'], password = user_info['password'])
        if not user.exists():
            isValid = False
            msg = "Either username or password is invalid"            
        
        resp = {"msg": msg, "isValid": isValid, "info": info}                    
        return JsonResponse(resp, safe=False)        

@csrf_exempt
def keywordApi(request, chapter_id):
    if request.method=='GET':                          
        result = extractKeywordsFromContent("Chess is a board game played between two players. It is sometimes called Western chess or international chess to distinguish it from related games such as xiangqi and shogi. The current form of the game emerged in Spain and the rest of Southern Europe during the second half of the 15th century after evolving from chaturanga, a similar but much older game of Indian origin. Today, chess is one of the world's most popular games, played by millions of people worldwide. Chess is an abstract strategy game and involves no hidden information. It is played on a square chessboard with 64 squares arranged in an eight-by-eight grid. At the start, each player (one controlling the white pieces, the other controlling the black pieces) controls sixteen pieces: one king, one queen, two rooks, two bishops, two knights, and eight pawns. The object of the game is to checkmate the opponent's king, whereby the king is under immediate attack and there is no way for it to escape. There are also several ways a game can end in a draw. Organized chess arose in the 19th century. Chess competition today is governed internationally by FIDE (International Chess Federation). The first universally recognized World Chess Champion, Wilhelm Steinitz, claimed his title in 1886; Magnus Carlsen is the current World Champion. A huge body of chess theory has developed since the game's inception. Aspects of art are found in chess composition, and chess in its turn influenced Western culture and art and has connections with other fields such as mathematics, computer science, and psychology. One of the goals of early computer scientists was to create a chess-playing machine. In 1997, Deep Blue became the first computer to beat the reigning World Champion in a match when it defeated Garry Kasparov. Today's chess engines are significantly stronger than the best human players, and have deeply influenced the development of chess theory.")   
        finalRes = {"keywords": result}     
        return JsonResponse(finalRes, safe=False)

@csrf_exempt
def grammarApi(request, chapter_id):
    if request.method=='GET':        
        result = generateGrammarDetails("Chess is a board game played between two players. It is sometimes called Western chess or international chess to distinguish it from related games such as xiangqi and shogi. The current form of the game emerged in Spain and the rest of Southern Europe during the second half of the 15th century after evolving from chaturanga, a similar but much older game of Indian origin. Today, chess is one of the world's most popular games, played by millions of people worldwide. Chess is an abstract strategy game and involves no hidden information. It is played on a square chessboard with 64 squares arranged in an eight-by-eight grid. At the start, each player (one controlling the white pieces, the other controlling the black pieces) controls sixteen pieces: one king, one queen, two rooks, two bishops, two knights, and eight pawns. The object of the game is to checkmate the opponent's king, whereby the king is under immediate attack and there is no way for it to escape. There are also several ways a game can end in a draw. Organized chess arose in the 19th century. Chess competition today is governed internationally by FIDE (International Chess Federation). The first universally recognized World Chess Champion, Wilhelm Steinitz, claimed his title in 1886; Magnus Carlsen is the current World Champion. A huge body of chess theory has developed since the game's inception. Aspects of art are found in chess composition, and chess in its turn influenced Western culture and art and has connections with other fields such as mathematics, computer science, and psychology. One of the goals of early computer scientists was to create a chess-playing machine. In 1997, Deep Blue became the first computer to beat the reigning World Champion in a match when it defeated Garry Kasparov. Today's chess engines are significantly stronger than the best human players, and have deeply influenced the development of chess theory.", 3)        
        return JsonResponse(result, safe=False)

@csrf_exempt
def summarizeApi(request, chapter_id):
    if request.method=='GET':
        chapter = Chapter.objects.get(id = chapter_id)                    
        result = summarizemethod(chapter.content)   
        return JsonResponse(result, safe=False)

@csrf_exempt
def gameApi(request, game_no):
    if request.method=='GET':
        result = {}
        if(int(game_no) == 1):
            result['words'] = mixNMatch()
        if(int(game_no) == 2):
            result['words'] = flyingBallon()
        return JsonResponse(result, safe=False)        

# @csrf_exempt
# def mcqApi(request, chapter_id):
#     if request.method=='GET':
#         chapter=Chapter.objects.get(id = chapter_id)                    
#         result = extractMCQ(chapter.content)   
#         return JsonResponse(result, safe=False)
        