import {nanoid} from "nanoid";
import {AIcon} from "../elements/AIcon";
import {useEffect, useState} from "react";
import {ADesktopOnly, AMobileOnly, ATabletOnly} from "../AHiders";

export interface ITabArray {
    icon: string
    ts : string
}

export const ATAbs = ({t, opts,tabs,onTabSel,tab} : {t(ts : string) : string, opts? : string, tabs : [ITabArray],onTabSel(tab : number) : void, tab? : number}) => {

    const [tabIndex , setTabIndex] = useState(0);
    useEffect(() => {
        if (tab){
            setTabIndex(tab);
        }
    },[]);
    return(
        <section>
            <AMobileOnly>
                <div className={`tabs is-small ${opts !== undefined ? opts : ''}`}>
                    <ul>
                        {Array.isArray(tabs)
                        && tabs.map((ta,i) => {
                            return(
                                <li
                                    className={`${tabIndex === i ? 'is-active' : ''}`}
                                    key={`${nanoid()}-${i}`}>
                                    <a
                                        onClick={() => {
                                            setTabIndex(i);
                                            onTabSel(i);
                                        }}
                                    >
                            <span
                                className={'icon is-small'}
                            >
                                <AIcon icon={ta.icon}/>
                            </span>
                                        <span>
                                {t(ta.ts)}
                            </span>
                                    </a>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </AMobileOnly>
            <ATabletOnly>
                <div className={`tabs ${opts !== undefined ? opts : ''}`}>
                    <ul>
                        {Array.isArray(tabs)
                        && tabs.map((ta,i) => {
                            return(
                                <li
                                    className={`${tabIndex === i ? 'is-active' : ''}`}
                                    key={`${nanoid()}-${i}`}>
                                    <a
                                        onClick={() => {
                                            setTabIndex(i);
                                            onTabSel(i);
                                        }}
                                    >
                            <span
                                className={'icon is-small'}
                            >
                                <AIcon icon={ta.icon}/>
                            </span>
                                        <span>
                                {t(ta.ts)}
                            </span>
                                    </a>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </ATabletOnly>
           <ADesktopOnly>
               <div className={`tabs ${opts !== undefined ? opts : ''}`}>
                   <ul>
                       {Array.isArray(tabs)
                       && tabs.map((ta,i) => {
                           return(
                               <li
                                   className={`${tabIndex === i ? 'is-active' : ''}`}
                                   key={`${nanoid()}-${i}`}>
                                   <a
                                       onClick={() => {
                                           setTabIndex(i);
                                           onTabSel(i);
                                       }}
                                   >
                            <span
                                className={'icon is-small'}
                            >
                                <AIcon icon={ta.icon}/>
                            </span>
                                       <span>
                                {t(ta.ts)}
                            </span>
                                   </a>
                               </li>
                           )
                       })
                       }
                   </ul>
               </div>
           </ADesktopOnly>
        </section>

    )
}