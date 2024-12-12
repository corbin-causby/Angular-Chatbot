import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule for structural directives like *ngIf
import { FormsModule } from '@angular/forms'// Import FormsModule for ngModel (two-way binding)

@Component({
  selector: 'app-sign-in',
  standalone: true,  // This marks the component as standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',  // Path to the HTML template
  styleUrls: ['./sign-in.component.css'],  // Path to the CSS file for this component
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent {


  isActive = false;
    email = '';
    password = '';
    errorMessage = '';

  register() {
    this.isActive = !this.isActive;
  }

  login() {
    this.isActive = !this.isActive;
  }

  constructor(private appRouter: Router) { }

  toDashboard(): void {
    // Navigate to the dashboard after sign-in (no validation in this example)
    this.appRouter.navigate(['/']);
  }

  onSignIn(): void {
    //if (this.email && this.password) {
    this.appRouter.navigate(['/ChatComponent']);
    //} else {
      this.errorMessage = 'Please enter both email and password.';
    //}
  }
}



