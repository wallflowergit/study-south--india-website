import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { filter } from 'rxjs/operators';
import { AuthService, UserData } from '../../services/auth-service';
import { MenuItem } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ApplicationForm } from "../../shared/application-form/application-form";

interface TabItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  imports: [CommonModule,
    TabsModule,
    ButtonModule,
    RouterLink,
    AvatarModule,
    MenuModule,
    SelectModule,
    FormsModule,
    TieredMenuModule, ApplicationForm]
})
export class Header implements OnInit {
  items: TabItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      route: '/'
    },
    {
      label: 'Institutions',
      icon: 'pi pi-building',
      route: '/institutions'
    },
    {
      label: 'Courses',
      icon: 'pi pi-book',
      route: '/courses'
    },
    {
      label: 'About',
      icon: 'pi pi-info-circle',
      route: '/about'
    },
    {
      label: 'Contact Us',
      icon: 'pi pi-envelope',
      route: '/contact-us'
    }
  ];

  userMenuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => this.navigateToProfile()
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  selectedState: string = '';
  showStateDropdown: boolean = false;
stateMenuItems: MenuItem[] = [
  {
    label: 'All States',
    icon: 'pi pi-map-marker',
    command: () => this.selectStateAndNavigate('')
  },
  {
    label: 'Karnataka',
    icon: 'pi pi-map-marker',
    command: () => this.selectStateAndNavigate('Karnataka')
  },
  {
    label: 'Tamil Nadu',
    icon: 'pi pi-map-marker',
    command: () => this.selectStateAndNavigate('Tamil Nadu')
  },
  {
    label: 'Kerala',
    icon: 'pi pi-map-marker',
    command: () => this.selectStateAndNavigate('Kerala')
  },
  {
    label: 'Andhra Pradesh',
    icon: 'pi pi-map-marker',
    command: () => this.selectStateAndNavigate('Andhra Pradesh')
  }
];

  activeRoute: string = '/';
  mobileMenuOpen: boolean = false;

  showApplicationForm = false;

  openApplicationForm() {
   window.open(
    'https://forms.gle/YOUR_GOOGLE_FORM_LINK',
    '_blank'
  );
}

// openApplicationForm() {
//   this.showApplicationForm = true;
// }

closeApplicationForm() {
  this.showApplicationForm = false;
}

  
  // User state
  isLoggedIn: boolean = false;
  currentUser: UserData | null = null;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    // Set initial active route
    this.activeRoute = this.router.url;

    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRoute = event.urlAfterRedirects;
        this.closeMobileMenu();
      });

    // Check auth status
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.isLoggedIn = this.auth.isAuthenticated();
    
    if (this.isLoggedIn) {
      this.currentUser = this.auth.getCurrentUser();
    }

    // Subscribe to auth changes
    this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }
onStateChange(): void {
  // Emit the selected state to institution list component
  // Using query params for communication
  this.router.navigate([], {
    relativeTo: this.router.routerState.root,
    queryParams: { state: this.selectedState || null },
    queryParamsHandling: 'merge'
  });
}

selectStateAndNavigate(state: string): void {
  this.selectedState = state;
  this.showStateDropdown = false;
  
  // Navigate to institutions with state filter
  this.router.navigate(['/institutions'], {
    queryParams: { state: state || null },
    queryParamsHandling: 'merge'
  });
}
  getDisplayName(): string {
    if (!this.currentUser) return 'User';
    
    if (this.currentUser.first_name) {
      return this.currentUser.first_name;
    }
    
    if (this.currentUser.name) {
      const firstName = this.currentUser.name.split(' ')[0];
      return firstName;
    }
    
    return this.currentUser.username || this.currentUser.email.split('@')[0];
  }

  getInitials(): string {
    if (!this.currentUser) return 'U';
    
    if (this.currentUser.first_name && this.currentUser.last_name) {
      return `${this.currentUser.first_name.charAt(0)}${this.currentUser.last_name.charAt(0)}`.toUpperCase();
    }
    
    if (this.currentUser.name) {
      const names = this.currentUser.name.split(' ');
      return names.length > 1 
        ? `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase()
        : names[0].charAt(0).toUpperCase();
    }
    
    return this.currentUser.email.charAt(0).toUpperCase();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/login']);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}