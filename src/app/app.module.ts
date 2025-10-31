import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderComponent } from './order/order.component';
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog';
import {MatList, MatListItem} from "@angular/material/list";
import { HomeComponent } from './home/home.component';
import {MatChipRow, MatChipSet} from "@angular/material/chips";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import { MatCardModule } from '@angular/material/card';
import { CartComponent } from './cart/cart.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProductComponent,
    OrderComponent,
    HomeComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,  // 引入按鈕模組
    MatIconModule,    // 引入圖示模組
    MatTooltipModule, // 引入工具提示模組
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatList,
    MatListItem,
    MatChipRow,
    MatChipSet,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardModule,
    MatButtonModule,
    MatTableModule,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
