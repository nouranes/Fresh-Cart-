import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment';
import { count } from 'console';
import { ToastrService } from 'ngx-toastr';




@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private httpClient: HttpClient) { 
     const savedCount = localStorage.getItem('cartCount');
    if (savedCount) {
      this.cartCountSubject.next(+savedCount);
    }
  }

  private myToken = localStorage.getItem('myToken')!;
 updateCartCount(count: number) {
    this.cartCountSubject.next(count);
    localStorage.setItem('cartCount', count.toString());
  }
 
  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/cart`,
      {
        productId: id
      },
      {
        headers: {
          token: this.myToken
        }
      }
    );
  }
 getLoggedUserCart(): Observable<any> {
  return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`, {
    headers: {
      token: this.myToken
    }
  });

}
removeSpecificCartItem(id:string):Observable<any>{
  return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
    {
    headers:{
      token:this.myToken
    }
  }
  )
  

}
updateCartProductQuantity(quantity:any ,id:string):Observable<any>{
  
  return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
    {
      "count":quantity
    },
    {
      headers:{
        token:this.myToken
      }
    }
  )
}
clearUserCart(): Observable<any> {
  return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
    headers: {
      token: this.myToken
    }
  });
}

}
