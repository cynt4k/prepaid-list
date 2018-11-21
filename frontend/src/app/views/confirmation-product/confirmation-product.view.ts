import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/core/services/state.service';
import { User } from 'src/app/core/models/user.model';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-confirmation-product',
  templateUrl: './confirmation-product.view.html',
  styleUrls: ['./confirmation-product.view.scss']
})
export class ConfirmationProductView implements OnInit {
    private _choosenUser: User;
    private _choosenProduct: Product;
  
  constructor(private router : Router, private route:ActivatedRoute, private stateService:StateService) {}

  ngOnInit() {
      this._choosenProduct = this.stateService.choosenProduct;
      this._choosenUser = this.stateService.choosenUser;
  }

  get choosenUser(): User {return this._choosenUser;}
  get choosenProduct(): Product {return this._choosenProduct;}

  public pay() {
      console.log("pay");
  }
  public cancel() {
      console.log("cancel");
  }

}