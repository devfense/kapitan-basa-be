export interface ResponseStatus {
   success: boolean,
   statusCode?: number,
   message: string,
   totalRecordsFound?: number,
   content?: string | Object | []
   paginationData?: PaginationData

}

export interface PaginationData {
   overallTotal: number,
   page: number,
   limit: number,
}