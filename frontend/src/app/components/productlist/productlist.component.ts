import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {
  private _products: any;

  @Output()
  private productSelect: EventEmitter<String> = new EventEmitter<String>();

  constructor() {
    this._products = [];
    this._products.push({ id: 1, name: 'RedBull', price: 1.3 });
    this._products.push({ id: 2, name: 'Bier', price: 1.0 });
    this._products.push({ id: 3, name: 'Wasser', price: 0.5 });
  }

  callProduct(event, product) {
    this.productSelect.emit(product);
  }

  ngOnInit() {
  }
  get products() { return this._products; }

}
