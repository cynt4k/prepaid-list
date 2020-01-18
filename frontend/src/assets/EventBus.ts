import Vue from 'vue';
import { ErrorMessage, ErrorType } from '@/services/entities/ErrorMessage';

export const EventBus = new Vue();

export const enum EventBusMessage {LOADING = 'loading', MESSAGE = 'message'}

export enum TypeColor {SUCCESS = 'success', INFO= 'info', WARN= 'warning', ERROR= 'error'}

export class TypeColorConverter {
  public static convertFromErrorMessage(e: ErrorMessage): TypeColor {
    switch (e.type) {
      case ErrorType.ERROR: return TypeColor.ERROR;
      case ErrorType.INFO: return TypeColor.INFO;
      case ErrorType.WARN: return TypeColor.WARN;
      default: return TypeColor.ERROR;
    }
  }
}

export interface SnackbarOptions {
    duration?: number | undefined;
    message: string;
    snackbarType: TypeColor;
}
