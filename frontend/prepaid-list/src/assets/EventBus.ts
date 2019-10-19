import Vue from 'vue';
export const EventBus = new Vue();

export const enum EventBusMessage {LOADING = 'loading', MESSAGE = 'message'}

export enum TypeColor {SUCCESS = 'success', INFO= 'info', WARNING= 'warning', ERROR= 'error'}


export interface SnackbarOptions {
    duration: number | undefined;
    message: string;
    snackbarType: TypeColor;
}
