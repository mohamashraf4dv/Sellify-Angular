import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},

    {path: 'products', loadComponent: () => import('./pages/products/products').then(m => m.Products)},
    {path: 'product/:id', loadComponent: () => import('./pages/product/product').then(m => m.Product)},

    {path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.Cart)},

    {path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile)},
    {path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register)},
    {path: 'signin', loadComponent: () => import('./pages/sign-in/sign-in').then(m => m.SignIn)},
    {path: 'notfound', loadComponent: () => import('./pages/notfound/notfound').then(m => m.Notfound)},
    {path:"**", redirectTo: 'notfound'}
];
