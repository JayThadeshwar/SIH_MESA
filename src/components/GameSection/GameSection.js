import React from 'react';
import cx from "classnames";
import styles from "./GameSection.module.scss";

const GameSection = () => {

    return (
        <div className={cx('container-fluid text-center m-0 p-0 mt-5', styles.gameSec)}>
            <div className='row m-0 p-0'>
                <div className={cx('col-xl-6 col-lg-6 col-md-6 col-sm-12 p-0', styles.gameImgDiv)}>


                    <img onClick={() => { "" }} src="https://cf.geekdo-images.com/n7MxdAIZRZNtgEPu2W-ccA__opengraph_letterbox/img/gvTtLn7CGuQy4a1DDwNKYTFwv6E=/fit-in/1200x630/filters:fill(auto):strip_icc()/pic4645227.jpg" className={cx("img-fluid rounded", styles.gameImg)} alt="" />       

                    <button type="button" className={cx(styles.playNowBtn, "rounded text-light p-2")}>Play Now</button>             

                </div>
                <div className={cx('col-xl-6 col-lg-6 col-md-6 col-sm-12 p-5 d-none d-md-flex d-flex flex-column align-items-center justify-content-center', styles.gameDescr)}>
                    <span>
                        <h4 className="fs-1">Mix & Match</h4>
                        Mix and Match is a brain training puzzle game where you need to colour each tile according to the category it fits into.

                    </span>
                </div>
            </div>

            <div className={cx('row m-0 p-0')}>
                <div className={cx('col-xl-6 col-lg-6 col-md-6 col-sm-12 p-5 d-none d-md-flex d-flex flex-column align-items-center justify-content-center', styles.gameDescr)}>
                    <h4 className="fs-1">Mix & Match</h4>
                    Mix and Match is a brain training puzzle game where you need to colour each tile according to the category it fits into.
                </div>
                <div className={cx('col-xl-6 col-lg-6 col-md-6 col-sm-12 p-0', styles.gameImgDiv, styles.lowerGame)}>
                    <img 
                    onClick={() => { "" }} 
                    src="https://cf.geekdo-images.com/n7MxdAIZRZNtgEPu2W-ccA__opengraph_letterbox/img/gvTtLn7CGuQy4a1DDwNKYTFwv6E=/fit-in/1200x630/filters:fill(auto):strip_icc()/pic4645227.jpg" 
                    className={cx("img-fluid rounded", styles.gameImg)}                     
                    alt="" />

                    <button type="button" className={cx(styles.playNowBtn, "rounded text-light p-2")}>Play Now</button>
                </div>
            </div>
        </div>
    )
}

export default GameSection