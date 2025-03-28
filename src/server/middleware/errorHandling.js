import {logger } from '../utils/logger.js'

export const ErrorHandlingMiddleware = (error, request, responce, next ) => {
    const {message , stack, statusCode = 500} = error;
    const {method, originalUrl,headers,query,body,params }= request;
    const date =new Date().toISOString();


    const context ={
        date,
        error,
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
    logger.error(`ERROR ${statusCode}: ${message} ${originalUrl}`, context);
    const responceObject={message, error}
    if (process.env.NODE_ENV !=='production'){
        responceObject.stack = stack;
    }
    responce.status(statusCode).json(responceObject);
}