export interface IMessageState {
    messages: MessagesQueue[];
}

export type MessagesQueue = {
    type: 'error' | 'warning' | 'info'
    shortText: string;
    text: string;
};