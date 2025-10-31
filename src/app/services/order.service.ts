import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  private postUrl = 'http://localhost:8080/users';
  private getUrl = 'http://localhost:8080/users'

  postOrder(userId: number,data: any): Observable<any> {
    return this.http.post(`${this.postUrl}/${userId}/orders`, data);
  }


  getIOrderById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.getUrl}/${userId}/orders`);
  }












}
