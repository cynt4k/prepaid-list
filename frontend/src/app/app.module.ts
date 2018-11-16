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
import {ContentComponent} from './components/content-component/content.component';
import { StartView } from 'src/app/views/start/start.view';
import {PaymentView} from './views/payment/payment.view';
import {UserlistComponent} from './components/userlist-component/userlist.component';
import { CurrencyPickerComponent } from './components/currency-picker-component/currency-picker.component';
import { ValueButtonComponent } from './components/value-button/value-button.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { AccountProductView } from './views/account-product/account-product.view';
import { AccountProductChooseUserView } from './views/account-product-choose-user/account-product-choose-user.view';



@NgModule({
  declarations: [
    AppComponent,
    StartView,
    ContentComponent,
    PaymentView,
    UserlistComponent,
    CurrencyPickerComponent,
    ValueButtonComponent,
    ProductlistComponent,
    AccountProductView,
    AccountProductChooseUserView
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
