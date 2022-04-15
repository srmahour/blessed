
export default function ABox({children,style} : {children : React.ReactNode,style?:object}){
    return(
        <div className={'box'} style={style}>
            {children}
        </div>
    );
}