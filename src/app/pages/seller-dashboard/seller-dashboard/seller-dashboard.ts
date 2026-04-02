import { Component  } from '@angular/core';
import { SellerDashboardHeader } from "../../../components/seller-dashboard/seller-dashboard-header/seller-dashboard-header";
import { RouterOutlet } from '@angular/router';

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