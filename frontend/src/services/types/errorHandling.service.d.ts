import { ErrorType, ErrorMessage } from '@/services/entities/ErrorMessage';

export interface IErrorHandlingService {
    translateError(errorCode: string, locale: string): ErrorMessage;
}
