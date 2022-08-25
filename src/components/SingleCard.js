import React from 'react'
import back from "../images/back.jpg";
import '../css/SingleCard.css'
export default function SingleCard({card, handleChoice,flipped,disabled }) {
  const handleClick=()=>
{
  if(!disabled)
  {
    handleChoice(card)
  }
    
}
  return (
    <div className='card' >
      <div className={flipped ? "flipped" : ""}  >
        <div className='front' style={{ backgroundColor: card.color != "" ? card.color : "" }}>

          <h2 style={{ color: card.color != "" ? "white" : "" }}>{card.word}  </h2>
        </div>
        <img className='back' src={back} alt='back' onClick={handleClick} />
      </div>
    </div>
  )
}
