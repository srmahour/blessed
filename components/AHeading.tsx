import {ADesktopOnly, AMobileOnly, ATabletOnly} from "./AHiders";
import {ABR} from "./elements/ABR";


export default function AHeading({children,size} : {children : React.ReactNode,size:string})
{

    return(
        <span>
         <AMobileOnly style={{textAlign:'center'}}>
             <ABR h={55}/>
            <span className={`is-size-${size === '1' ? '4' : '1'}-mobile`}><p >{children}</p></span>
         </AMobileOnly>
         <ATabletOnly style={{textAlign:'center'}}>
             <span className={`is-size-${size}-tablet`}><p>{children}</p></span>
         </ATabletOnly>
        <ADesktopOnly>
            <span className={`is-size-${size} has-text-justified`}><p className={'has-text-centered'}>{children}</p></span>
        </ADesktopOnly>
        </span>
    );
}