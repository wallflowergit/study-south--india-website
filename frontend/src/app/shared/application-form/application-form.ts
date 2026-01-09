import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './application-form.html',
  styleUrl: './application-form.scss',
})
export class ApplicationForm {
  @Output() close = new EventEmitter<void>();

  formData = {
    studentName: '',
    studentNumber: '',
    studentEmail: '',
    course: '',
    college: '',
    fatherName: '',
    fatherOccupation: '',
    fatherMobile: '',
    motherName: '',
    motherMobile: '',
    address: '',
    dob: '',
    aadhaar: '',
    nationality: '',
    religion: '',
    community: '',
    caste: '',
    bloodGroup: '',
    school12: '',
    board12: '',
    percentage12: '',
    passoutYear: '',
    course12: '',
  };

  submitForm() {
    console.log('Form Data:', this.formData);
    alert('Application submitted successfully!');
    this.close.emit();
  }

  closePopup() {
    this.close.emit();
  }
}
