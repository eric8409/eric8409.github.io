import { HttpClient, HttpParams } from '@angular/common/http';
import {Component} from '@angular/core';
import { ProductService } from '../services/product.service';
import{ OrderService } from '../services/order.service';
import {ActivatedRoute, Router} from "@angular/router";
import {CartItem, CartService} from '../services/cart.service';




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  private newFormData: any;
  private currentUserId: null | undefined;

  get buyItemList(): any {
    return this._buyItemList;
  }

  set buyItemList(value: any) {
    this._buyItemList = value;
  }


  // 確保 items 是一個空陣列，以避免 *ngIf 錯誤
  items: any[] = [];
  selectedCategory: string | undefined;
  selectedSelect: string | undefined;
  selectedSort: string | undefined;

  categories = [{cate: 'CAR', name: '汽車'}, {cate: 'FOOD', name: '食物'}];
  selects = [{sort: 'price', name: '價格'}, {sort: 'stock', name: '庫存'}, {sort: 'product_id', name: '商品ID'}];
  sorts = [{sort: 'asc', name: '升序'}, {sort: 'desc', name: '降序'}];

  // 在此宣告 displayedColumns 變數
  displayedColumns: string[] = ['product_Id', 'image_url', 'product_Name', 'category', 'price', 'stock', 'create_date', 'actions'];

  // 新增：用於儲存被選中的列
  selectedRow: any;
  private _buyItemList: any;


  constructor(private productService: ProductService, private orderService: OrderService, private route: ActivatedRoute, private cartService: CartService, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    // 在此設定表單的預設值
    this.selectedCategory = 'CAR'; // 預設商品類型為汽車
    this.selectedSelect = 'price'; // 預設排序方式為價格
    this.selectedSort = 'desc'; // 預設排序大小為升序

    // 載入元件時，自動發起一次搜尋
    this.onSubmit();
    this.onSubmit1();
    this.route.params.subscribe(params => {
      this.newFormData.userId = +params['id'];
    })
  }


  onSubmit(): void {
    let params = new HttpParams();

    // 只有在值存在（非 undefined）時才設定參數
    if (this.selectedCategory) {
      params = params.set('category', this.selectedCategory);
    }
    if (this.selectedSelect) {
      params = params.set('orderBy', this.selectedSelect);
    }
    if (this.selectedSort) {
      params = params.set('sort', this.selectedSort);
    }

    this.productService.getProductsWithParams(params).subscribe(
      response => {
        // 使用 .map() 確保每個商品物件都有 quantity 屬性，預設值為 1
        this.items = response.results.map((item: any) => ({
          ...item,
          quantity: 1 // 初始化 quantity 屬性，用於 ngModel 綁定
        }));

        console.log('取得的商品資料（已初始化）：', this.items);
      },
      error => {
        console.error('發生錯誤：', error);
      }
    );
  }


  // 新增：點擊列時觸發的方法，用於選中或取消選中列
  selectRow(row: any): void {
    this.selectedRow = (this.selectedRow === row) ? null : row;
    console.log('選中的列:', this.selectedRow);
  }

// 加入購物車的方法
  item: any;
  public addToCart(item: any, quantity: number | undefined): void {
    // ^^^ 確保這裡有類型宣告 (例如 any 或明確的介面 Product)

    if (quantity && quantity > 0 && quantity <= item.stock) {

      // *** 建立一個符合 CartItem 介面的完整物件 ***
      const itemToAdd: CartItem = {
        product_Id: item.product_Id,
        product_Name: item.product_Name,
        price: item.price,
        image_url: item.image_url,
        quantity: quantity
      };

      this.cartService.addItem(itemToAdd);

      alert(`${item.product_Name} 已成功加入購物車！`);

      // 可選：導向到購物車頁面
      // this.router.navigate(['/cart']);

    } else if (!quantity || quantity <= 0) {
      alert('請輸入有效的商品數量！');
    } else if (quantity > item.stock) {
      alert('庫存不足！');
    }
  }


  onSubmit1(): void {
    let params = new HttpParams();
    if (this.selectedCategory) {
      params = params.set('category', this.selectedCategory);
    }
    if (this.selectedSelect) {
      params = params.set('orderBy', this.selectedSelect);
    }
    if (this.selectedSort) {
      params = params.set('sort', this.selectedSort);
    }
    this.productService.getProductsWithParams(params).subscribe(
      response => {
        this.items = response.results.map((item: any) => ({ ...item, quantity: 1 })); // 初始化每個商品的數量
      },
      error => {
        console.error('發生錯誤：', error);
      }
    );
  }
  goToOrders(): void {
    if (this.currentUserId !== null) {
      this.router.navigate(['/orders', this.currentUserId]);
    } else {
      alert('無法識別使用者 ID。');
      this.router.navigate(['/login']);
    }
}
}
