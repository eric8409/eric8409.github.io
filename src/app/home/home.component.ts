import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";


// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  order: { id: number | null } = { id: null }; // 初始化為 null
  private currentUserId: number | null | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }


  ngOnInit(): void {
    // 使用 route.params.subscribe 方法獲取 URL 中的 ID
    this.route.params.subscribe(params => {
      // 將字串參數轉換為數字 (+params['id'])
      const id = +params['id'];

      if (!isNaN(id) && id > 0) {
        this.currentUserId = id;
        this.order.id = id;
        console.log('HomeComponent 接收到的 ID:', this.currentUserId);
      } else {
        console.error('URL 中無效的使用者 ID，導向登入頁面');
        this.router.navigate(['/login']); // 如果 ID 無效，踢回登入頁
      }
    });
  }


  onLogout(): void {
    // 這裡通常會執行清除登入狀態的邏輯，例如：
    // - 移除 localStorage 或 sessionStorage 中的使用者 token
    // - 呼叫一個認證服務 (AuthService) 來處理登出細節

    console.log('使用者已登出');

    // 導航回登入頁面
    this.router.navigate(['/login']);
  }




}
