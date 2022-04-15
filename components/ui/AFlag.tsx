// @ts-ignore
import {findFlagUrlByIso3Code} from 'country-flags-svg';

export const AFlag = ({locale} : {locale : string}) => {

    if (typeof locale === 'string'){
        let flag = '';
        switch(locale){
            default:
                flag = findFlagUrlByIso3Code(locale);
                break;
        }
        if (flag !== '')
        return(<img id={`flag-${locale}`}
            style={{width:'32px',height:'32px',marginRight:'3px'}}
            src={flag}
        />)
        else
            return (<div></div>)
    }else{
        return (<div></div>);
    }

}