import React from 'react';

function SvoCard(key, sent, subject, verb, obj, phrase) {
    return (
        <table className="p-3 table table-bordered border border-3 rounded" style={{ marginBottom: '1%' }}>
            <tr>
                <th className="p-3">Sentence:</th>
                <td className="p-1">{sent}</td>
                {console.log(sent)}
            </tr>
            <tr>
                <th className="p-3">Subject(विषय):</th>
                <td className="p-1">{subject}</td>
            </tr>
            <tr>
                <th className="p-3">Verb(क्रिया):</th>
                <td className="p-1">{verb}</td>
            </tr>
            <tr>
                <th className="p-3">Object:</th>
                <td className="p-1">{obj}</td>
            </tr>
            <tr>
                <th className="p-3">Phrase:</th>
                <td className="p-1">{phrase}</td>
            </tr>
        </table>
    )
}
export default SvoCard;