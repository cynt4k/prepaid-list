import {Component} from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent {
  _users: any;

  constructor() {
    this._users = [];
    this._users.push({name: 'Nick', credit: 4.5});
    this._users.push({name: 'Manuel', credit: -4.5});
    this._users.push({name: 'Sermes', credit: -14.5});
  }
  get users() { return this._users; }

 isNegative(user) {
    return user.credit < 0;
 }

  isDeactivated(user) {
    return user.credit < -10;
  }
}
