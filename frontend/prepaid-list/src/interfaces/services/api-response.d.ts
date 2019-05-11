export interface IApiResponse<T> {
    status: string;
    code: number;
    message: string;
    data?: T
}