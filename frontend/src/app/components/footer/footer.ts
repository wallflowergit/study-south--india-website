// src/app/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface FooterLink {
  label: string;
  route: string;
}

interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear = new Date().getFullYear();

  footerLinks: FooterLink[] = [
    { label: 'Home', route: '/home' },
    { label: 'Colleges', route: '/colleges' },
    { label: 'Courses', route: '/courses' },
    { label: 'About Us', route: '/about' }
  ];

  socialLinks: SocialLink[] = [
    {
      icon: 'pi pi-facebook',
      url: 'https://linkedin.com/company/study-south-india',
      label: 'LinkedIn'
    },
    {
      icon: 'pi pi-instagram',
      url: 'https://www.instagram.com/study_south_india?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      label: 'Instagram'
    },
    {
      icon: 'pi pi-youtube',
      url: 'https://youtube.com/@studysouthindia',
      label: 'YouTube'
    }
  ];

  // Contact information (optional)
  contactInfo = {
    phone: '+91 XXXXX XXXXX',
    email: 'info@studysouthindia.com',
    // address: 'Bangalore, Karnataka, India'
  };

  constructor() {}

  // Method to handle social link clicks with analytics (optional)
  onSocialClick(platform: string): void {
    console.log(`${platform} clicked`);
    // Add analytics tracking here if needed
  }
}