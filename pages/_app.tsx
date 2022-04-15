import "../styles/styles.scss"
import {appWithTranslation} from 'next-i18next';
import {AppProps} from "next/app";
import {wrapper} from "../store/store";
import {useStore} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import "../utils/font-awesome";
import App from 'next/app';
import {LOG_ERROR, LOG_INFO} from "../utils/logs";

interface IStore {
    __persistor : object
}

// @ts-ignore
function  BFSApp ({Component, pageProps} : AppProps) {
    // @ts-ignore
    const store : IStore = useStore((state) => state);
    return (
        <PersistGate persistor={store.__persistor}
        loading={null}
        >
            <Component {...pageProps} />
        </PersistGate>
    );
}

BFSApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);

    /*
    Props.ctx = { err , req , res , pathname , query , asPath , locale , locales , defaultLocale }
        cookies loc = props.ctx.req.cookies
     */
    LOG_INFO('Auth update / check')
    /*
    console.log('pathname:',appContext.ctx.pathname);
    let auth = false;
    let ignore = false;
    const pathname = appContext.ctx.pathname;
    if (appContext.ctx.res){
        appContext.ctx.res.setHeader('Cache-Control','no-store');
    }
    if (appContext.ctx.req){
        if (appContext.ctx.req.cookies){
            const token = appContext.ctx.req.cookies.token;
            if (token){
                const cookDate = appContext.ctx.req.cookies.lastUpdate;
                const date = new Date(cookDate);
                const lastUpdate = moment(date.toISOString());
                if (lastUpdate !== undefined || lastUpdate !== null){
                    // @ts-ignore
                    LOG_INFO(moment(lastUpdate).diff(new moment(),'minutes'));
                    // @ts-ignore
                    if (appContext.ctx.req.cookies.token){
                        //REDIRECT
                        // @ts-ignore
                        if (moment(lastUpdate).diff(new moment(),'minutes') < -120){
                            LOG_INFO('old')
                            if ((pathname !== '/auth/signup') && (pathname !== '/auth/logon') && (pathname !== '/auth/user')){
                                console.log('wrote');
                                //appContext.ctx.res.writeHead(301,{Location:'/auth/user'});
                               // appContext.ctx.res.end();

                            }

                        }
                    }

                }
            }

        }
    }
    */



    return{
        ...appProps
    }
}

export default wrapper.withRedux(appWithTranslation(BFSApp));