import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  /**
   * Navigate to a specific route with optional parameters
   * @param route - The route to navigate to
   * @param params - Optional route parameters
   */
  navigateTo(route: string, params?: any): void {
    if (params) {
      this.router.navigate([route], { queryParams: params });
    } else {
      this.router.navigate([route]);
    }
  }

  /**
   * Navigate back to the previous page
   */
  goBack(): void {
    window.history.back();
  }

  /**
   * Navigate to home page
   */
  goHome(): void {
    this.router.navigate(['/home']);
  }

  /**
   * Navigate to login page
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navigate to register page
   */
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  /**
   * Navigate to profile page
   */
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Navigate to incidents page
   */
  goToIncidents(): void {
    this.router.navigate(['/incidents']);
  }

  /**
   * Navigate to report incident page
   */
  goToReportIncident(): void {
    this.router.navigate(['/report-incident']);
  }

  /**
   * Navigate to emergency history page
   */
  goToEmergencyHistory(): void {
    this.router.navigate(['/emergency-history']);
  }

  /**
   * Navigate to settings page
   */
  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  /**
   * Get current route
   */
  getCurrentRoute(): string {
    return this.router.url;
  }

  /**
   * Check if current route matches the given route
   * @param route - The route to check
   */
  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
}
