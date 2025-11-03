import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)
  cartDetails :Icart={}as Icart
  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetails=res.data
        this.cartService.updateCartCount(this.cartDetails.products.length);

      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }
  deleteItem(id:string){
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetails=res.data
        this.cartService.updateCartCount(this.cartDetails.products.length);
      },
      error:(err)=>{
        console.log(err)
      }
  }

  )}

updateQuantity(quantity:any ,id:string){
  this.cartService.updateCartProductQuantity(quantity,id).subscribe({
    next:(res)=>{
        console.log(res)
        this.cartDetails=res.data
        this.cartService.updateCartCount(this.cartDetails.products.length);
      },
      error:(err)=>{
        console.log(err)
      }


  })

}
deleteCart(): void {
  this.cartService.clearUserCart().subscribe({
    next: (res) => {
      console.log(res);
      this.cartDetails ={} as Icart
      this.cartService.updateCartCount(0);
    },
    error: (err) => {
      console.log(err);
    }
  });
}


}
