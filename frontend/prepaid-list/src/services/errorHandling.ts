import { injectable } from 'inversify';
import { IErrorHandlingService } from '@/types/services/errorHandling.service';
import {TypeColor} from '@/assets/EventBus';
import { ErrorMessage, ErrorType } from '@/interfaces/ErrorMessage';

@injectable()
export class ErrorHandlingService implements IErrorHandlingService {
    public translateError(errorCode: string, locale: string): ErrorMessage {
        // TODO: do it more beautiful
        switch (errorCode) {
            case 'E_LOW_BALANCE':
                return { type: ErrorType.WARN, message: 'Nicht genügend Guthaben'};
            default:
                return { type: ErrorType.ERROR, message: 'Es ist ein Fehler aufgetreten.' };
        }
    }
}
