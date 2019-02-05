import { ErrorCode } from '../types/error';

export class PrepaidListError extends Error {
    constructor(message?: string, code?: ErrorCode) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
