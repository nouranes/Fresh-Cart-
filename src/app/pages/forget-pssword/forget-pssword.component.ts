import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotService } from '../../core/services/forgot/forgot.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forget-pssword',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './forget-pssword.component.html',
  styleUrls: ['./forget-pssword.component.scss']
})
export class ForgetPsswordComponent {
  private readonly forgotService = inject(ForgotService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  step: number = 1;
  isLoading: boolean = false;
  errMsg: string = "";
  successMsg: string = "";

  forgotPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  });

  resetPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)
    ]),
  });

  forgotPass() {
    this.forgotPassForm.markAllAsTouched();
    
    if (this.forgotPassForm.invalid) return;

    this.isLoading = true;
    this.errMsg = "";
    const emailValue = this.forgotPassForm.get('email')?.value;
    this.resetPassForm.get('email')?.patchValue(emailValue);

    this.forgotService.forgotPass(this.forgotPassForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.statusMsg == 'success') {
          this.step = 2;
          this.successMsg = "Verification code has been sent to your email";
          setTimeout(() => this.successMsg = "", 1000);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errMsg = err.error.message;
      }
    });
  }

  verifyCode() {
    this.verifyCodeForm.markAllAsTouched();
    
    if (this.verifyCodeForm.invalid) return;

    this.isLoading = true;
    this.errMsg = "";
    this.forgotService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status == 'Success') {
          this.step = 3;
          this.successMsg = "Verification code confirmed successfully";
          setTimeout(() => this.successMsg = "", 1000);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errMsg = err.error.message;
      }
    });
  }

  resetPass() {
    this.resetPassForm.markAllAsTouched();
    
    if (this.resetPassForm.invalid) return;

    this.isLoading = true;
    this.errMsg = "";
    this.forgotService.resetPass(this.resetPassForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMsg = "Password has been reset successfully";
        localStorage.setItem('myToken', res.token);
        this.authService.getUserData();
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errMsg = err.error.message;
      }
    });
  }
}