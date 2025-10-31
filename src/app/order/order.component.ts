import {Component, OnInit} from '@angular/core';
import { OrderService } from '../services/order.service';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {CartService} from "../services/cart.service";


// ... 定義 interfaces (CartItem, OrderPayload, OrderHistoryItem) 參考上一個回覆 ...
interface OrderItem { product_Id: number; quantity: number; }
interface OrderPayload { buyItemList: OrderItem[]; }
interface OrderHistoryItem { /* ... */ }



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})



export class OrderComponent implements OnInit {


// 假設 formData 是來自表單的字串值
  formData = {userId: '', product_Id: '', quantity: ''};


// 轉換
  userIdAsNumber: number = +this.formData.userId;
  productidAsNumber: number = +this.formData.product_Id;
  quantityAsNumber: number = +this.formData.quantity;


// 建立一個新物件
  newFormData = {
    userId: this.userIdAsNumber,
    product_Id: this.productidAsNumber,
    quantity: this.quantityAsNumber
  };
  serverData: any;
  flattenedData: any[] = [];


  // 1. 定義用來收集單一購物項目的模型
  newOrderItem = {
    product_Id: null,
    quantity: null
  };

  // 2. 定義用來儲存所有購物項目的陣列
  buyItemList: any[] = [];


  // 在此宣告 displayedColumns 變數
  displayedColumns: string[] = [
    'order_id',
    'user_id',
    'totalAmount',
    'create_date',
  ];



  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute, protected cartService: CartService) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.newFormData.userId = +params['id'];
      // Now you can use the ID in the URL wherever you want in the this.id variable.
      this.getOrder();
    });
  }


  // --- 新增的功能：從購物車載入 ---

  /**
   * 從 CartService 載入商品到當前表單的 buyItemList
   */
  loadCartItemsFromService(): void {
    const cartItems = this.cartService.getItems();

    if (cartItems.length > 0) {
      // 將購物車的內容複製到表單的 buyItemList
      this.buyItemList = [...cartItems];
      // 清空手動輸入的欄位
      this.newOrderItem = { product_Id: null!, quantity: null! };
      // 提示使用者
      alert(`已從購物車載入 ${cartItems.length} 項商品到訂單列表中。`);

      // (選用) 如果希望載入後清空購物車服務，可以在這裡呼叫:
      // this.cartService.clearCart();
    } else {
      alert('購物車服務中目前沒有商品。');
    }
  }



  // 4. 新增一個方法來添加項目到購物車清單
  addItemToList() {
    // 確保輸入值有效
    if (this.newOrderItem.product_Id && this.newOrderItem.quantity) {
      this.buyItemList.push({...this.newOrderItem}); // 使用展開運算子複製物件
      this.newOrderItem.product_Id = null; // 清空輸入欄位
      this.newOrderItem.quantity = null;
    }
  }

  // 5. 修改 onSubmit() 方法來發送正確格式的資料
  onSubmit(message?: string) {
    // 檢查是否有購物項目
    if (this.buyItemList.length === 0) {
      alert('請至少加入一個購物項目！');
      return;
    }

    const payload = {
      buyItemList: this.buyItemList
    };

    // 呼叫服務發送 POST 請求
    this.orderService.postOrder(this.newFormData.userId, payload).subscribe(
      response => {
        confirm('購買成功!!! 訂單序號：' + response.order_id);
        console.log('訂單建立成功:', response);
        this.buyItemList = []; // 成功後清空購物車
      },
      error => {
        console.error('訂單建立失敗:', error);
      }
    );
  }

  resetForm(myForm: NgForm) {
    myForm.resetForm();
    this.buyItemList = []; // 清空購物車清單
  }



  getOrder() {
    this.orderService.getIOrderById(this.newFormData.userId).subscribe({
      next: (response) => {
        if (response && response.results) {
          // 在此呼叫扁平化方法
          this.flattenAndDisplay(response.results);
        } else {
          this.flattenedData = [];
          console.warn('API response is missing the "results" array.', response);
        }
      },
      error: (error) => {
        this.flattenedData = [];
        console.error('API call failed:', error);
      }
    });
  }

  flattenAndDisplay(results: any[]) {
    this.flattenedData = [];
    results.forEach(order => {
      // 檢查 orderItemList 是否存在且不為空
      if (order.orderItemList && order.orderItemList.length > 0) {
        order.orderItemList.forEach((item: any) => {
          // 將 order 資訊與 item 資訊合併，形成單一物件
          this.flattenedData.push({
            order_id: order.order_id,
            user_id: order.user_id,
            totalAmount: order.totalAmount,
            create_date: order.create_date,

            // 明確指定 item 的屬性
            item_id: item.order_item_id,
            productName: item.product_name, // 確保屬性名稱與後端一致
            quantity: item.quantity,
            price: item.amount // 假設 amount 是單價
          });
        });
      } else {
        // 如果沒有 orderItemList，也將訂單資訊加入
        this.flattenedData.push({
          order_id: order.order_id,
          user_id: order.user_id,
          totalAmount: order.totalAmount,
          create_date: order.create_date,
          item_id: 'N/A', // 提供預設值
          productName: 'N/A',
          quantity: 'N/A',
          price: 'N/A'
        });
      }
    });
    console.log(this.flattenedData); // 檢查扁平化後的資料
  }












}






