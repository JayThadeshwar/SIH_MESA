import React, { useState, useEffect, useRef } from "react";

function CustomTimer({
    time,
    start,
    reset = false,
    msg,
    restart,
    setMd = 0,

}) {
    const [timer, setTimer] = useState(0);
    const increment = useRef(null);


    const handleStart = () => {
        increment.current = setInterval(() => {
            setTimer(function (timer) {
                if (timer > 1) {
                    return timer - 1;
                } else {
                    clearInterval(increment.current);
                    if (setMd !== 0) setMd(true);

                    handleReset();
                }
            });
        }, 1000);
    };


    const handleReset = () => {
        clearInterval(increment.current);
        setTimer(100);
    };

    const formatTime = () => {

        return timer


    };
    useEffect(() => {
        setTimer(time);
        if (start) {
            handleStart();
        }
       if (reset) {
            handleReset();
        }
        else
        handleStart();

        return () => {
            setTimer();
            clearInterval(increment.current);
        };
    }, [start, reset,restart]);

    return (
        <>
            {msg} {<b>{formatTime()}</b>}
        </>
    );
}
export default CustomTimer;
