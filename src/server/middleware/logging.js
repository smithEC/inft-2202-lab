import {logger} from '../utils/logger.js'

export const LoggingMiddleware = (request, responce, next)=> {
    logRequest(request, responce);
    responce.on('finish',() =>{
        logRequest(request,responce);
    });
    next();

}

function logRequest(request,responce){
    const {method,originalUrl,body,params,query,headers}=request;
    const {statusCode}=responce;
    const og = responce.json;

    responce.json =async (value)=>{
        const data = await Promise.resolve(value);
        responce.locals.data=data;
        return og.call(responce, data)   
    }

    const date = new Date().toISOString();
    const context ={
        date,
        method,
        url: originalUrl,
        request: {
            body,
            params,
            query,
            headers
        },
        responce: {
            statusCode,
            body: responce.locals.data
        }
    }
    if (responce.headersSent){
        logger.info(`RESPONCE${statusCode}: ${method} ${originalUrl}`, context);
    }
    else{
    logger.info(`REQUEST ${method} ${originalUrl}`, context);
    }
}