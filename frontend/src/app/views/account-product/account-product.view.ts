import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-account-product',
  templateUrl: './account-product.view.html',
  styleUrls: ['./account-product.view.scss']
})
export class AccountProductView implements OnInit {
  constructor(private router : Router, private route:ActivatedRoute, private stateService:StateService) {this.router = router; this.route = route; }

  ngOnInit() {
  }

  public saveProductChoice(event) {
    this.stateService.choosenProduct = event;
    this.router.navigate(['product'], { relativeTo: this.route });
  }
}
