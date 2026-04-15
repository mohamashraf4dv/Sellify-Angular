import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SellerService } from '../service/seller-service';
import { environment } from '../../../../../environments/environment.development';
import { SellerOrderVm } from '../../../../view-models/seller-order-vm/seller-order-vm';
@Component({
  selector: 'app-view-orders',
  imports: [CurrencyPipe,DatePipe],
  templateUrl: './view-orders.html',
  styleUrl: './view-orders.scss',
})
export class ViewOrders {
  private readonly _sellerService = inject(SellerService)
  private getItemsResponse = toSignal(this._sellerService.getOrders())
  protected orderItems = computed(()=> this.getItemsResponse()?.data ?? [] as SellerOrderVm[])
  url = environment.fileDomainUrl
  
// If using standard array
get calculateGrandTotal(): number {
  return this.orderItems().reduce((acc, order) => acc + (order.totalEarned || 0), 0);
}

// Or if using Signals (Better performance)
totalRevenue = computed(() => {
  return this.orderItems().reduce((acc, order) => acc + (order.totalEarned || 0), 0);
});
}

