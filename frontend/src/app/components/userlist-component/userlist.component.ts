import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent {
  private _users: any;
  /* Should btn for user be deactivated, when he has not enough cash? */
  private _deactivateUser: boolean = true;
  
  @Output()
  private userSelect: EventEmitter<String> = new EventEmitter<String>();

  constructor() {
    this._users = [];
    this._users.push({id: 1, name: 'Nick', credit: 4.5});
    this._users.push({id: 2, name: 'Manuel', credit: -4.5});
    this._users.push({id: 3, name: 'Sermes', credit: -14.5});
  }
  @Input()
  set deactivateUser(deactivateUser: boolean) { this._deactivateUser = deactivateUser;}

  get users() { return this._users; }
 
  selectUser(event, user) {
    this.userSelect.emit(user);
  }

  isNegative(user) {
    return user.credit < 0;
  }
  
  isDeactivated(user) {
    return this._deactivateUser && user.credit < -10;
  }
}
