export interface UserOrderVm {
  orderId: string;
  date: Date;
  totalAmount: number;
  items: OrderItem[];
}

export interface OrderItem {
  productId:string;
  name: string;
  quantity: number;
  productImage:string
  price:number
}