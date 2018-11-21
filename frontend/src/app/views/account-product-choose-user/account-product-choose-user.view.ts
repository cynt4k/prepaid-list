import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-account-product-choose-user',
  templateUrl: './account-product-choose-user.view.html',
  styleUrls: ['./account-product-choose-user.view.scss']
})
export class AccountProductChooseUserView implements OnInit {
  
  constructor(private router : Router, private route:ActivatedRoute, private stateService:StateService) {}

  ngOnInit() {
  }

  public saveUser(event) {
    this.stateService.choosenUser = event;
    this.router.navigate(['confirmation'], { relativeTo: this.route });    
  }
}