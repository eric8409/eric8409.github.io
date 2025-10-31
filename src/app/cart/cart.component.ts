import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service'; // 導入 CartService
import { Subscription } from 'rxjs'; // 導入 Subscription 以管理訂閱


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  totalPrice = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) { }

  displayedColumns: string[] = ['image', 'product_id', 'product_Name', 'price', 'quantity', 'subtotal'];


  ngOnInit(): void {
    // 訂閱購物車資料的變動
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  ngOnDestroy(): void {
    // 在元件銷毀時取消訂閱，避免記憶體洩漏
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // 計算總價
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // 移除購物車項目 (選作)
  removeFromCart(productId: number): void {
    // 實作從購物車服務中移除商品的邏輯
    // 例如：this.cartService.removeFromCart(productId);
  }

  // 清空購物車 (選作)
  clearCart(): void {
    // 實作清空購物車的邏輯
    // 例如：this.cartService.clearCart();
  }
}
