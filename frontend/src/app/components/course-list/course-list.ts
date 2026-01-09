import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Footer } from "../footer/footer";
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [
    Footer, 
    CommonModule, 
    FormsModule, 
    RouterModule,
    ButtonModule,
    InputTextModule,
    SkeletonModule
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
  standalone: true,
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  paginatedCourses: Course[] = [];
  loading: boolean = false;
  error: string = '';
  searchQuery: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 1;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.error = '';
    
    this.courseService.getAll().subscribe({
      next: (data) => {
        this.courses = data;
        this.updatePagination();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load courses. Please try again later.';
        this.loading = false;
        console.error('Error loading courses:', err);
      }
    });
  }

  searchCourses(): void {
    if (!this.searchQuery.trim()) {
      this.loadCourses();
      return;
    }

    this.loading = true;
    this.error = '';
    this.currentPage = 1;

    this.courseService.search(this.searchQuery).subscribe({
      next: (data) => {
        this.courses = data;
        this.updatePagination();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Search failed. Please try again.';
        this.loading = false;
        console.error('Error searching courses:', err);
      }
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.courses.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCourses = this.courses.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(this.totalPages);
      }
    }

    return pages;
  }

  getPaginationInfo(): string {
    if (this.courses.length === 0) return 'No courses found';
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.courses.length);
    return `Showing ${start}-${end} of ${this.courses.length} courses`;
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.delete(id).subscribe({
        next: () => {
          this.courses = this.courses.filter(c => c.id !== id);
          this.updatePagination();
        },
        error: (err) => {
          this.error = 'Failed to delete course.';
          console.error('Error deleting course:', err);
        }
      });
    }
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }

  getCourseImage(course: Course): string {
    return course.image || 'assets/images/course-placeholder.png';
  }
}