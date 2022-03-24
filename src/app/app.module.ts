import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsService } from './services/orderdetails.service';
import { UserloginComponent } from './userlogin/userlogin.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    UserloginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [OrderDetailsService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
