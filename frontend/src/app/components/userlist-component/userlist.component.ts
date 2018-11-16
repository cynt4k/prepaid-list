import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent {
  private _users: any;
  /* Should btn for user be deactivated, when he has not enough cash? */
  private _deactivateUser: boolean = true;
  private _routingLink: string;
  
  constructor() {
    this._users = [];
    this._users.push({name: 'Nick', credit: 4.5});
    this._users.push({name: 'Manuel', credit: -4.5});
    this._users.push({name: 'Sermes', credit: -14.5});
  }
  @Input()
  set deactivateUser(deactivateUser: boolean) { this._deactivateUser = deactivateUser;}
  @Input()
  set routingLink(routingLink : string) { this._routingLink = routingLink; }
 
  get users() { return this._users; }
  get routingLink() { return this._routingLink}
 
  isNegative(user) {
    return user.credit < 0;
  }
  
  isDeactivated(user) {
    return this._deactivateUser && user.credit < -10;
  }
}
