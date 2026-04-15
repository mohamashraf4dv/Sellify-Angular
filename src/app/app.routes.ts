import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},

    {path: 'products', loadComponent: () => import('./features/products/products-viewer-home/products').then(m => m.Products)},
    {path: 'product/:id', loadComponent: () => import('./features/products/product-details/product-details').then(m => m.ProductDetails)},

    {path: 'cart', loadComponent: () => import('./features/cart/cart').then(m => m.Cart)},
    {path:'wishlist', loadComponent: ()=> import('./features/products/wishlist-products/wishlist-products').then(wp=> wp.WishlistProducts)},
    {path: 'profile', loadComponent: () => import('./features/user/profile/profile').then(m => m.Profile)},
    {path:'orders',loadComponent:()=> import('./features/user/user-orders/user-orders').then(m=> m.UserOrders)},
    {path:'dashboard/seller', loadComponent : () => import('./features/dashboards/seller-dashboard/home/seller-dashboard').then(m=>m.SellerDashboard)
        ,children:[
            {path: '', redirectTo:'inventory',pathMatch:'full'},
            {path:'inventory', loadComponent:()=> import('./features/dashboards/seller-dashboard/inventory-manager/inventory-manager').then(m=>m.InventoryManager)},

            //CLEAN IT UP LATER NOT USING THIS ANYMORE WE USE INVENTORY MANAGER INSTEAD
            {path:'products',loadComponent:()=> import('./features/dashboards/seller-dashboard/seller-products/seller-products').then(m=>m.SellerProducts)},

            {path:'products/add',loadComponent:()=> import('./features/dashboards/seller-dashboard/add-product/add-product').then(m=>m.AddProduct)},
            {path:'orders',loadComponent:()=> import('./features/dashboards/seller-dashboard/view-orders/view-orders').then(m=>m.ViewOrders)}
        ]
    },
    {path: 'register', loadComponent: () => import('./features/authentication/register/register').then(m => m.Register)},
    {path: 'signin', loadComponent: () => import('./features/authentication/sign-in/sign-in').then(m => m.SignIn)},
    {path:'success',loadComponent:()=>import('./features/orders/payment/success/success').then(m=>m.Success)},
    {path:'cancel',loadComponent:()=>import('./features/orders/payment/cancel/cancel').then(m=>m.Cancel)},
    {path: 'notfound', loadComponent: () => import('./features/notfound/notfound').then(m => m.Notfound)},
    {path:"**", redirectTo: 'notfound'}
];
