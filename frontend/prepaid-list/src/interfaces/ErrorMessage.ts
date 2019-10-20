export enum ErrorType {
    ERROR, WARN, INFO
}

export interface ErrorMessage {
    message: string;
    type: ErrorType;
}
