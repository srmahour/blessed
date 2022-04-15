

export const AFloatLeft = ({children} : {children : React.ReactNode}) =>{
    return(
        <span style={{float:'left'}}>
            {children}
        </span>
    );
}


export const AFloatRight = ({children} : {children : React.ReactNode}) =>{
    return(
        <span style={{float:'right'}}>
            {children}
        </span>
    );
}