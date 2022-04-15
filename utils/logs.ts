import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
    clientToken: 'pub72afb2c9eee9d82a11e0a677a5043107',
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sampleRate: 100,
    applicationId:'BFS'
});

export const LOG_INFO = (log : any) => {
    if (process.browser){
        datadogLogs.logger.info('LOG_INFO',log);
    }
    else{
        console.log(log)
    }

}

export const LOG_ERROR = (err : any) => {
    if (process.browser){
        console.error(err);
        datadogLogs.logger.error('LOG_ERROR',err);
    }
    else
        console.error(err);

}