// payment.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  // دالة للحصول على التوكن في كل مرة لضمان أنه حديث
  private getToken(): string {
    return localStorage.getItem('myToken') || '';
  }

  checkoutSession(id: string, shippingData: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      {
        "shippingAddress": shippingData
      },
      {
        headers: {
          'token': this.getToken(),
          'Content-Type': 'application/json'
        }
      }
    );
  }

  getAllOrders(userId: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/orders/user/${userId}`,
      {
        headers: {
          'token': this.getToken(),
          'Content-Type': 'application/json'
        }
      }
    );
  }

  // دالة جديدة قد تساعد في الحصول على الطلبات بدون استخدام userId
  getOrdersByToken(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/orders/my-orders`,
      {
        headers: {
          'token': this.getToken(),
          'Content-Type': 'application/json'
        }
      }
    );
  }
}