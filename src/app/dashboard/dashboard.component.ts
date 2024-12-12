import { AfterViewInit, Component, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf, ngClass, etc.

@Component({
  selector: 'app-dashboard',  // Selector to use this component in HTML
  standalone: true,  // This marks the component as standalone
  imports: [CommonModule],  // Import CommonModule for common Angular directives like ngIf
  templateUrl: './dashboard.component.html',  // Path to the HTML template
  styleUrls: ['./dashboard.component.css'],  // Path to the CSS file for this component
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements AfterViewInit {

  constructor(private router: Router, private elRef: ElementRef, private renderer: Renderer2) { }


  isActive = false;

  register() {
    this.isActive = !this.isActive;
  }

  login() {
    this.isActive = !this.isActive;
  }

  // Method to handle user logout and navigate back to the sign-in page
  onLogout(): void {
    // For now, just redirect to the sign-in page
    this.router.navigate(['/signin']);  // Navigate to the root route, which displays the sign-in page
  }


  ngAfterViewInit() {
    const input = this.elRef.nativeElement.querySelector('#permanent-placeholder');

    // Set the initial placeholder
    this.renderer.setAttribute(input, 'placeholder', 'Permanent Placeholder');

    // Listen for the input event
    this.renderer.listen(input, 'input', () => {
      // Only change the placeholder when the input is empty
      if (input.value === '') {
        this.renderer.setAttribute(input, 'placeholder', 'Permanent Placeholder');
      }
    });
  }
}
