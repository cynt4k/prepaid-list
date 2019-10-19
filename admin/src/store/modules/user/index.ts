import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { IUserState } from './user.state';
import { UserService } from '@/services/user.service';

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public token = '';
    public refreshToken = '';
    public loggedIn = false;
    public nickname = '';
    public rights = [];


    @Mutation
    private SET_TOKEN(token: string): void {
        this.token = token;
    }

    @Mutation
    private SET_REFRESH_TOKEN(refreshToken: string): void {
        this.refreshToken = refreshToken;
    }

    @Mutation
    private SET_NICKNAME(nickname: string): void {
        this.nickname = nickname;
    }

    @Mutation
    private SET_LOGIN(login: boolean): void {
        this.loggedIn = login;
    }

    @Action
    public async login(userInfo: { username: string, password: string }): Promise<void> {
        const username = userInfo.username.trim();
        const password = userInfo.password;
        const data = await UserService.postLogin(username, password);
        this.SET_TOKEN(data.token);
        this.SET_REFRESH_TOKEN(data.refreshToken);
        this.SET_NICKNAME(data.user);
        this.SET_LOGIN(true);
    }

    @Action
    public async getUserInfo(): Promise<void> {
        // NOP
    }
}

export const UserModule = getModule(User);
