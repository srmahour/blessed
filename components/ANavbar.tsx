import {ADesktopOnly} from "./AHiders";
import Link from 'next/link';
import {useEffect, useState} from "react";
import Router from 'next/router';
import AButton from "./elements/AButton";
import {AIcon} from "./elements/AIcon";
import router from "next/router";
import {ABR} from "./elements/ABR";



const LOCALES = [
    { value: "af", display: "Afrikaans" },
    { value: "ar", display: "Arabic", hide:true},
    { value: "bg", display: "Bulgarian" },
    { value: "zh", display: "Chinese" , hide:true},
    { value: "cs", display: "Czech" },
    { value: "da", display: "Danish" },
    { value: "nl", display: "Dutch" },
    { value: "en", display: "English" },
    { value: "et", display: "Estonian" },
    { value: "tl", display: "Filipino (Tagalog)", hide:true },
    { value: "fi", display: "Finnish" },
    { value: "fr", display: "French" },
    { value: "de", display: "German" },
    { value: "el", display: "Greek" },
    { value: "hu", display: "Hungarian" },
    { value: "id", display: "Indonesian", hide:true},
    { value: "it", display: "Italian" },
    { value: "ja", display: "Japanese" },
    { value: "ko", display: "Korean" , hide:true},
    { value: "lv", display: "Latvian" },
    { value: "lt", display: "Lithuanian" },
    { value: "no", display: "Norwegian" , hide:false},
    { value: "pl", display: "Polish" },
    { value: "pt", display: "Portuguese" },
    { value: "ro", display: "Romanian" },
    { value: "ru", display: "Russian" },
    { value: "sk", display: "Slovak" },
    { value: "sl", display: "Slovenian" },
    { value: "es", display: "Spanish" },
    { value: "sv", display: "Swedish" },
    { value: "th", display: "Thai", hide:true},
    { value: "vi", display: "Vietnamese", hide:true}
];

