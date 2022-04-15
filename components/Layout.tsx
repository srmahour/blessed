// @ts-nocheck
import Head from "next/head";
import ANavbar from "./ANavbar";
import {FlushAuth} from "../lib/Auth";
import {useRouter} from "next/router";
import Link from 'next/link';
import {ADesktopOnly, AMobileOnly, ATabletOnly} from "./AHiders";
import moment from 'moment';
import {AIcon} from "./elements/AIcon";
import {ABR} from "./elements/ABR";
import {useEffect, useState} from "react";
import ABox from "./elements/ABox";



export default function Layout  ({children,metadata,t,bIsAuth,AuthRedux,locale,isFixed} : {children: React.ReactNode,metadata? : object,t(InTS: string): string,bIsAuth : boolean,AuthRedux : object,locale?:string,isFixed? : boolean}) {
    const router = useRouter();
    const [dpi,setDPI] = useState(1);


    useEffect(() => {
        if (window){
            setDPI(window.devicePixelRatio);

        }
    },[]);


    return(
        <div
             className={'has-navbar-fixed-top'}>
            <Head>
                <title>{metadata ? metadata.title : 'Blessed for Service'}</title>
             <meta name="og:title" content={metadata ? metadata.title : 'Blessed for Service'}/>
                <meta name="title" content={metadata ? metadata.title : 'Blessed for Service'}/>
             <meta name="description" content={metadata ? metadata.description : ''} />
                <meta name="msvalidate.01" content="2EDD91242F14392F308AA0E708F4C966" />
                <meta name="og:description" content={metadata ? metadata.description : ''} />

                {
                    metadata && metadata.keywords && Array.isArray(metadata.keywords) &&
                        <meta name={'keywords'} content={metadata.keywords} />
                }
                <script defer data-domain="blessedforservice.org" src="https://plausible.io/js/plausible.js"></script>

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>

            </Head>

            <ANavbar t={t} locale={router.locale || locale} bIsAuth={bIsAuth} OnLogOut={(bool) => {
                FlushAuth(AuthRedux);
            }} />

            <ADesktopOnly>
                <div
                style={{display:'block'}}
                >
                    <div style={{  display:'inline-flex',
                        width:'100%',
                        border:'solid',
                        borderColor:'#071f60',
                        paddingTop:dpi > 1 ? '280px' : '87px'
                    }}>
                  <span
                      style={{border:'solid',borderColor:'#010613',width:'100%'}}
                  >

                        <span

                            id={'img-cen'}>
                            <img style={{width:'100%',
                                height:'100%'}}
                                 src={'/imgs/BFS_Banner.png'}/>
                      </span>

                  </span>
                    </div>
                </div>

            </ADesktopOnly>

            <main
                style={{paddingBottom:'190px',minHeight:'600px'}}
                className={'main-content'}>
            {children}
            </main>

        <footer
            className={'footer-push'}
            style={{
                backgroundColor:'#daebf7'
            }}
           >
        <div className={'content has-text-centered'}>
            <ABox>
                <ADesktopOnly>
                    <span>
                        <strong style={{color:'purple',fontSize:'17px'}}>
                        {t('common:invocation-heading')}
                        </strong>
                    </span>
                    <p><strong style={{color:'purple'}}>
                        {t('common:invocation')}
                    </strong></p>
                </ADesktopOnly>
                <ATabletOnly>
                       <span>
                        <strong style={{color:'purple',fontSize:'17px'}}>
                        {t('common:invocation-heading')}
                        </strong>
                    </span>
                    <p><strong style={{color:'purple'}}>
                        {t('common:invocation')}
                    </strong></p>
                </ATabletOnly>
                <AMobileOnly>
                       <span>
                        <strong style={{color:'purple',fontSize:'17px'}}>
                        {t('common:invocation-heading')}
                        </strong>
                    </span>
                    <p><strong style={{color:'purple',fontSize:'10px'}}>
                        {t('common:invocation')}
                    </strong></p>
                </AMobileOnly>

            </ABox>

        </div>
        <AMobileOnly>
              <span style={{display:'flex',justifyContent:'center'}}>


                <Link passHref
                      href={{
                          pathname:'/legal-policies/privacy-policy',
                      }}>
                    <a>&nbsp;{t('common:links.privacy-policy')} |&nbsp;</a>
                </Link>
                  <Link passHref
                        href={{
                            pathname:'/legal-policies/disclaimer',
                        }}>
                    <a>&nbsp;{t('common:links.disclaimer')} |&nbsp;</a>
                </Link>
                  <Link passHref
                        href={{
                            pathname:'/legal-policies/fair-use-notice',
                        }}
                  >
                    <a>&nbsp;{t('common:links.fair-use-notice')} |&nbsp;</a>
                </Link>

            </span>
            <span style={{display:'flex',justifyContent:'center'}}>
               <Link passHref href={{
                   pathname:'/legal-policies/contact-us',
               }} >
                    <a>&nbsp;{t('common:links.contact-us')} |&nbsp;</a>
                </Link>

            </span>
            <span style={{display:'flex',justifyContent:'center'}}>
                <span>
                    <a href={'#'} onClick={() =>  window.open('https://t.me/RealGeneDecode')}>
                         <AIcon icon={'telegram'}/>
                    [Real] Gene Decode Telegram
                    </a>


                </span>

                &nbsp;|
                         <span>
                      <a href={'#'} onClick={() =>  window.open('https://rumble.com/c/c-1275533')}>

                      <span style={{}}> <img style={{width:'16px',height:'16px',display:'inline-block',fontSize:'inherit',height:'1em',verticalAlign:'-.170em'}} src={'/imgs/rumble.png'}/></span> Gene Decode

                    </a>
                </span>
            </span>
        </AMobileOnly>
            <ATabletOnly>
                  <span style={{display:'flex',justifyContent:'center'}}>


                <Link passHref
                      href={{
                          pathname:'/legal-policies/privacy-policy',
                      }}>
                    <a>&nbsp;{t('common:links.privacy-policy')} |&nbsp;</a>
                </Link>
                  <Link passHref
                        href={{
                            pathname:'/legal-policies/disclaimer',
                        }}>
                    <a>&nbsp;{t('common:links.disclaimer')} |&nbsp;</a>
                </Link>
                  <Link passHref
                        href={{
                            pathname:'/legal-policies/fair-use-notice',
                        }}
                  >
                    <a>&nbsp;{t('common:links.fair-use-notice')} |&nbsp;</a>
                </Link>
                  <Link passHref href={{
                      pathname:'/legal-policies/contact-us',
                  }} >
                    <a>&nbsp;{t('common:links.contact-us')} |&nbsp;</a>
                </Link>
                <span>
                    <a href={'#'} onClick={() =>  window.open('https://t.me/RealGeneDecode')}>
                         <AIcon icon={'telegram'}/>
                    [Real] Gene Decode Telegram
                    </a>


                </span>
                      &nbsp;|
                         <span>
                      <a href={'#'} onClick={() =>  window.open('https://rumble.com/c/c-1275533')}>

                      <span style={{}}> <img style={{width:'16px',height:'16px',display:'inline-block',fontSize:'inherit',height:'1em',verticalAlign:'-.170em'}} src={'/imgs/rumble.png'}/></span> Gene Decode

                    </a>
                </span>
            </span>
            </ATabletOnly>
            <ADesktopOnly>
                  <span style={{display:'flex',justifyContent:'center'}}>


                <Link passHref
                      href={{
                          pathname:'/legal-policies/privacy-policy',
                      }}>
                    <a>&nbsp;{t('common:links.privacy-policy')} |&nbsp;</a>
                </Link>
                  <Link passHref
                        href={{
                            pathname:'/legal-policies/disclaimer',
                        }}>
                    <a>&nbsp;{t('common:links.disclaimer')} |&nbsp;</a>
                </Link>
                  <Link passHref
                        href={{
                            pathname:'/legal-policies/fair-use-notice',
                        }}
                  >
                    <a>&nbsp;{t('common:links.fair-use-notice')} |&nbsp;</a>
                </Link>
                  <Link passHref href={{
                      pathname:'/legal-policies/contact-us',
                  }} >
                    <a>&nbsp;{t('common:links.contact-us')} |&nbsp;</a>
                </Link>
                <span>
                    <a href={'#'} onClick={() =>  window.open('https://t.me/RealGeneDecode')}>
                         <AIcon icon={'telegram'}/>
                    [Real] Gene Decode Telegram
                    </a>
                </span>
                      &nbsp;|
                         <span>
                      <a href={'#'} onClick={() =>  window.open('https://rumble.com/c/c-1275533')}>

                      <span style={{}}> <img style={{width:'16px',height:'16px',display:'inline-block',fontSize:'inherit',height:'1em',verticalAlign:'-.170em'}} src={'/imgs/rumble.png'}/></span> Gene Decode

                    </a>
                </span>
            </span>
            </ADesktopOnly>

            <br/>
            <span  style={{display:'flex',justifyContent:'center'}}>
                        <p>&#169; {moment().format("YYYY")} Copyright Blessed for Service  </p>
            </span>

        </footer>
        </div>
);
}