import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { log } from 'console';
import { ICategory } from '../../shared/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  myProducts: Iproduct[] = [];
  myCategories: ICategory[] = [];
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
}
