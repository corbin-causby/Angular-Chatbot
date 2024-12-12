import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';

export const appRoutes: Routes = [
  { path: 'ChatComponent', component: ChatComponent }, // Default route, sign-in page
  { path: '', component: SignInComponent } // Route for dashboard
  // Other routes can go here
];
