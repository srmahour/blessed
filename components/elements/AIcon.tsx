import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faTelegramPlane,faTelegram,faCcStripe} from '@fortawesome/fontawesome-free-brands'

export function AIcon({icon} : {icon : string}){
    // @ts-ignore

    let I = ['fad',icon];

    switch(icon){
        case 'telegram':
            // @ts-ignore
            I = faTelegram;
            break;
        case 'stripe':
            // @ts-ignore
            I = faCcStripe;
    }
    if (icon === 'kofi'){
        return(<img
            style={{height:'16px',
                width:'16px',
                marginRight:'8px',
                marginBottom:'4px',
                verticalAlign:'middle',
                border:0
            }}
            src={'https://cdn.ko-fi.com/cdn/cup-border.png'}/>);
    }
    else
    //@ts-ignore
    return(<FontAwesomeIcon icon={I}/>)
}