import { STATUS_CODE } from '../constants/status-code'
import { ResponseStatus, PaginationData } from '../global-interfaces/response-status.interface'


/**
 * responseOk() - generate an ok response with contents
 * @param message - the message to be returned
 * @param content - the data to be returned
 * @param withLimit - specify whether or not to include limit key
 * @param withTotal - specify whether or not to include total key
 */

export const responseOk = (message: string, content?: Object | string | [], paginationData?: PaginationData): ResponseStatus => {
    
    let totalCount = 0;

    return { 
        success: true,
        statusCode: STATUS_CODE.OK,
        totalRecordsFound: content.constructor === Array ? content.length : 1, 
        paginationData: paginationData, 
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

export const responseForbidden = (message: string): ResponseStatus => {
    return { 
        success: false,
        statusCode: STATUS_CODE.FORBIDDEN,
        message: message,
    }
}

export const responseServerError = (message: string): ResponseStatus => {
    return { 
        success: false,
        statusCode: STATUS_CODE.SERVER_ERROR,
        message: message,
    }
}

export const removePasswordField = (data: any) => {

    let usersData = data

    if(usersData && usersData.constructor === Array){
        usersData = usersData.map((record) => {
                
            //remove password
            delete record.password
            delete record.passwordSalt

            return record
        })

        return usersData

    } else if (usersData && usersData.id){

        //remove password
        delete usersData.password
        delete usersData.passwordSalt
        return usersData

    } else {
        console.log('Helpers: removePasswordField() - Invalid parameters passed')
        return "ERROR PASSWORD FILTERING"
    }

}

export const removeObjectKey = (removeList: Array<string>, dataObj: Object, subObj?: string) => {

    try {
        let KEY_NOT_FOUND_COUNT = 0
        let EXISTING_OBJ_KEYS = []

        dataObj = subObj ? dataObj[subObj] : dataObj

        //EXTRACT ALL AVAILABLE KEYS
        Object.keys(dataObj).map((key) => {
            EXISTING_OBJ_KEYS = [...EXISTING_OBJ_KEYS, key]
        })

        //COUNT ALL NOT EXISTING KEYS ON THE OBJECT FOR CHECKING
        removeList.forEach((keyToRemove) => {
            KEY_NOT_FOUND_COUNT = !EXISTING_OBJ_KEYS.includes(keyToRemove) ? ++KEY_NOT_FOUND_COUNT : KEY_NOT_FOUND_COUNT
        })

        if(KEY_NOT_FOUND_COUNT == 0){

            let FINAL_OBJ = dataObj

            //REMOVE THE KEYS
            removeList.forEach((keyToRemove) => {
                delete FINAL_OBJ[keyToRemove]
            })

            return FINAL_OBJ

        } else {
            console.log('Helpers: removeObjectKey() - You are trying to remove a non existing object key')
            return { messageError: "Helpers: removeObjectKey() - You are trying to remove a non existing object key", serverError: true }    
        }

        
    } catch (error) {
        console.log('Helpers: removeObjectKey() - A problem was encountered')
        console.log(error)
        return { messageError: "Helpers: removeObjectKey() - error removing key value", serverError: true }
    }
    

    

}

export const pagination = (limit: string, page: string) => {
    return parseInt(limit) !== 0 ? parseInt(limit) !== 1 ? parseInt(page) !== 0 ? parseInt(page) === 1 ? 0
    : (parseInt(limit) * parseInt(page) - (parseInt(limit) - 1)) - 1 
    : parseInt(limit) + 1 
    : parseInt(page) !== 0 ? parseInt(page) - 1 : parseInt(limit) + 1 
    : 0

    
}