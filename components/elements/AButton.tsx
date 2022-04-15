
import {AIcon} from "./AIcon";


export default function AButton({t,btnText,btnType,btnSize,btnState,btnIcon, onClicked,disabled,style} :
    {t(InTS: string) : string,  btnText : string,btnType : string, btnSize? : string,
    btnState? : string, btnIcon? : string, onClicked()  : void,disabled? : boolean,style? : object}){
    return(
        //@ts-ignore
        <a disabled={disabled}
            style={style !== undefined ? style : {}}
            className={`button ${btnType !== undefined ? btnType : ''} ${btnSize !== undefined ? btnSize : ''} ${btnState !== undefined ? btnState : ''}`}
            onClick={() => onClicked()}
        >
            <span className={''}>
                {btnIcon !== undefined && <AIcon icon={btnIcon}/>}&nbsp;
            </span>
            <span>
                {t(btnText)}
            </span>
        </a>
    )
}
