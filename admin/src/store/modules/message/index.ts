import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { IMessageState, MessagesQueue } from './message.state';

@Module({ dynamic: true, store, name: 'message' })
export class MessageState extends VuexModule implements IMessageState {
    public messages: MessagesQueue[] = [];

    @Mutation
    private ADD_MESSAGE(message: MessagesQueue): void {
        this.messages.push(message);
    }

    @Mutation
    private REMOVE_LAST_MESSAGE(): void {
        this.messages.pop();
    }

    @Mutation
    private REMOVE_MESSAGE(message: MessagesQueue): void {
        const index = this.messages.indexOf(message);
        this.messages.splice(index, 1);
    }

    @Action
    public addMessage(message: MessagesQueue, timeout?: number): void {
        const delay: number = ((): number => {
            if (timeout) { return timeout; }
            if (process.env.DEFAULT_MESSAGE_TIMEOUT) { return process.env.DEFAULT_MESSAGE_TIMEOUT; }
            return 3000;
        })();
        this.ADD_MESSAGE(message);
        setTimeout(() => {
            this.REMOVE_MESSAGE(message);
        }, delay);
    }
}

export const MessageModule = getModule(MessageState);
