import React from "react";

function GmCard(key, sent, nouns, adjective, verb, conjunction, adposition) {

  sent = sent.replace(/(\r\n|\n|\r)/gm, " ");
  const words = sent.split(" ");

  sent = sent.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  const puctLessWords = sent.split(" ");

  let nounsList = []
  if (nouns !== undefined) {
    nouns.forEach((element) => {
      nounsList.push(element["word"]);
    });
  }

  let adjectiveList = []
  if (adjective !== undefined) {
    adjective.forEach((element) => {
      adjectiveList.push(element["word"]);
    });
  }

  let verbList = []
  if (verb !== undefined) {
    verb.forEach((element) => {
      verbList.push(element["word"]);
    });
  }

  let conjunctionList = []
  if (conjunction !== undefined) {
    conjunction.forEach((element) => {
      conjunctionList.push(element["word"]);
    });
  }

  return (


    <table className="p-3 table table-bordered border border-3 rounded"  style={{ marginBottom: "1%" }}>
      
      
      
      <tr>        
        <th className="p-3">Sentence:</th>
        <td className="p-1">


          {words.map((element,id) => {            
            
            let styles = {};
            console.log(puctLessWords[id] +" "+element+" "+nounsList.includes(puctLessWords[id]));
            
            
            if(nounsList.includes(puctLessWords[id])){
              styles = {
                color: 'red',
                fontWeight: 800
              };                 
            } else if(adjectiveList.includes(puctLessWords[id])){
              styles = {
                color: 'green',
                fontWeight: 800
              };
            } else if(verbList.includes(puctLessWords[id])){
              styles = {
                color: 'purple',
                fontWeight: 800
              };
            } else if(conjunctionList.includes(puctLessWords[id])){
              styles = {
                color: 'blue',
                fontWeight: 800
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
          <th className="p-3">Noun(संज्ञा):</th>
          {nouns.map((info, id) => {
            return (
              <td  className="p-1" key={id}>
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
          <th className="p-3">Adjective(विशेषण):</th>
          {adjective.map((info,id) => {
            return (
              <td  className="p-1" key={id}>
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
          <th className="p-3">Verb(क्रिया):</th>
          {verb.map((info,id) => {
            return (
              <td  className="p-1" key={id}>
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
          <th className="p-3">Conjunction(संयोजक):</th>
          {conjunction.map((info, id) => {
            return (
              <td  className="p-1" key={id}>
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
          <th  className="p-3">Adposition(अनुस्थापन):</th>
          {adposition.map((info, id) => {
            return (
              <td className="p-1" key={id}>
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
