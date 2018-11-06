import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent {
  private _users: any;
  /* Should btn for user be deactivated, when he has not enough cash? */
  @Input() 
  private deactivateUser: boolean = true;

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
    return this.deactivateUser && user.credit < -10;
  }
}
