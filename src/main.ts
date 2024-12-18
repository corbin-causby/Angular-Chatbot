import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app/app.routes';  // Import your route configuration

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(appRoutes)), // Configure routing with appRoutes
  ],
}).catch(err => console.error(err));
