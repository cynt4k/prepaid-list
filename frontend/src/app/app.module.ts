import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ButtonsModule } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// Views and Components
import {ContentComponent} from './components/app-content-component/app-content.component';
import { StartView } from 'src/app/views/app-start/app-start.view';
import {PaymentView} from './views/app-payment/app-payment.view';
import {UserlistComponent} from './components/userlist-component/userlist.component';
import { CurrencyPickerComponent } from './components/currency-picker-component/currency-picker.component';
import { ValueButtonComponent } from './components/value-button/value-button.component';



@NgModule({
  declarations: [
    AppComponent,
    StartView,
    ContentComponent,
    PaymentView,
    UserlistComponent,
    CurrencyPickerComponent,
    ValueButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    FormsModule,
    HttpModule,
    HttpClientModule,
    PopoverModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
