import Router from 'next/router';
import Cookie from 'js-cookie';


export const FlushAuth = (props : object) => {
    // @ts-ignore
    props.setAuth(false);
    // @ts-ignore
    props.setUsr({});
    Cookie.remove('token');
    Cookie.remove('lastUpdate');
    Router.push('/');
}

