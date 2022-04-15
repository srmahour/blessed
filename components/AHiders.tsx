
export  function AMobileOnly({children,style} : {children:React.ReactNode, style?: object})
{
    return(
        <span style={style} className={'is-hidden-tablet'}>
            {children}
        </span>
    )
}


export  function ATabletOnly({children,style} : {children:React.ReactNode, style?: object})
{
    return(
        <span style={style} className={'is-hidden-mobile'}>
            <span className={'is-hidden-desktop'}>
                 {children}
            </span>
        </span>
    )
}


export  function ADesktopOnly({children,style} : {children:React.ReactNode, style?: object})
{
    return(
        <span style={style} className={'is-hidden-touch'}>
            {children}
        </span>
    )
}