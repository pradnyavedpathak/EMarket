import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddShopComponent } from './eMarket/add-shop/add-shop.component';
import { AddProductComponent } from './eMarket/add-product/add-product.component';
import { OrderComponent } from './eMarket/order/order.component';
import { ShopService } from './eMarket/add-shop/add-shop.service';
import { ProductService } from './eMarket/add-product/add-product.service';
import { EmployeeService } from './eMarket/add-employee/add-employee.service';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './eMarket/add-employee/add-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    AddShopComponent,
    AddProductComponent,
    OrderComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ShopService,
    ProductService,
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
