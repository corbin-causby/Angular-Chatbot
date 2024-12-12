import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';  // Import SignInComponent
import { DashboardComponent } from './dashboard/dashboard.component';  // Import DashboardComponent
import { appRoutes } from './app.routes';  // Import routing configuration
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HttpClientModule, CommonModule, FormsModule, RouterModule, SignInComponent, DashboardComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'SignInApp';
  // You can add logic here if needed
}




