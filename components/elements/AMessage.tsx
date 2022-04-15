
export const AMessage = ({t,opt,msg} : {t(ts : string) : string, opt : string , msg : string}) => {
    return(
        <article className={`message ${opt}`}>
            <div className={'message-body'}>
                {t(msg)}
            </div>
        </article>
    )
}