export default function ANavbar({t,bIsAuth,OnLogOut,locale} : {t(InTS) : string , bIsAuth : boolean,OnLogOut(bool : boolean) : void,locale?:string}){

    const [isHam,setHam] = useState(false);
    const [isUPanel,setUPanel] = useState(false);
    const [isLocPanel,setLocPanel] = useState(false);
    const [isDocsPanel,setDocsPanel] = useState(false);
    const [isDisableQuestions,setDisableQuestions] = useState(true);
    const [isDisableHealth,setDisableHealth] = useState(false);
    const [dpi,setDPI] = useState(1);
    const [width, setWidth] = useState(1080);

    useEffect(() => {
        if (window){
            setDPI(window.devicePixelRatio);
            setWidth(window.innerWidth);
        }
    },[]);


    return(
        <div>
            <nav className={'navbar is-primary is-fixed-top'}
                 role={'navigation'}
                 style={dpi > 1 ? {flexWrap:'wrap',minHeight:'90px'} : {flexWrap:'wrap',minHeight:'90px'} }
                 aria-label={'main navigation'}
            >
                <div
                    style={{justifyContent:'space-between',width:dpi > 1 ? '100%' : ''}}
                    className={'navbar-brand'}>
                    <Link passHref locale={locale} href={'/'}>
                        <a
                            className={'navbar-item'}

                        >

                            <img
                                style={
                                    width <= 490 ? {paddingTop:'5px',
                                            maxWidth:'70px',
                                            maxHeight:'71px',
                                            width:'auto',
                                            height:'auto'} :
                                    dpi > 1 ? {paddingTop:'5px',
                                    maxWidth:'70px',
                                    maxHeight:'71px',
                                    width:'auto',
                                    height:'auto'
                                } : {paddingTop:'5px',
                                    maxWidth:'70px',
                                    maxHeight:'71px',
                                    width:'auto',
                                    height:'auto'
                                }}
                                src={dpi > 1 ? '/imgs/BFS_Logo_V2.png' : '/imgs/BFS_MINI_V2.png'}
                            />&nbsp;
                            <span style={dpi > 1 ?{fontWeight:'bolder',fontSize:'26px'} : {fontWeight:'bolder',fontSize:'20px'}}>
                            Blessed for Service
                            </span>
                        </a>
                    </Link>
                    <a onClick={() => setHam(!isHam)}
                       role={'button'}
                       className={`navbar-burger ${isHam ? 'is-active' : ''}`} aria-label={'menu'} aria-expanded={isHam}>
                        <span aria-hidden={true}></span>
                        <span aria-hidden={true}></span>
                        <span aria-hidden={true}></span>
                    </a>
                </div>
                <div

                    className={`navbar-menu ${isHam ? 'is-active' : ''} is-flex-wrap-wrap`}>
                    <div className={'navbar-start'}>
                        <Link passHref locale={locale} href={'/about'}>
                            <a className={'navbar-item'}>
                                <span>
                                    <AIcon icon={'user-ninja'}/>
                                    &nbsp;
                                    {t('common:links.about')}
                                </span>

                            </a>
                        </Link>
                        <Link passHref locale={locale} href={'/schedule'}>
                            <a className={'navbar-item'}>
                                <span>
                                    <AIcon icon={'calendar-alt'}/>
                                    &nbsp;
                                </span>
                                {t('common:links.gene-schedule')}
                            </a>
                        </Link>
                        <Link passHref locale={locale}
                            href={'/interviews'}
                        >
                            <a className={'navbar-item'}>
                                <span>
                                    <AIcon icon={'microphone-stand'}/>
                                 &nbsp;
                                </span>
                                {t('common:links.past-interviews')}
                            </a>
                        </Link>
                        <div  className={`navbar-item has-dropdown ${isDocsPanel ? 'is-active' : ''} is-hoverable`}>
                            <a onClick={() => setDocsPanel(!isDocsPanel)}
                               className={'navbar-link'}>
                                <span>
                                    <AIcon icon={'books'}/>
                                    &nbsp;
                                    {t('common:links.docs-protocols')}
                                </span>

                            </a>
                            <div
                                style={{backgroundColor:'#071f60'}}
                                className={`navbar-dropdown ${isDocsPanel ? 'is-active' : ''}`}>
                                <Link passHref locale={locale} href={'/documents'}>
                                    <a style={{color:'#fff'}}
                                        className={'navbar-item'}>
                                <span>
                                    <AIcon icon={'file-exclamation'}/>
                                    &nbsp;
                                </span>
                                        {t('common:links.documents')}
                                    </a>
                                </Link>
                                {
                                    isDisableHealth === false &&
                                    <Link passHref locale={locale} href={'/health-protocols'}>
                                        <a style={{color:'#fff'}}
                                           className={'navbar-item'}>
                                <span>
                                    <AIcon icon={'books-medical'}/>
                                    &nbsp;
                                </span>
                                            {t('common:links.health-protocols')}
                                        </a>
                                    </Link>
                                }

                            </div>
                        </div>

                        {
                            isDisableQuestions !== true &&
                            <Link passHref locale={locale} href={'/ask'}>
                                <a className={'navbar-item'}>
                                     <span>
                                    <AIcon icon={'question-square'}/>
                                         &nbsp;
                                    </span>
                                    {t('common:links.ask')}
                                </a>
                            </Link>
                        }

                        <Link passHref locale={locale}
                            href={'/donate'}
                        >
                            <a className={'navbar-item'}>
                                <span>
                                    <AIcon icon={'donate'}/>
                                    &nbsp;
                                </span>
                                {t('common:links.donate')}
                            </a>
                        </Link>

                        {
                            bIsAuth &&
                            <div  className={`navbar-item has-dropdown is-hoverable ${isUPanel ? 'is-active' : ''}`}>
                                <a onClick={() => setUPanel(!isUPanel)} className={'navbar-link'}>
                                    <span>
                                    <AIcon icon={'users-cog'}/>
                                        &nbsp;
                                        {t('common:links.user-panel')}
                                </span>

                                </a>
                                <div   style={{backgroundColor:'#071f60'}}
                                    className={`navbar-dropdown ${isUPanel ? 'is-active' : ''}`}>
                                    <Link  locale={locale} as={'/auth/my-account'} passHref href={'/auth/my-account'}>

                                        <a style={{color:'#fff'}} className={'navbar-item'}>
                                              <span>
                                            <AIcon icon={'sliders-h-square'}/>
                                                  &nbsp;
                                        </span>
                                            {t('common:links.options')}</a>
                                    </Link>
                                    {
                                        isDisableQuestions !== true &&
                                        <Link passHref locale={locale}
                                              href={'/auth/my-questions'}>
                                            <a style={{color:'#fff'}} className={'navbar-item'}>
                                                 <span>
                                    <AIcon icon={'book-user'}/>
                                                     &nbsp;
                                             </span>
                                                {t('common:links.questions')}</a>
                                        </Link>
                                    }

                                    <hr className={'navbar-divider'}/>
                                    <a style={{color:'#fff'}}
                                       onClick={() =>{
                                           router.push('/');
                                            OnLogOut(true);

                                       }}
                                        className={'navbar-item'}>
                                          <span>
                                            <AIcon icon={'sign-out'}/>
                                              &nbsp;
                                        </span>
                                        {t('common:links.logout')}
                                    </a>

                                </div>
                            </div>
                        }

                        <div  className={`navbar-item has-dropdown ${isLocPanel ? 'is-active' : ''} is-hoverable`}>
                            <a onClick={() => setLocPanel(!isLocPanel)}
                                className={'navbar-link'}>
                                <span>
                                    <AIcon icon={'language'}/>
                                    &nbsp;
                                    {t('common:links.translations')}
                                </span>

                            </a>
                            <div
                                style={{backgroundColor:'#071f60'}}
                                className={`navbar-dropdown ${isLocPanel ? 'is-active' : ''}`}>
                                {
                                    LOCALES.filter(l => l.hide !== true).map((l,i) => {
                                        return(
                                            <li className={'navbar-item'}
                                                onClick={() => {
                                                    Router.push(`/${l.value}`);
                                                }}
                                                key={i}>
                                                <a style={{color:'#fff'}}>

                                                    {t(l.display)}
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={'navbar-item'}>
                            <div className={'buttons'}>



                                {
                                    !bIsAuth && <section>
                                        <Link passHref locale={locale}

                                              href={'/auth/sign-up'}
                                        >
                                            <a
                                                className={'button is-secondary'}>
                                                <strong>
                                                             <span>
                                                            <AIcon icon={'user-plus'}/>
                                                        </span>
                                                    &nbsp;
                                                    {t('common:links.signup')}
                                                </strong>

                                            </a>
                                        </Link>
                                        <Link passHref locale={locale}
                                              href={'/auth/login'}
                                        >
                                            <a className={'button is-light'}>
                                                        <span>
                                                            <AIcon icon={'sign-in-alt'}/>
                                                        </span>
                                                &nbsp;
                                                {t('common:links.login')}
                                            </a>
                                        </Link>
                                    </section>
                                }

                            </div>
                        </div>


                    </div>
                </div>
            </nav>


        </div>
    )
}