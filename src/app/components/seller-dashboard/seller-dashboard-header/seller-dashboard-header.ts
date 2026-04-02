import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard-header',
  imports: [MatIcon,RouterLink],
  templateUrl: './seller-dashboard-header.html',
  styleUrl: './seller-dashboard-header.scss',
})
export class SellerDashboardHeader {
    stats = signal([
    { label: 'Revenue', value: '$12,840', icon: 'bi-graph-up-arrow' },
    { label: 'Sales', value: '1,240', icon: 'bi-cart-check' },
    { label: 'Low Stock', value: '5', icon: 'bi-exclamation-triangle' },
    { label: 'Pending', value: '12', icon: 'bi-clock-history' }
  ]);
}
