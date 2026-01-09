import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, FormsModule, Footer],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs {
  formData = {
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  };

  interests = [
    'University Admission',
    'Career Counseling',
    'Test Preparation',
    'Scholarship Guidance',
    'Other'
  ];

  // Replace with your WhatsApp number (include country code, no + or spaces)
  whatsappNumber = '918606124021'; // Example: '919876543210' for India

  submitForm() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.sendToWhatsApp();
      this.resetForm();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  sendToWhatsApp() {
    // Format the message with emojis
    let message = `New Inquiry from Website\n`;
    message += `━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Name :  ${this.formData.name}\n`;
    message += `email id : ${this.formData.email}\n`;
    
    if (this.formData.phone) {
      message += `phone number : ${this.formData.phone}\n`;
    }
    
    if (this.formData.interest) {
      message += `interest : ${this.formData.interest}\n`;
    }
    
    message += `\n💬 Message : \n${this.formData.message}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      interest: '',
      message: ''
    };
  }
}