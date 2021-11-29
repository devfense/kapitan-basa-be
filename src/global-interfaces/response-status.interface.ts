export interface ResponseStatus {
   success: boolean,
   statusCode?: number,
   message: string,
   totalRecords?: number,
   content?: string | Object | []

}