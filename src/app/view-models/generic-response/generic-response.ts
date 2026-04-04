export interface GenericResponse {
    data: any;
    statusCode: number;
    errorsKeyValues?: { [key: string]: string[] };
}


export interface GenericTypeResponse<T> {
    data: T;
    statusCode: number;
    errorsKeyValues?: { [key: string]: string[] };
}
