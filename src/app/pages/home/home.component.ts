import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { log } from 'console';
import { ICategory } from '../../shared/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink ,SearchPipe ,FormsModule,NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService=inject(CartService)
   private readonly toastr=inject(ToastrService)
   private readonly ngxSpinner=inject(NgxSpinnerService)
  
    
  
  myProducts: Iproduct[] = [];
  myCategories: ICategory[] = [];

  searchItem:string ='';
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa-solid fa-angle-left hover:text-white  cursor-pointer"></i>',
      '<i class="fa-solid fa-angle-right cursor-pointer"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  prod: any;
  slidesStore: any;
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa-solid fa-angle-left hover:text-white  cursor-pointer"></i>',
      '<i class="fa-solid fa-angle-right cursor-pointer"></i>',
    ],

    items: 1,
    nav: true,
    responsive: {
    0: { items: 1 },
    768: { items: 1 },
    1024: { items: 1 }
  }
  };

  callProduct() {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.myProducts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  callCategory() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.myCategories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.callProduct();
    this.callCategory();
  }
   showSuccess(msg:string) {
      this.toastr.success(msg, '',{
        progressBar:true,
        progressAnimation:'increasing',
        timeOut:1500
      }

      );
    }
  addProductToCart(id:string):void{
    
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.showSuccess("Product added Successfully")
        const cartProducts = res.data.products || [];
          this.cartService.updateCartCount(cartProducts.length);;
        
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
}
