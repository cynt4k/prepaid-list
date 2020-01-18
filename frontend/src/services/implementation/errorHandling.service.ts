import { IErrorHandlingService } from '@/services/types/errorHandling.service';
import { ErrorMessage, ErrorType } from '@/services/entities/ErrorMessage';

export class ErrorHandlingService implements IErrorHandlingService {
  public translateError(errorCode: string, locale: string): ErrorMessage {
    // TODO: do it more beautiful
    switch (errorCode) {
      case 'E_LOW_BALANCE':
        return { type: ErrorType.WARN, message: 'Nicht genügend Guthaben' };
      case 'W_USER_NOT_ALLOWED':
        return { type: ErrorType.WARN, message: 'Fehlende Berechtigung' };
      default:
        return { type: ErrorType.ERROR, message: 'Es ist ein Fehler aufgetreten.' };
    }
  }
}
