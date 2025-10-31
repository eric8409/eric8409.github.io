import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  product_Id: number; // 注意: 使用 product_Id 而非 productId 以配合你的後端資料結構
  product_Name: string;
  price: number;
  image_url: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // 使用 BehaviorSubject 來存放購物車清單
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  // 暴露為 Observable，讓元件可以安全地訂閱
  cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();

  constructor() { }

  /**
   * 將商品新增到購物車
   * @param item 要新增的商品物件 (productId, quantity)
   */
  addItem(item: CartItem) {
    // 取得當前購物車清單的副本以避免直接修改 state
    const currentItems = [...this.cartItemsSubject.value];

    // 檢查商品是否已存在，若存在則更新數量
    const existingItem = currentItems.find(i => i.productId === item.product_Id);
    if (existingItem) {
      // 確保 quantity 是數字才能相加
      existingItem.quantity = (existingItem.quantity || 0) + (item.quantity || 0);
    } else {
      // 若不存在，則新增
      currentItems.push(item);
    }

    // 更新 BehaviorSubject，通知所有訂閱者
    this.cartItemsSubject.next(currentItems);
  }

  /**
   * 移除購物車中的所有商品
   */
  clearCart() {
    this.cartItemsSubject.next([]);
  }

  // **** 新增的方法 ****

  /**
   * [同步方法] 獲取當前購物車內容的快照
   * @returns 當前的購物車商品陣列
   */
  getItems(): any[] {
    return this.cartItemsSubject.value;
  }

  /**
   * [同步方法] 獲取購物車中商品項目的總數量
   * @returns 購物車中所有商品的總數量
   */
  getCartItemCount(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  /**
   * [示範] 移除單一商品項目
   * @param productId 要移除的商品 ID
   */
  removeItem(productId: number) {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.productId !== productId);
    this.cartItemsSubject.next(updatedItems);
  }
}
