import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},

    {path: 'products', loadComponent: () => import('./pages/products/products').then(m => m.Products)},
    {path: 'product/:id', loadComponent: () => import('./pages/product/product').then(m => m.Product)},

    {path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.Cart)},
    {path:'wishlist', loadComponent: ()=> import('./pages/wishlist-products/wishlist-products/wishlist-products').then(wp=> wp.WishlistProducts)},
    {path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile)},
    {path:'dashboard/seller', loadComponent : () => import('./pages/seller-dashboard/seller-dashboard/seller-dashboard').then(m=>m.SellerDashboard)
        ,children:[
            {path: '', redirectTo:'inventory',pathMatch:'full'},
            {path:'inventory', loadComponent:()=> import('./components/seller-dashboard/inventory-manager/inventory-manager').then(m=>m.InventoryManager)},

            //CLEAN IT UP LATER NOT USING THIS ANYMORE WE USE INVENTORY MANAGER INSTEAD
            {path:'products',loadComponent:()=> import('./components/seller-dashboard/seller-products/seller-products').then(m=>m.SellerProducts)},

            {path:'products/add',loadComponent:()=> import('./components/seller-dashboard/add-product/add-product').then(m=>m.AddProduct)},
            {path:'order',loadComponent:()=> import('./components/seller-dashboard/view-orders/view-orders').then(m=>m.ViewOrders)}
        ]
    },
    {path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register)},
    {path: 'signin', loadComponent: () => import('./pages/sign-in/sign-in').then(m => m.SignIn)},
    {path:'success',loadComponent:()=>import('./pages/payment/success/success').then(m=>m.Success)},
    {path:'cancel',loadComponent:()=>import('./pages/payment/cancel/cancel').then(m=>m.Cancel)},
    {path: 'notfound', loadComponent: () => import('./pages/notfound/notfound').then(m => m.Notfound)},
    {path:"**", redirectTo: 'notfound'}
];
