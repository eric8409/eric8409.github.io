import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from "./product/product.component";
import {LoginComponent} from "./login/login.component";
import {OrderComponent} from "./order/order.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {CartComponent} from "./cart/cart.component";



const routes: Routes = [

  { path: 'products', component: ProductComponent  },
  { path: 'products/:id', component: ProductComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'orders/:id', component: OrderComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // 預設導向登入頁
  { path: '**', redirectTo: '/login' } // 萬用路由導向登入頁





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
