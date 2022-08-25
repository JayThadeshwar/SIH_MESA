import React from 'react';
import cx from "classnames";
import styles from "./GameSection.module.scss";
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';

const GameSection = () => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    return (
        <div className={cx('container-fluid text-center m-0 p-0 mt-5', styles.gameSec)}>
            <div className='row m-0 p-0'>

                <div className={cx('col-xl-6 col-lg-6 col-md-6 col-sm-12 p-0', styles.gameImgDiv)}>

                    <img src="https://cf.geekdo-images.com/n7MxdAIZRZNtgEPu2W-ccA__opengraph_letterbox/img/gvTtLn7CGuQy4a1DDwNKYTFwv6E=/fit-in/1200x630/filters:fill(auto):strip_icc()/pic4645227.jpg" className={cx("img-fluid rounded", styles.gameImg)} alt="" />       

                    <button type="button" className={cx(styles.playNowBtn, "rounded text-light p-2")} onClick={() => {
                        navigate('/mixmatch');
                     }}>Play Now</button>             


                </div>
                <div className={cx('col-xl-6 col-lg-6 col-md-6 col-sm-12 p-5 d-none d-md-flex d-flex flex-column align-items-center justify-content-center fs-5', styles.gameDescr)}>
                    <span>
                        <h4 className="fs-1">{t("Game1")}</h4>
                        {t("Game1_def")}
                    </span>
                </div>
            </div>

            <div className={cx('row m-0 p-0')}>
                <div className={cx('col-xl-6 col-lg-6 col-md-6 col-sm-12 p-5 d-none d-md-flex d-flex flex-column align-items-center justify-content-center fs-5', styles.gameDescr)}>
                    <h4 className="fs-1">{t("Game2")}</h4>
                    {t("Game2_def")}
                </div>
                <div className={cx('col-xl-6 col-lg-6 col-md-6 col-sm-12 p-0', styles.gameImgDiv, styles.lowerGame)}>
                    <img
                    src="https://images.immediate.co.uk/production/volatile/sites/4/2018/07/GettyImages-585501092-e49fcd7.jpg" 
                    className={cx("img-fluid rounded", styles.gameImg)}                     
                    alt="" />

                    <button type="button" className={cx(styles.playNowBtn, "rounded text-light p-2")} 
                    onClick={() => { 
                        navigate('/flyingBalloon');
                     }} >{t("Play")}</button>
                </div>
            </div>
        </div>
    )
}

export default GameSection