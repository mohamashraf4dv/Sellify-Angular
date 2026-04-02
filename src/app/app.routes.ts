import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},

    {path: 'products', loadComponent: () => import('./pages/products/products').then(m => m.Products)},
    {path: 'product/:id', loadComponent: () => import('./pages/product/product').then(m => m.Product)},

    {path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.Cart)},

    {path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile)},
    {path:'dashboard/seller', loadComponent : () => import('./pages/seller-dashboard/seller-dashboard/seller-dashboard').then(m=>m.SellerDashboard)
        ,children:[
            {path: '', redirectTo:'product',pathMatch:'full'},
            {path:'inventory', loadComponent:()=> import('./components/seller-dashboard/inventory-manager/inventory-manager').then(m=>m.InventoryManager)},
            {path:'products',loadComponent:()=> import('./components/seller-dashboard/seller-products/seller-products').then(m=>m.SellerProducts)},
            {path:'products/add',loadComponent:()=> import('./components/seller-dashboard/add-product/add-product').then(m=>m.AddProduct)},
            {path:'order',loadComponent:()=> import('./components/seller-dashboard/view-orders/view-orders').then(m=>m.ViewOrders)}
        ]
    },
    {path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register)},
    {path: 'signin', loadComponent: () => import('./pages/sign-in/sign-in').then(m => m.SignIn)},
    {path: 'notfound', loadComponent: () => import('./pages/notfound/notfound').then(m => m.Notfound)},
    {path:"**", redirectTo: 'notfound'}
];
