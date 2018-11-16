import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {
  private _products: any;
  private _routingLink: string;
  constructor() {
    this._products = [];
    this._products.push({ name: 'RedBull', price: 1.3 });
    this._products.push({ name: 'Bier', price: 1.0 });
    this._products.push({ name: 'Wasser', price: 0.5 });
  }

  @Input()
  set routingLink(routingLink : string) { this._routingLink = routingLink; }
  get routingLink() { return this._routingLink}

  ngOnInit() {
  }
  get products() { return this._products; }

}
