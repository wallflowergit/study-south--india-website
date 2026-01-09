// app.config.ts

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

// 1. Import the MessageService from the PrimeNG API
import { ConfirmationService, MessageService } from 'primeng/api';
// 2. Import the animations provider
import { provideAnimations } from '@angular/platform-browser/animations'; // Eager loading
// OR: import { **provideAnimationsAsync** } from '@angular/platform-browser/animations/async'; // Lazy loading for better performance

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // Always scroll to top
        anchorScrolling: 'enabled'
      })
    ),
    ConfirmationService,
    provideHttpClient(),
 
    // 3. Add the new providers here
    provideAnimations(), // Or provideAnimationsAsync()
MessageService,      // This resolves the 'No provider for _MessageService' error
  ]
};