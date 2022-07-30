import React from "react";

function GmCard(sent, nouns, adjective, verb, conjunction, adposition) {
  return (
    <table style={{ marginBottom: "1%" }}>
      <tr>
        <th>Sentence:</th>
        <td>{sent}</td>
      </tr>
      {nouns === undefined ? (
        <></>
      ) : (
        <tr>
          <th>Noun(संज्ञा):</th>
          {nouns.map((info) => {
            return (
              <td>
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
          {adjective.map((info) => {
            return (
              <td>
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
          {verb.map((info) => {
            return (
              <td>
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
          {conjunction.map((info) => {
            return (
              <td>
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
          {adposition.map((info) => {
            return (
              <td>
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
