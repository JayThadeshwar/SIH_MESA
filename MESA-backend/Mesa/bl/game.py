import random
from nltk.corpus import wordnet
from googletrans import Translator
from Mesa.constants import list_of_words

numGen = list()
listLen = len(list_of_words)

def getRandomNum():
    numb = random.randrange(0, listLen-4)
    while(numb in numGen):
        numb = random.randrange(0, listLen-4)
    numGen.append(numb)
    return numb

def mixNMatch():
    translator = Translator()
    res = list()

    for i in range(6):                        
        word = list_of_words[getRandomNum()]
        hi_word = translator.translate(word, src='en', dest='hi')
        while(word == hi_word.text.lower()):
            word = list_of_words[getRandomNum()]
            hi_word = translator.translate(word, src='en', dest='hi')

        word_dict = {}    
        word_dict['enWord'] = word
        word_dict['transWord'] = hi_word.text
        res.append(word_dict)
    numGen.clear()
    return res

def flyingBallon():

    res = list()    

    for i in range(10):      
        word_dict = {}
        index = getRandomNum()                  
        word = list_of_words[index]        
        syns = wordnet.synsets(word)
        
        while(len(syns) == 0):
            index = getRandomNum()
            word = list_of_words[index]        
            syns = wordnet.synsets(word)

        word_dict['definition'] = syns[0].definition()
        word_dict['answerIndex'] = index % 4
        wordList = ["","","",""]
        wordList[index % 4] = word
        k = 1
        for j in range(4):
            if(j != index % 4):
                wordList[j] = list_of_words[index + k]
                k += 1
        numGen.extend([index+1, index+2, index+3])   
        word_dict['wordOptions'] = wordList
        res.append(word_dict)
    numGen.clear()
    return res