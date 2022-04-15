import {nanoid} from "nanoid";
import {useEffect} from "react";


interface  inputDetails {
    value: string
}



export default function AInput ({inputType, inputValue, onValue, inputPlaceholder,isColor,_id,remWS} :
    {inputType : string, inputValue: string,  onValue(InValue : string) : void , inputPlaceholder? : string,isColor? : string,_id?:string,remWS?:boolean}){



    return(
        <input className={`input ${isColor ? isColor : ''}`}
               type={`${inputType}`}
               id={_id ? _id : nanoid()}
               style={{backgroundColor:'#a4cdec'}}
               value={inputValue}
               placeholder={inputPlaceholder}
               onChange={(ev) => {
                   // @ts-ignore
                  remWS ? onValue(ev.target.value.replace(" ","")) : onValue(ev.target.value);
               }}

            
        />
    )
}