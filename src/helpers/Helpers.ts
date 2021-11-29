import { STATUS_CODE } from '../constants/status-code'
import { ResponseStatus } from '../global-interfaces/response-status.interface'


/**
 * responseOk() - generate an ok response with contents
 * @param message - the message to be returned
 * @param content - the data to be returned
 * @param withLimit - specify whether or not to include limit key
 * @param withTotal - specify whether or not to include total key
 */

export const responseOk = (message: string, content?: Object | string | []): ResponseStatus => {
    
    let totalCount = 0;

    return { 
        success: true,
        statusCode: STATUS_CODE.OK,
        totalRecords: content.constructor === Array ? content.length : 1,  
        message: message,
        content: content
    }
}

export const responseCreatedUpdated = (message: string, content?: Object | string | [], isUpdated?: boolean ): ResponseStatus => {
    return { 
        success: true,
        statusCode: isUpdated ? STATUS_CODE.OK : STATUS_CODE.CREATED,
        message: message,
        content: content
    }
}

export const responseNotFound = (message: string): ResponseStatus => {
    return { 
        success: false,
        statusCode: STATUS_CODE.NOT_FOUND,
        message: message,
    }
}

export const responseBadRequest = (message: string): ResponseStatus => {
    return { 
        success: false,
        statusCode: STATUS_CODE.BAD_REQUEST,
        message: message,
    }
}