// import { Component, Vue, Prop } from 'vue-property-decorator';
// import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
// import { User } from '../interfaces/User';
// import { ChangeUserAction, ChangeUserNameAction, ChangeUserNickAction, } from '../store/user-state';
// import { StateNamespaces } from '../store/namespaces';

// const userModule = namespace(StateNamespaces.USER_STATE);


// export class UserFacade extends Vue {

//     @userModule.Getter private userName!: string;
//     @userModule.Getter private userNick!: string;
//     @userModule.Action private changeUserNameAction!: ChangeUserNameAction;
//     @userModule.Action private changeUserNickAction!: ChangeUserNickAction;

//     constructor() {
//         super();
//     }

//     public getUserName() {
//         return this.userName;
//     }
//     public getUserNick() {
//         return this.userNick;
//     }
//     public changeUserName(user: User) {
//         const userAction: ChangeUserAction = {
//             user
//         };
//         this.changeUserNameAction(userAction);
//         this.changeUserNickAction(userAction);
//     }
// }

// export const userFacade: UserFacade = new UserFacade();
