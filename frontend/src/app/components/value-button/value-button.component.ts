import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-value-button',
  templateUrl: './value-button.component.html',
  styleUrls: ['./value-button.component.scss']
})
export class ValueButtonComponent implements OnInit {

  private _value: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  get value() { return this._value; }

  @Input()
  set value(val: number) {
    this._value = val;
  }
}
