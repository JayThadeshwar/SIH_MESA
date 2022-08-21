import random
from googletrans import Translator
from Mesa.constants import list_of_words

numGen = list()
listLen = len(list_of_words)

def getRandomNum():
    numb = random.randrange(0, listLen)
    while(numb in numGen):
        numb = random.randrange(0, listLen)
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
    return res
