import { Routes } from '@angular/router';
import { BlankComponent } from './layout/blank/blank.component';
import { AuthComponent } from './layout/auth/auth.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';
import { DetailsComponent } from './pages/details/details.component';
import { RenderMode } from '@angular/ssr';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: BlankComponent,
    canActivate: [authGuard],
    title: 'blank !',
    children: [
      { path: 'home', loadComponent :()=>import ("./pages/home/home.component").then((c)=>c.HomeComponent) ,title: 'home !' },
      { path: 'cart', loadComponent: ()=>import ("./pages/cart/cart.component").then((c)=>c.CartComponent), title: 'cart !' },
      { path: 'products', loadComponent: ()=>import ("./pages/products/products.component").then((c)=>c.ProductsComponent), title: 'products !' },
      { path: 'categories', loadComponent: ()=>import ('./pages/categories/categories.component').then((c)=>c.CategoriesComponent), title: 'categories !' },
      { path: 'brands',loadComponent: ()=>import ('./pages/brands/brands.component').then((c)=>c.BrandsComponent), title: 'brands !' },
      { path: 'allorders',loadComponent: ()=>import ('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent), title: 'brands !' },
      { path: 'checkout/:id',loadComponent: ()=>import ('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent), title: 'brands !' },
      { path: 'details/:id',loadComponent: ()=>import ('./pages/details/details.component').then((c)=>c.DetailsComponent), title: 'details !' ,data: { renderMode: 'server' }}
    ],
  },
  {
    path: '',
    component: AuthComponent,
    title: 'auth !',
    canActivate: [loggedGuard],
    children: [
      { path: 'login', loadComponent: ()=>import ('./pages/login/login.component').then((c)=>c.LoginComponent), title: 'login !' },
      { path: 'register', loadComponent: ()=>import ('./pages/register/register.component').then((c)=>c.RegisterComponent), title: 'register !' },
      { path: 'forget-pssword', loadComponent: ()=>import ('./pages/forget-pssword/forget-pssword.component').then((c)=>c.ForgetPsswordComponent), title: 'forget Password !' },
      { path: '**',loadComponent: ()=>import ('./pages/not-found/not-found.component').then((c)=>c.NotFoundComponent), title: 'NotFound !!!' },
    ],
  },
];
