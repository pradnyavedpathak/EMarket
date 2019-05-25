import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './eMarket/order/order.component';
import { AddShopComponent } from './eMarket/add-shop/add-shop.component';
import { AddProductComponent } from './eMarket/add-product/add-product.component';
import { AddEmployeeComponent } from './eMarket/add-employee/add-employee.component';

const routes: Routes = [
  { path: 'Order', component: OrderComponent },
  { path: 'Add-Shop', component: AddShopComponent },
  { path: 'Add-Product', component: AddProductComponent },
  { path: 'Add-Employee', component: AddEmployeeComponent },
  { path: '', redirectTo: '/Order', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
