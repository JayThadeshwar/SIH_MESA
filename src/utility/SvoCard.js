import React from 'react';

function SvoCard(sent, subject, verb, obj, phrase) {
    return (
        <table style={{ marginBottom: '1%' }}>
            <tr>
                <th>Sentence:</th>
                <td>{sent}</td>
            </tr>
            <tr>
                <th>Subject(विषय):</th>
                <td>{subject}</td>
            </tr>
            <tr>
                <th>Verb(क्रिया):</th>
                <td>{verb}</td>
            </tr>
            <tr>
                <th>Object:</th>
                <td>{obj}</td>
            </tr>
            <tr>
                <th>Phrase:</th>
                <td>{phrase}</td>
            </tr>
        </table>
    )
}
export default SvoCard;