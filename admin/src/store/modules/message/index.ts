import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { IResponse } from '@/types/service';
import { IMessageState, MessagesQueue, MessageQueueType } from './message.state';
import i18n from '@/i18n';

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
            if (process.env.DEFAULT_MESSAGE_TIMEOUT) { return Number(process.env.DEFAULT_MESSAGE_TIMEOUT); }
            return 3000;
        })();
        this.ADD_MESSAGE(message);
        setTimeout(() => {
            this.REMOVE_MESSAGE(message);
        }, delay);
    }

    @Action
    public addApiMessage(api: IResponse<any>): void {
        function getTypeOfApiMessage(errorCode: number): MessageQueueType {
            if (api.message.startsWith('E_')) {
                return 'error';
            }
            if (api.message.startsWith('W_')) {
                return 'warning';
            }
            if (api.message.startsWith('I_')) {
                return 'info';
            }
            if (errorCode >= 400) {
                return 'error';
            }
            return 'info';
        }

        const message: MessagesQueue = {
            type: getTypeOfApiMessage(api.code),
            shortText: i18n.t('api.UNKNOWN').toString()
        };

        const localeString = `api.${message.type}.${api.message}`;
        if (i18n.te(localeString)) {
            message.shortText = i18n.t(`api.${message.type}.${api.message}`).toString();
        }
        this.addMessage(message);
    }
}

export const MessageModule = getModule(MessageState);
