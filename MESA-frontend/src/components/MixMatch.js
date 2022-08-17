
import { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import CustomTimer from './CustomTimer';
import '../css/MixMatch.css';

function MixMatch() {
  const [cards, setCards] = useState([])
  const [checkWord, setCheckWord] = useState({})
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [allWords, setAllWords] = useState([])
  const [md, setMd] = useState(false)
  const [isClick, setIsClick] = useState(false)
  
  //shuffling the cards
  const shuffleCards = (words) => {
    const shuffledCards = words.sort(() => Math.random() - 0.5)
      .map((word) => ({ word, id: Math.random(), match: false }))
     
    setIsClick(!isClick)
    setCards(shuffledCards)
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }
  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  
  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.word === checkWord[choiceTwo.word] || choiceTwo.word === checkWord[choiceOne.word]) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.word === choiceOne.word || card.word === choiceTwo.word) {
              
              return { ...card, match: true }
            }
            else {
              return card
            }

          }
          )
        })
        
        resetTurn()
      }
      else {
        setTimeout(() => resetTurn(), 1000)

      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  useEffect(() => {
    const res_dict =
    {
      "Hunger": "भूख",
      "Tools": "साधन",
      "Reach": "पहुँच",
      "Appropriate": "उचित",
      "Approval": "मंजूरी",
      "Bond": "बंधन",
    }
    setCheckWord(res_dict)
    let words = []
    for (const key of Object.keys(res_dict)) {
      words.push(key)
      words.push(res_dict[key])
    }

    shuffleCards(words)
    setAllWords(words)
  }, [])
  useEffect(() => {
    if (md) {

      setCards(prevCards => {
        return prevCards.map(card => {

          return { ...card, match: true }
        })
      })
    }
  }, [md])

  return (
    <div className="MixMatch">
      <h1>Mix and Match</h1>

      <div class="flex3">
        <div class="flex-items"> <CustomTimer
          msg={"Time left :"}
          reset={md}
          time={100}
          start={true}
          restart={isClick}
          setMd={setMd}

        ></CustomTimer></div>
        <div class="flex-items"> <button onClick={() => shuffleCards(allWords)}>New Game</button></div>

      </div>

      <div className='cardgrid'>
        {cards.map(card =>
        (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.match}
            disabled={disabled} />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>


  );
}

export default MixMatch;
