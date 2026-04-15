import { Component  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SellerDashboardHeader } from '../seller-dashboard-header/seller-dashboard-header';

@Component({
  selector: 'app-seller-dashboard',
  imports: [SellerDashboardHeader, RouterOutlet],
  templateUrl: './seller-dashboard.html',
  styleUrl: './seller-dashboard.scss',
})
export class SellerDashboard {
 // Using Signals for that modern "Reactive" portfolio feel
  openModal() {
    // Logic for BS5 Modal
    console.log("Add product clicked");
  }
}