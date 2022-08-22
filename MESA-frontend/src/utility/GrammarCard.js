import React from "react";

function GmCard(sent, nouns, adjective, verb, conjunction, adposition) {
  
  sent = sent.replace(/(\r\n|\n|\r)/gm, " ");
  const words = sent.split(" ");
  
  sent = sent.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  const puctLessWords = sent.split(" ");

  let nounsList = []
  if(nouns !== undefined) {
    nouns.forEach((element) => {
      nounsList.push(element["word"]);
    });
  }

  let adjectiveList = []
  if(adjective !== undefined) {
    adjective.forEach((element) => {
      adjectiveList.push(element["word"]);
    });
  }

  let verbList = []
  if(verb !== undefined) {
    verb.forEach((element) => {
      verbList.push(element["word"]);
    });
  }

  let conjunctionList = []
  if(conjunction !== undefined) {
    conjunction.forEach((element) => {
      conjunctionList.push(element["word"]);
    });
  }

  return (
    <table style={{ marginBottom: "1%" }}>
      <tr>
        <th>Sentence:</th>
        <td>
          {words.map((element,id) => {            
            let styles = {};
            console.log(puctLessWords[id] +" "+element+" "+nounsList.includes(puctLessWords[id]));
            if(nounsList.includes(puctLessWords[id])){
              styles = {
                color: 'red'
              };                 
            } else if(adjectiveList.includes(puctLessWords[id])){
              styles = {
                color: 'green'
              };
            } else if(verbList.includes(puctLessWords[id])){
              styles = {
                color: 'purple'
              };
            } else if(conjunctionList.includes(puctLessWords[id])){
              styles = {
                color: 'blue'
              };
            }
            element = element.toString() + " ";
            return (
              <span key={id} style={styles}>
                {element}
              </span>
            );
          })}
        </td>
      </tr>
      {nouns === undefined ? (
        <></>
      ) : (
        <tr>
          <th>Noun(संज्ञा):</th>
          {nouns.map((info, id) => {
            return (
              <td key={id}>
                {info["word"]} ({info["tagExp"]})
              </td>
            );
          })}
        </tr>
      )}
      {adjective === undefined ? (
        <></>
      ) : (
        <tr>
          <th>Adjective(विशेषण):</th>
          {adjective.map((info,id) => {
            return (
              <td key={id}>
                {info["word"]} ({info["tagExp"]})
              </td>
            );
          })}
        </tr>
      )}
      {verb === undefined ? (
        <></>
      ) : (
        <tr>
          <th>Verb(क्रिया):</th>
          {verb.map((info,id) => {
            return (
              <td key={id}>
                {info["word"]} ({info["tagExp"]})
              </td>
            );
          })}
        </tr>
      )}
      {conjunction === undefined ? (
        <></>
      ) : (
        <tr>
          <th>Conjunction(संयोजक):</th>
          {conjunction.map((info, id) => {
            return (
              <td key={id}>
                {info["word"]} ({info["tagExp"]})
              </td>
            );
          })}
        </tr>
      )}
      {adposition === undefined ? (
        <></>
      ) : (
        <tr>
          <th>Adposition(अनुस्थापन):</th>
          {adposition.map((info, id) => {
            return (
              <td key={id}>
                {info["word"]} ({info["tagExp"]})
              </td>
            );
          })}
        </tr>
      )}
    </table>
  );
}
export default GmCard;
