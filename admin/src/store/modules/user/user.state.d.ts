export interface IUserState {
    loggedIn: boolean;
    token: string;
    nickname: string;
    rights: Array<string>;
    balance?: number;
}