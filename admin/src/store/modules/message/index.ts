import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { IResponse } from '@/types/service';
import { IMessageState, MessagesQueue, MessageQueueType } from './message.state';
import i18n from '@/i18n';
import { AxiosError } from 'axios';

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
    public addApiMessage(api: AxiosError<IResponse<any>>): void {
        const response = api.response;

        const message: MessagesQueue = {
            type: 'error',
            shortText: i18n.t('api.UNKNOWN').toString()
        };

        if (!response) {
            if (api.request) {
                message.type = 'error';
                message.shortText = i18n.t(`api.NETWORK_ERROR`).toString();
            }
        } else {
            function getTypeOfApiMessage(errorCode: number, msg: string): MessageQueueType {
                if (msg.startsWith('E_')) {
                    return 'error';
                }
                if (msg.startsWith('W_')) {
                    return 'warning';
                }
                if (msg.startsWith('I_')) {
                    return 'info';
                }
                if (errorCode >= 400) {
                    return 'error';
                }
                return 'info';
            }

            message.type = getTypeOfApiMessage(response.data.code, response.data.message);

            const localeString = `api.${message.type}.${response.data.message}`;
            if (i18n.te(localeString)) {
                message.shortText = i18n.t(localeString).toString();
            }
        }

        this.addMessage(message);
    }
}

export const MessageModule = getModule(MessageState);
