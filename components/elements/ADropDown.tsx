import {AIcon} from "./AIcon";
import {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {AFlag} from "../ui/AFlag";


interface IDropSchema {
    [index : number] : {display : string , value : any};
}


export function ADropDown({t,dropText, list, onSelected,bFlag,bIsEmpty,empty} :
                              {t(ts : string) : string, dropText: string , list : IDropSchema[], onSelected(value : any) : any , bFlag?: boolean,bIsEmpty?(bool : boolean),empty? : boolean}){

    const [clicked, setClicked] = useState(false);

    const [selectedDrop , setDrop] = useState(dropText);
    useEffect(() => {
        if (empty){
            bIsEmpty(empty);
        }
    },[])
    return(
        <div

            onMouseEnter={() => {
                if (list.length >= 1)
                    setClicked(true);
            }}
            onMouseLeave={() => {
                setClicked(false);
            }}

            className={`dropdown  ${clicked ? 'is-active' : ''}`}>
            <div className={'dropdown-trigger'}>
                <button
                    onClick={() => {
                        if (list.length >= 1)
                            setClicked(true);
                    }}
                    onTouchCancel={() => setClicked(false)}
                    onTouchEnd={() => setClicked(false)}
                    className={'button'} aria-haspopup={true} aria-controls={'dropdown-menu'} >
                    <span>{t(selectedDrop)}</span>
                    <span className={'icon is-small'}>
                    <AIcon icon={'angle-down'}/>
                </span>
                </button>
            </div>
            <div className={'dropdown-menu'} id={'dropdown-menu'} role={'menu'}>
                <div className={'dropdown-content'}>
                    {Array.isArray(list) &&
                    list.map((l,i) => {
                        return(
                            <a
                                key={`${nanoid()}-${i}`}
                                href={'#'}
                                onClick={() =>{
                                    //@ts-ignore
                                    setDrop(l.display);
                                    //@ts-ignore
                                    onSelected(l.value);
                                    setClicked(false);
                                }}
                                className={'dropdown-item'}
                            >
                                {
                                    bFlag && <span>
                                        <AFlag locale={// @ts-ignore
                                            l.value}/>
                                    </span>
                                }
                                {t(      //@ts-ignore
                                    l.display)}
                            </a>
                        )
                    })
                    }
                </div>

            </div>
        </div>
    )
}