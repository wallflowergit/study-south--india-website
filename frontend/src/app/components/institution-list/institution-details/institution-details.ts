import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { Footer } from 'primeng/api';
import { InstitutionService } from '../../../services/institution';
import { Institution } from '../../../models/institution.model';

@Component({
  selector: 'app-institution-details',
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    SkeletonModule,

  ],
  templateUrl: './institution-details.html',
  styleUrl: './institution-details.scss',
  standalone: true
})
export class InstitutionDetails implements OnInit {
  institution: Institution | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private institutionService: InstitutionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const institutionId = +params['id'];
      if (institutionId) {
        this.loadInstitution(institutionId);
      }
    });
  }

  loadInstitution(id: number): void {
    this.loading = true;
    this.error = '';

    this.institutionService.getById(id).subscribe({
      next: (data) => {
        this.institution = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load institution details. Please try again later.';
        this.loading = false;
        console.error('Error loading institution:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/institutions']);
  }

  getInstitutionImage(): string {
    return this.institution?.image || 'assets/images/institution-placeholder.png';
  }
}