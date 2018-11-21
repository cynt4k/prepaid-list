import {Component, Inject, Injectable, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-currency-picker',
  templateUrl: './currency-picker.component.html',
  styleUrls: ['./currency-picker.component.scss']
})
export class CurrencyPickerComponent implements OnInit {

  private _amount:string = '';
  commaInput: boolean = false;

  constructor() {}

  addEntry(input : string){
    console.log('clicked ' + input);

    if (input.includes(",")) {
      this.commaInput = true;
    }

    if (input.startsWith("C")) {
      this._amount = input.substr(input.indexOf("C") + 1);
      this.commaInput = false;
    } else {
      this._amount = this._amount + input;
    }
  }

  submit() {
    console.log('submit value ' + this._amount);
  }

  get amount() { return this._amount; }


  ngOnInit() {
  }

}
