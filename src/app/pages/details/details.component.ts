import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from '../../core/services/product/products.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  prodID: any;
  prodData: Iproduct | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.prodID = res.get('id');

        this.productsService.getSpecificProduct(this.prodID).subscribe({
          next: (res) => {
            this.prodData = res.data;
            console.log(this.prodData);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
}
