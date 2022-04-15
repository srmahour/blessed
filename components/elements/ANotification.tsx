
export function ANotification({t,color,message, onClose} : {t(ts : string) : string , color : string , message : string , onClose() : void}){
    return(
        <span>
            <div className={`notification ${color} is-light`}>
            <button
                onClick={() => onClose()}
                className={'delete'}/>
                {t(message)}
            </div>
        </span>
    )
}