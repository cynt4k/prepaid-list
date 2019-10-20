export interface IMessageState {
    messages: MessagesQueue[];
}

export type MessageQueueType = 'error' | 'warning' | 'info';

export type MessagesQueue = {
    type: MessageQueueType;
    shortText: string;
    text?: string;
};