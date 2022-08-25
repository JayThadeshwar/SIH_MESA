import { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import CustomTimer from './CustomTimer';
import Grid from '@mui/material/Grid';
import '../css/MixMatch.css';
import { Box } from "@material-ui/core";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import * as con from '../constants'
import { useNavigate } from "react-router-dom";
const color = ["", "#bee9e8", "", "#62b6cb", "", "#1b4965", "", "#cae9ff", "", "#5fa8d3", "", "#2ec4b6"]
const color1 = ["#bee9e8", "#62b6cb", "#1b4965", "#cae9ff", "#5fa8d3", "#2ec4b6"]
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };
const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  // height: 190,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
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
  const navigate = useNavigate();
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


    axios.get(con.BASE_URI +'/game/1').then(resp => {
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
        <Paper elevation={3}>
                <Box sx={style} style={{paddingLeft:'7em',paddingRight:'7em'}}>
                    <Typography align="center" variant="h4">
                        Game Over
                    </Typography>
                    <Typography align="center" variant="h5" sx={{ mt: 2 }}>
                      You did it in {turns} turns      
                    </Typography>
                    <Stack direction={'row'} spacing={2} justifyContent="center" paddingTop={2}>
                        <Button variant="contained" color="success" onClick={() => { window.location.reload();}}>Play Again</Button>
                        <Button variant="contained" color="error" onClick={()=>{navigate('/home')}}> 
                            EXIT
                        </Button> 
                        {/* transfer to home page */}
                    </Stack>
                </Box>
            </Paper>
      </Modal>
  
      <div className='' style={{ height: '100vh' }}>
        <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography align="center" style={{ fontFamily: 'Tourney', fontWeight: 'bold', fontSize: 25, paddingTop: 25 }}>
                            <CustomTimer
          msg={"Time left :"}
          reset={md}
          time={100}
          start={true}
          setMd={setMd}

        ></CustomTimer>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography align="center" style={{ fontFamily: 'Tourney', fontWeight: 'bold', fontSize: 25, paddingTop: 25 }}>Mix and match</Typography>
                        </Grid>
                        <Grid item xs={2}>
                        <Button  align="center" style={{ fontFamily: 'Tourney', fontWeight: 'bold', fontSize: 25, paddingTop: 25 }} variant="contained" color="success" onClick={() => { window.location.reload();}}>Play Again</Button>
                        </Grid>
                    </Grid>
            </Box>
     

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
    </div>



  );
}

export default MixMatch;