import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { Footer } from 'primeng/api';
import { CourseService } from '../../../services/course';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-course-details',
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    SkeletonModule,
    
  ],
  templateUrl: './course-details.html',
  styleUrl: './course-details.scss',
  standalone: true
})
export class CourseDetails implements OnInit {
  course: Course | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = +params['id'];
      if (courseId) {
        this.loadCourse(courseId);
      }
    });
  }

  loadCourse(id: number): void {
    this.loading = true;
    this.error = '';

    this.courseService.getById(id).subscribe({
      next: (data) => {
        this.course = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load course details. Please try again later.';
        this.loading = false;
        console.error('Error loading course:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }

  getCourseImage(): string {
    return this.course?.image || 'assets/images/course-placeholder.png';
  }
}