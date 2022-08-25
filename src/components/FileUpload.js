import React from 'react'
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';

function FileUpload({ uploadFile, setFile, setFileName }) {
    const {t} = useTranslation()

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    return (
        <div className="App">
            <input type="file" onChange={saveFile} />
            <button onClick={uploadFile}>{t("Upload")}</button>
        </div>
    );
}

export default FileUpload;