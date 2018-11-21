import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-value-button',
  templateUrl: './value-button.component.html',
  styleUrls: ['./value-button.component.scss']
})
export class ValueButtonComponent implements OnInit {

  private _value: number = 0;
  private _text: string = '';
  private _isActivated: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  get value() {
    return this._value;
  }

  get text() {
    if (this._text === '') {
      return this._value.toString();
    } else {
      return this._text;
    }
  }


  @Input()
  set value(val: number) {
    this._value = val;
  }

  @Input()
  set text(txt: string) {
      this._text = txt;
  }

  get isActivated() { return this._isActivated; }

  @Input()
  set isActivated(activated: boolean) {
    this._isActivated = activated;
  }
}
