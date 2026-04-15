export interface SellerOrderVm {
orderId:string
orderItems:SellerOrderItemVm[]
totalEarned:number
}

export interface SellerOrderItemVm{
name: string
price: number 
productId: string
productImage: string
quantity: number 
}