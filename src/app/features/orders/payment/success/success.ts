import { Component, inject ,effect} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../service/order-service';

@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.html',
  styleUrl: './success.scss',
})
export class Success {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _orderService = inject(OrderService);
  sessionId = this._activatedRoute.snapshot.queryParams["session_id"]

  finalizePaymentProcess = effect(()=>{
    this._orderService.finalizePaymentSession(this.sessionId).subscribe({
      next: res=>{

      },
      error: err=>{

      }
      ,
      complete: ()=>{
        this._router.navigate(["/"]);
      }
    });
  })
}
