import { ActionTree } from 'vuex';
import { UserState } from './user-state-types';
import { User } from '@/interfaces/User';
import { UserMutationTypes } from './user-mutations';
import {
    ShoppingCartMutationTypes,
    ShoppingCartActionTypes,
} from '../shoppingcart-state/shoppingcart-state';
import { StateNamespaces } from '../namespaces';
import { namespace } from 'vuex-class';
import { IJwtService, IApiService, IUserService } from '@/types';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { container } from '@/inversify.config';
import {
    IResponseToken,
    IUserModel,
    IUserRegister,
} from '@/interfaces/services';

// export type ChangeUserAction = (payload: User | undefined) => void;
export type ResetUserAction = () => void;
export type UpdateBalanceAction = (payload: number) => void;
export type RefreshTokenAction = () => void;
export type LoginUserAction = (payload: User | undefined) => void;
export type RegisterUserAction = (payload: IUserRegister) => void;
export type SaveTokenAction = (payload: IResponseToken) => void;

export enum UserActionTypes {
    LOGIN_USER = 'loginUserAction',
    REGISTER_USER = 'registerUserAction',
    RESET_STATE = 'resetStateAction',
    UPDATE_BALANCE = 'updateBalanceAction',
    REFRESH_TOKEN = 'refreshTokenAction',
    SAVE_TOKEN = 'saveTokenAction',
    // INVALIDATE_TOKEN = 'invalidateTokenAction'
}

const shoppingCartModule = StateNamespaces.SHOPPING_CART_STATE;
const jwtService = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
const apiService = container.get<IApiService>(SERVICE_IDENTIFIER.API);
const userService = container.get<IUserService>(
    SERVICE_IDENTIFIER.USER_SERVICE
);

export const userActions: ActionTree<UserState, any> = {
    async [UserActionTypes.REGISTER_USER](context, payload: IUserRegister) {
        // TODO : REGISTER
        const data: IResponseToken = await userService
            .registerUser(payload)
            .toPromise();

        // TODO : Pruefen ob einfach die Login-Action aufgerufen werden kann - selbe Daten
        context.dispatch(UserActionTypes.SAVE_TOKEN, data);
        context.commit(UserMutationTypes.LOGIN_USER, {
            name: payload.name.firstname,
            credit: 0.0,
            nickname: payload.username,
        });
    },
    async [UserActionTypes.LOGIN_USER](context, user: User) {
        // TODO : REGISTER UND LOGIN als eigene User-Action zusammenlegen
        const data: IResponseToken = await userService
            .loginUserByUsername(user.nickname)
            .toPromise();
        context.dispatch(UserActionTypes.SAVE_TOKEN, data);
        const infos: IUserModel = await userService.getUserInfos().toPromise();
        context.commit(UserMutationTypes.LOGIN_USER, {
            name: infos.username,
            credit: infos.balance,
            nickname: infos.username,
        });
    },
    [UserActionTypes.UPDATE_BALANCE](context, payload: number) {
        context.commit(UserMutationTypes.UPDATE_BALANCE, payload);
    },
    [UserActionTypes.RESET_STATE](context) {
        jwtService.destroyToken();
        jwtService.destroyRefreshToken();

        context.commit(UserMutationTypes.RESET_STATE);
        context.commit(UserMutationTypes.INVALIDATE_TOKEN);
        context.dispatch(
            shoppingCartModule + '/' + ShoppingCartActionTypes.RESET_STATE,
            {},
            { root: true }
        );
    },
    async [UserActionTypes.REFRESH_TOKEN](context) {
        const newToken = await apiService
            .post<IResponseToken>(`auth/refresh`, {
                refreshToken: jwtService.getRefreshToken(),
            })
            .toPromise();

        // save token in local storage
        jwtService.saveToken(newToken.data.token);
        context.commit(UserMutationTypes.REFRESH_TOKEN, newToken.data.token);
    },
    [UserActionTypes.SAVE_TOKEN](context, payload: IResponseToken) {
        jwtService.saveToken(payload.token);
        jwtService.saveRefreshToken(payload.refreshToken);

        context.commit(UserMutationTypes.REFRESH_TOKEN, payload.refreshToken);
    },
    // [UserActionTypes.INVALIDATE_TOKEN](context) {
    // 	// invalidate user and token
    // 	context.commit(UserActionTypes.RESET_STATE);
    // }
};
