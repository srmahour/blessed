import AInput from "./AInput";
import ALabel from "./ALabel";
import {AIcon} from "../elements/AIcon";





export default function AInputForm({t,inputType, inputValue, onValue, label,leftIcon,rightIcon,isColor,_id,remWS,placeholder} :
                                       {t(InTS: string) : string,inputType: string , inputValue : string , onValue(InValue : string) : void , label?: string,
                                           leftIcon? : string , rightIcon? : string,  isColor? : string, _id? : string,remWS?:boolean,placeholder?:string
                                       }){

    return(
        <div className={'field'}>
            <ALabel>{t(label)}</ALabel>
            <p className={`control ${leftIcon ? 'has-icons-left' : ''} ${rightIcon ? 'has-icons-right' : ''}`}>
                <AInput inputType={inputType}
                        _id={_id}
                        inputPlaceholder={placeholder}
                        remWS={!!remWS}
                        inputValue={inputValue} onValue={(InValue => onValue(InValue))} isColor={isColor} />
                {leftIcon &&
                <span

                    className={'icon is-small is-left'}>
                   {leftIcon ? <AIcon icon={leftIcon}/> : null}
                </span>}
                {
                    rightIcon &&
                    <span
                        style={{height:'3em'}}
                        className={'icon is-small is-right'}>
                    {rightIcon ? <AIcon icon={rightIcon}/> : null}
                </span>
                }

            </p>
        </div>
    )
}