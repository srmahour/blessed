const {i18n} = require('./next-i18next.config');
const withTM = require('next-transpile-modules')(['@fullcalendar']);
const {nanoid} = require('nanoid');


module.exports = {
    i18n,
    exportPathMap: async function(defaultPathMap, {dev , dir , outDir, distDir , buildId}){
        return {
            '/' : {page: '/'},
            '/auth/user' : {page:'/auth/user'},
            '/auth/schedule' : {page: '/auth/schedule'}

        }
    },
    redirect: async function(){
        return[
            {
                source:'/auth/question/:id',
                destination:'/auth/question/:id',
                permanent: true
            },

        ]
    },
    withTM,
    generateEtags : false,
    headers: async () => {
        const date = new Date();
        return [
            {
                source:'/documents',
                headers:[
                    {
                        key:'Cache-Control',
                        value:'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
                    },
                    {
                        key:'Last-Modified',
                        value:`${date.toUTCString()}`
                    }
                ]
            },
            {
                source:'/health-protocols',
                headers:[
                    {
                        key:'Cache-Control',
                        value:'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
                    },
                    {
                        key:'Last-Modified',
                        value:`${date.toUTCString()}`
                    }
                ]
            },
            {
                source:'/schedule',
                headers:[
                    {
                        key:'Cache-Control',
                        value:'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
                    },
                    {
                        key:'Last-Modified',
                        value:`${date.toUTCString()}`
                    }
                ]
            },
        ]
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Important: return the modified config

        return config;
    },
    generateBuildId : async () => {


        return `BFS-Client-${nanoid()}`;

    }

};