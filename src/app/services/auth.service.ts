import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIdSubject = new BehaviorSubject<number | null>(null);
  public readonly userId$ = this.userIdSubject.asObservable();

  constructor() {
    // *** 恢復 ID 的關鍵邏輯 ***
    const storedId = localStorage.getItem('user_id');
    if (storedId) {
      this.userIdSubject.next(+storedId);
    }
  }
  // ... (確保 setUserId 方法有儲存到 localStorage)
  setUserId(id: number): void {
    this.userIdSubject.next(id);
    localStorage.setItem('user_id', id.toString());
  }

  logout() {

  }
}

export class AuthGuard {
}
