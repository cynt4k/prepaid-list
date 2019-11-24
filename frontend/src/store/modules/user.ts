import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { User } from '@/interfaces/User';
import { IUserRegister, IResponseToken, IUserModel } from '@/interfaces/services/index';
import Factory from '@/services/factory';
import store from '../index';
import { shoppingCartStore } from '../store-accessor';

@Module({ name: 'user', namespaced: true, store })
export default class UserModule extends VuexModule {
  private userName: string = '';
  private userNick: string = '';
  private userObj: User | undefined = undefined;
  private tokenObj: string | undefined = undefined;

  get token() {
    return this.tokenObj;
  }

  get user() {
    return this.userObj;
  }
  /// //////////////////////
  // Mutations
  /// //////////////////////
  @Mutation
  private setUser(user: User) {
    this.userObj = user;
  }
  @Mutation
  private resetUser() {
    this.userObj = undefined;
  }

  @Mutation
  private updateBalanceMutation(credit: number) {
    if (this.userObj) {
      this.userObj.credit = credit;
    }
  }

  @Mutation
  private refreshTokenMutation(token: string) {
    this.tokenObj = token;
  }
  @Mutation
  private invalidateToken() {
    this.tokenObj = undefined;
  }

  /// //////////////////////
  // Actions
  /// //////////////////////undefined
  // action 'incr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: 'setUser' })
  async registerUser(userRegister: IUserRegister) {
    // TODO : REGISTER
    const data: IResponseToken = await Factory.getInstance().UserService
      .registerUser(userRegister)
      .toPromise();

    // TODO : Pruefen ob einfach die Login-Action aufgerufen werden kann - selbe Daten
    this.saveToken(data);
    // context.dispatch(UserActionTypes.SAVE_TOKEN, data);
    const user: User = {
      name: userRegister.name.firstname,
      credit: 0.0,
      nickname: userRegister.username
    };
    // this.loginUser(user);
    return user;
  }
  // action 'decr' commits mutation 'decrement' when done with return value as payload
  @Action
  async loginUser(user: User) {
    // TODO : REGISTER UND LOGIN als eigene User-Action zusammenlegen
    const data: IResponseToken = await Factory.getInstance().UserService
      .loginUserByUsername(user.nickname)
      .toPromise();
    await this.saveToken(data);
    // context.dispatch(UserActionTypes.SAVE_TOKEN, data);
    const infos: IUserModel = await Factory.getInstance().UserService.getUserInfos().toPromise();
    const newUser: User = {
      name: infos.username,
      credit: infos.balance,
      nickname: infos.username
    };
    this.setUser(newUser);
    // return newUser;
  }

  @Action({ commit: 'updateBalanceMutation' })
  async updateBalance(payload: number) {
    return payload;
  }

  @Action
  async resetState() {
    Factory.getInstance().JwtService.destroyToken();
    Factory.getInstance().JwtService.destroyRefreshToken();
    // ToDo testen geht das?
    this.resetUser();
    this.invalidateToken();

    shoppingCartStore.resetState();
  }
  @Action
  async refreshToken() {
    const newToken = await Factory.getInstance().ApiService
      .post<IResponseToken>('auth/refresh', {
        refreshToken: Factory.getInstance().JwtService.getRefreshToken()
      })
      .toPromise();

    // save token in local storage
    Factory.getInstance().JwtService.saveToken(newToken.data.token);
    this.refreshTokenMutation(newToken.data.token);
    // return newToken.data.token;
  }
  @Action
  public async saveToken(payload: IResponseToken) {
    // this.tokenObj = payload.token;
    Factory.getInstance().JwtService.saveToken(payload.token);
    Factory.getInstance().JwtService.saveRefreshToken(payload.refreshToken);
    this.refreshTokenMutation(payload.token);
    // return payload.token;
  }
}
