import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstitutionService } from '../../services/institution';
import { Institution } from '../../models/institution.model';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Footer } from "../footer/footer";
import { RouterLink } from '@angular/router';

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Institution[];
}

@Component({
  selector: 'app-institution-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SkeletonModule,
    Footer,
    RouterLink
],
  templateUrl: './institution-list.html',
  styleUrls: ['./institution-list.scss']
})
export class InstitutionList implements OnInit {
  institutions: Institution[] = [];
  filteredInstitutions: Institution[] = [];
  paginatedInstitutions: Institution[] = [];
  searchTerm: string = '';
  selectedState: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;

  isLoading: boolean = false;

  constructor(private institutionService: InstitutionService) { }

  ngOnInit(): void {
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.isLoading = true;

    this.institutionService.getAll().subscribe({
      next: (data: Institution[] | PaginatedResponse) => {
        let institutionsArray: Institution[] = [];

        if (data && 'results' in data && Array.isArray(data.results)) {
          institutionsArray = data.results;
        } else if (Array.isArray(data)) {
          institutionsArray = data;
        } else {
          console.warn("Unexpected API response format:", data);
          institutionsArray = [];
        }

        this.institutions = institutionsArray;
        this.filteredInstitutions = [...institutionsArray];
        this.currentPage = 1;
        this.updatePagination();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading institutions:', err);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const searchLower = this.searchTerm.toLowerCase().trim();

    if (searchLower === '') {
      this.filteredInstitutions = [...this.institutions];
    } else {
      this.filteredInstitutions = this.institutions.filter(institution =>
        institution.name.toLowerCase().includes(searchLower) ||
        institution.location.toLowerCase().includes(searchLower) ||
        institution.state.toLowerCase().includes(searchLower)
      );
    }

    this.currentPage = 1;
    this.updatePagination();
    this.applyFilters();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredInstitutions.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedInstitutions = this.filteredInstitutions.slice(start, end);
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

    if (this.totalPages <= 7) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (this.currentPage > 3) {
        pages.push('...');
      }

      for (let i = Math.max(2, this.currentPage - 1); i <= Math.min(this.totalPages - 1, this.currentPage + 1); i++) {
        pages.push(i);
      }

      if (this.currentPage < this.totalPages - 2) {
        pages.push('...');
      }

      pages.push(this.totalPages);
    }

    return pages;
  }

  getPaginationInfo(): string {
    if (this.filteredInstitutions.length === 0) {
      return 'No institutions found';
    }
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredInstitutions.length);
    return `Showing ${start}-${end} of ${this.filteredInstitutions.length} institutions`;
  }

  getInstitutionImage(institution: Institution): string {
    return institution.image || 'assets/images/institution-placeholder.png';
  }

  filterByState(state: string): void {
  this.selectedState = state;
  this.applyFilters();
}

applyFilters(): void {
  const searchLower = this.searchTerm.toLowerCase().trim();
  
  this.filteredInstitutions = this.institutions.filter(institution => {
    const matchesSearch = searchLower === '' || 
      institution.name.toLowerCase().includes(searchLower) ||
      institution.location.toLowerCase().includes(searchLower) ||
      institution.state.toLowerCase().includes(searchLower);
    
    const matchesState = this.selectedState === '' || 
      institution.state === this.selectedState;
    
    return matchesSearch && matchesState;
  });

  this.currentPage = 1;
  this.updatePagination();
}
}