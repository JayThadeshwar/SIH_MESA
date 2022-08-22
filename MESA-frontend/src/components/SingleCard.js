import React from 'react'
import '../css/SingleCard.css'
import back from "../images/back.jpg";
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
      <div className={flipped?"flipped":""}>
        <div className='front'>

          <h4>{card.word}</h4>
        </div>
        <img className='back' src={back}  alt='back' onClick={handleClick} />
      </div>
    </div>
  )
}
