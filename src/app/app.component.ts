import {Component, OnInit} from '@angular/core';
import {ProductService} from "./services/product.service";
import {OrderService} from "./services/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "./services/cart.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})




export class AppComponent implements OnInit {
  title = 'shopmall';


  protected currentUserId: number | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    // 訂閱 AuthService 中的 ID 變化
    this.authService.userId$.subscribe(userId => {
      this.currentUserId = userId;
    });
  }
    // *** 實現登出方法 ***
    logout(): void {
      this.authService.logout(); // 清除 AuthService 中的 ID 和 localStorage
      alert('您已登出。');
    this.router.navigate(['/login']); // 導向登入頁面 (請確保你有 /login 路由)
  }


}
