import { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import CustomTimer from './CustomTimer';
import '../css/MixMatch.css';
import { Box } from "@material-ui/core";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
const color = ["", "#bee9e8", "", "#62b6cb", "", "#1b4965", "", "#cae9ff", "", "#5fa8d3", "", "#2ec4b6"]
const color1 = ["#bee9e8", "#62b6cb", "#1b4965", "#cae9ff", "#5fa8d3", "#2ec4b6"]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
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
  const [isCount, setIsCount] = useState(1)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //shuffling the cards
  const shuffleCards = (words) => {
    const shuffledCards = words
      .map((word, index) => ({ word, id: Math.random(), match: false, color: "", colorId: Math.floor(index / 2) }))
      .sort(() => Math.random() - 0.5)

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
              setIsCount(prevIsCount => {
                return prevIsCount + 1
              })
              if (isCount === 11) {
                handleShow()
                setMd(true)
              }

              return { ...card, match: true, color: color1[card.colorId] }
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
    let dict;


    axios.get('http://127.0.0.1:8000/game/1').then(resp => {
      let d = resp.data.words

      dict = Object.assign({}, ...d.map((x) => ({ [x.enWord]: x.transWord })));
      const res_dict = dict
      setCheckWord(res_dict)
      let words = []
      for (const key of Object.keys(res_dict)) {
        words.push(key)
        words.push(res_dict[key])
      }

      shuffleCards(words)
      setAllWords(words)

    }).catch(error => {
      console.log(error);
    })

  }, [])
  useEffect(() => {
    if (md) {

      setCards(prevCards => {
        return prevCards.map(card => {

          return { ...card, match: true, color: color1[card.colorId] }
        })
      })
    }
  }, [md])

  return (
    <div className="MixMatch">

      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Congratulations!!!!!!!!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You did it in {turns} turns
          </Typography>
          <button id="new" onClick={() => { window.location.reload(); }}>New Game</button>
        </Box>
      </Modal>
      <h1>Mix and Match</h1>

      <div class="flex3">
        <div class="flex-items"> <CustomTimer
          msg={"Time left :"}
          reset={md}
          time={100}
          start={true}
          setMd={setMd}

        ></CustomTimer></div>
        <div class="flex-items"> <button onClick={() => { window.location.reload(); }}>New Game</button></div>

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