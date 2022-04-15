// useQuery.js
import { useRouter } from 'next/router';
import moment from 'moment';

// Resolves query or returns null
export default function useQuery() {
    const router = useRouter();
    const hasQueryParams =
        /\[.+\]/.test(router.route) || /\?./.test(router.asPath);
    const ready = !hasQueryParams || Object.keys(router.query).length > 0;
    if (!ready) return null;
    return router.query;
};

export const URL_C = (url : string) => {
    if(typeof url !== 'string')
        return '';
    let str = url.split(' ');
    let _s = '';
    str.map((s,i) =>{
        _s += s.replace(/[!@#$%^&*(),.?":{}|<>]/g,'');

        if(i !== str.length -1)
            _s+= '-';
    });
    return _s;
};

export const GET_LOCALE_DATE = (date : Date) => {
    const utc = moment.utc(date);
    const local = moment(utc).local();
    return local.format("YYYY-MM-DD HH:mm:ss");
}


const EMPTY_TAGS = /<p>\s*<\/p>/gm;

export const  isEmpty = (value : string) =>
{
    return EMPTY_TAGS.test(value) ||
        value === '<p>&nbsp;</p>' ||
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim().length === 0);
}





export const capIt = (string : string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const IS_DEV = process.env.NODE_ENV;

const IS_EMAIL = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export const ValidEmail = ( email : string) => {
    if (!email) return false;

    const emailParts = email.split('@');

    if(emailParts.length !== 2) return false;

    const account = emailParts[0];
    const address = emailParts[1];

    if(account.length > 64) return false;

    else if(address.length > 255) return false;

    const domainParts = address.split('.');
    if (domainParts.some(function (part) {
        return part.length > 63;
    })) return false;


    if (!IS_EMAIL.test(email)) return false;

    return true;
}

export const isValidURLSafe = (s : string) => {

}

export const truncate_string = (s : string, n : number) => {
    return (s.length > n) ? s.substr(0, n-1) + '&hellip;' : s;
}