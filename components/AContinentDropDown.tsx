
import {ADropDown} from "./elements/ADropDown";



export const AContinentDropDown = ({t,onSelected,preSelect,preSelValue } : {t(ts : string) : string , onSelected(value : any) : any ,preSelect? : boolean,preSelValue? : string}) => {
    const data = [
        {
            "display": "Africa",
            "value": "C-AF"
        },
        {
            "display": "Asia",
            "value": "C-AS"
        },
        {
            "display": "Europe",
            "value": "C-EU"
        },
        {
            "display": "North America",
            "value": "C-NA"
        },
        {
            "display": "Oceania",
            "value": "C-OC"
        },
        {
            "display": "South America",
            "value": "C-SA"
        }
    ];

    let selText = t('common:select-continent');
    if (preSelect){
        if (preSelValue === ''){

        }
        else{
            // @ts-ignore
            selText = data.find(i => i.value === preSelValue).display;
        }
    }
    return(// @ts-ignore
        <ADropDown t={t} dropText={selText} list={data} onSelected={(v) => {
            onSelected(v);
        }}/>
    )

}


