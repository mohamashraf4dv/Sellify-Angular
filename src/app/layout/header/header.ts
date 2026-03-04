import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserHeaderProfiler } from "../../components/user/user-header-profiler/user-header-profiler";
import { RouterLink } from "@angular/router";
import { UserHeaderNotification } from "../../components/user/user-header-notification/user-header-notification";

// Add these to your @Component 'imports' array (if standalone)
// or your @NgModule 'imports' array.
@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatButtonModule,
    UserHeaderProfiler,
    RouterLink,
    UserHeaderNotification
],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {

}
