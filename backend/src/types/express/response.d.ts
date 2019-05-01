export interface IResponse<T> {
    status: string;
    code: number;
    message: string;
    data: T;
}
