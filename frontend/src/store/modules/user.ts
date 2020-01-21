import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import Factory from '@/services/factory';
import store from '../index';
import { shoppingCartStore } from '../store-accessor';
import { User } from '@/services/entities/User';
import { IUserRegister, IResponseToken, IUserModel } from '@/services/entities/api';
import { EventBus, EventBusMessage, SnackbarOptions, TypeColor } from '@/assets/EventBus';

@Module({ name: 'user', namespaced: true, store })
export default class UserModule extends VuexModule {
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
    this.updateUserInformation(data);
  }

  @Action
  private async updateUserInformation(token: IResponseToken) {
    this.saveToken(token);
    const infos: IUserModel = await Factory.getInstance().UserService.getUserInfos().toPromise();
    const user: User = {
      name: infos.name.firstname + infos.name.lastname,
      credit: infos.balance,
      nickname: infos.username
    };
    this.setUser(user);
    EventBus.$emit(EventBusMessage.ROUTING, { name: 'Dashboard' });
  }

  @Action
  private async loginUserByCardId(cardId: string) {
    try {
      const data: IResponseToken = await Factory.getInstance().UserService.loginUserByToken(String(cardId)).toPromise();
      this.updateUserInformation(data);
    } catch (error) {
      const message : SnackbarOptions = { message: 'User not defined', snackbarType: TypeColor.ERROR };
      EventBus.$emit(EventBusMessage.MESSAGE, message);
    }
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
    EventBus.$emit(EventBusMessage.ROUTING, { name: 'Home' });
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

  @Action
  private async receiveRFIDCard(event: MessageEvent) {
    const cardId = JSON.parse(event.data)['cardId'][0];
    // console.log('cardId', cardId);
    // No User is logged in
    if (this.user) {
      this.resetState();
    }
    this.loginUserByCardId(cardId);
  }

  @Action
  public async initRFIDReader() {
    const websocketLocation: string = 'ws://localhost:8765';
    Factory.getInstance().WebsocketService.initNewSocket(websocketLocation, this.receiveRFIDCard);
  }
}
