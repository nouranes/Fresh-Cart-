// allorders.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment.service';
import { CommonModule } from '@angular/common';
import { AllOrders } from '../../shared/interfaces/all-orders';
import { jwtDecode } from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
  private readonly paymentService = inject(PaymentService);
  
  ordersData: AllOrders[] = [];
  isEmpty = true;
  userId: string = '';

  ngOnInit(): void {
    this.loadUserOrders();
  }

  loadUserOrders(): void {
    const token = localStorage.getItem('myToken');
    if (!token) {
      console.log('User not logged in');
      return;
    }

    try {
      const userData: any = jwtDecode(token);
      this.userId = userData.id;
      console.log('User ID from token:', this.userId);

      if (!this.userId) {
        console.error('User ID not found in token');
        return;
      }

      this.paymentService.getAllOrders(this.userId)
        .pipe(
          catchError(error => {
            console.error('Error with user ID endpoint, trying token endpoint:', error);
            return this.paymentService.getOrdersByToken();
          })
        )
        .subscribe({
          next: (res) => {
            console.log('API Response:', res);
            
            if (res && res.data) {
              this.ordersData = res.data;
            } else if (res && Array.isArray(res)) {
              this.ordersData = res;
            } else if (res && res.orders) {
              this.ordersData = res.orders;
            } else {
              this.ordersData = [];
            }
            
            this.isEmpty = this.ordersData.length === 0;
          },
          error: (err) => {
            console.error('All order fetch attempts failed:', err);
          }
        });
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
}