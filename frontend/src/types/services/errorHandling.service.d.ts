import { ErrorType, ErrorMessage } from '@/interfaces/ErrorMessage';

export interface IErrorHandlingService {
    translateError(errorCode: string, locale: string): ErrorMessage;
}
