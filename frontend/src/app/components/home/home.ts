// src/app/pages/home/home.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CourseService } from '../../services/course';
import { InstitutionService } from '../../services/institution';
import { Course } from '../../models/course.model';
import { Institution } from '../../models/institution.model';
import { Footer } from "../footer/footer";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  feedback: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  popularCourses: Course[] = [];
  popularColleges: Institution[] = [];
  
  testimonials: Testimonial[] = [
    {
      name: 'Nasil',
      role: 'BCA Student',
      image: 'assets/images/testimonials/nasil.jpg',
      feedback: 'The guidance felt honest and pressure-free, which made a big difference for me'
    },
    {
      name: 'Nazia',
      role: 'BCA Student',
      image: 'assets/images/testimonials/nazia.jpg',
      feedback: 'The guidance felt honest and pressure-free, which made a big difference for me'
    },
    {
      name: 'Nihal',
      role: 'BCA Student',
      image: 'assets/images/testimonials/nihal.jpg',
      feedback: 'The guidance felt honest and pressure-free, which made a big difference for me'
    }
  ];

  constructor(
    private courseService: CourseService,
    private institutionService: InstitutionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPopularCourses();
    this.loadPopularColleges();
  }

  loadPopularCourses(): void {
    this.courseService.getAll().subscribe({
      next: (data) => {
        // Get first 3 courses as popular
        this.popularCourses = Array.isArray(data) ? data.slice(0, 3) : [];
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  loadPopularColleges(): void {
    this.institutionService.getAll().subscribe({
      next: (data) => {
        let institutionsArray: Institution[] = [];
        
        if (data && 'results' in data && Array.isArray(data.results)) {
          institutionsArray = data.results;
        } else if (Array.isArray(data)) {
          institutionsArray = data;
        }
        
        // Get first 3 colleges as popular
        this.popularColleges = institutionsArray.slice(0, 3);
      },
      error: (err) => {
        console.error('Error loading colleges:', err);
      }
    });
  }

  getCourseImage(course: Course): string {
    // Priority: image_url (computed) > image (direct) > placeholder
    return course.image_url || course.image || 'assets/images/placeholders/course.png';
  }

  getCollegeImage(college: Institution): string {
    // Priority: image_url (computed) > image (direct) > placeholder
    return college.image_url || college.image || 'assets/images/placeholders/institution.png';
  }

  getTestimonialImage(testimonial: Testimonial): string {
    return testimonial.image || 'assets/images/placeholders/avatar.png';
  }

  // Optional: Add error handling for images
  onImageError(event: Event, type: 'course' | 'institution' | 'testimonial'): void {
    const img = event.target as HTMLImageElement;
    const placeholders = {
      course: 'assets/images/placeholders/course.png',
      institution: 'assets/images/placeholders/institution.png',
      testimonial: 'assets/images/placeholders/avatar.png'
    };
    img.src = placeholders[type];
  }

    navigateToContact(): void {
      this.router.navigate(['/contact-us']);
    }
}