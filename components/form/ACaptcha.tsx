
import React, {useEffect} from "react";
import dynamic from 'next/dynamic';

// @ts-ignore


const loadCaptchaEnginge  = dynamic(async ()  => import('react-simple-captcha')
    .then(async (mod) => await mod.loadCaptchaEnginge),{ssr:false});

const LoadCanvasTemplate  = dynamic(() => import('react-simple-captcha')
    .then((mod) => mod.LoadCanvasTemplate),{ssr:false});

export const ACaptcha = ({t,onCaptcha} : {t(ts : string) : string,onCaptcha(bool : boolean)}) => {
    useEffect(() => {
        if (process.browser)
            { // @ts-ignore
                loadCaptchaEnginge(7,'#daebf7');
            }
    },[]);

    if (process.browser){
        return(
            <span>
            <LoadCanvasTemplate/>
        </span>
        )
    }
    else{
        return(
            <span>

        </span>
        )
    }

}