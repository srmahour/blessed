

export const AHelp = ({t,status,msg} : {t(ts: string) : string , status : string,msg:string}) => {
    return <p style={{fontSize:'18px'}}
        className={`help ${status} is-large`}>{t(msg)}</p>
}