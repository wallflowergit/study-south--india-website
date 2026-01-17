import { Component } from '@angular/core';
import { Footer } from "../footer/footer";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [Footer, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  stats = [
    { value: '5000+', label: 'Students Guided' },
    { value: '200+', label: 'Partner Colleges' },
    { value: '50+', label: 'Courses Covered' },
    { value: '96%', label: 'Success Rate' }
  ];

  values = [
    {
      icon: '🎯',
      title: 'Student-First Approach',
      description: 'Your dreams and career goals are at the center of everything we do. We provide personalized guidance tailored to your unique aspirations.'
    },
    {
      icon: '🤝',
      title: 'Transparency & Trust',
      description: 'We believe in honest advice with no hidden agendas. Our recommendations are based solely on what\'s best for your future.'
    },
    {
      icon: '💡',
      title: 'Expert Guidance',
      description: 'Our team of experienced counselors brings years of industry knowledge to help you make informed decisions.'
    },
    {
      icon: '🌟',
      title: 'End-to-End Support',
      description: 'From course selection to admission completion, we\'re with you every step of the way in your educational journey.'
    }
  ];

  team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Chief Education Counselor',
      experience: '15+ years in educational counseling',
      image: 'assets/team/member1.jpg'
    },
    {
      name: 'Priya Sharma',
      role: 'Senior Counselor - Engineering',
      experience: '10+ years in technical education',
      image: 'assets/team/member2.jpg'
    },
    {
      name: 'Arun Patel',
      role: 'International Education Specialist',
      experience: '12+ years in abroad education',
      image: 'assets/team/member3.jpg'
    },
    {
      name: 'Meera Reddy',
      role: 'Medical Education Counselor',
      experience: '8+ years in medical admissions',
      image: 'assets/team/member4.jpg'
    }
  ];

  testimonials = [
    {
      name: 'Aditya Krishnan',
      course: 'B.Tech Computer Science',
      college: 'VIT University',
      text: 'Study South India helped me find the perfect college that matched both my academic goals and budget. The counselors were patient and guided me through the entire admission process.',
      image: 'assets/testimonials/student1.jpg'
    },
    {
      name: 'Sneha Menon',
      course: 'MBBS',
      college: 'Kasturba Medical College',
      text: 'I was confused about which medical college to choose. The team at Study South India provided detailed comparisons and helped me make an informed decision. Forever grateful!',
      image: 'assets/testimonials/student2.jpg'
    },
    {
      name: 'Karthik Iyer',
      course: 'MBA',
      college: 'IIM Bangalore',
      text: 'The personalized guidance I received was exceptional. They understood my career aspirations and recommended colleges that aligned perfectly with my goals.',
      image: 'assets/testimonials/student3.jpg'
    }
  ];

  milestones = [
    { year: '2015', event: 'Study South India founded with a vision to simplify college admissions' },
    { year: '2017', event: 'Expanded to cover 100+ colleges across South India' },
    { year: '2019', event: 'Launched international education counseling services' },
    { year: '2021', event: 'Reached milestone of 3000+ successful student placements' },
    { year: '2023', event: 'Partnered with 200+ institutions and introduced digital counseling' },
    { year: '2024', event: 'Guided 5000+ students and achieved 95% success rate' }
  ];

  scrollToConsultation(): void {
    // This method would trigger the consultation modal or scroll to form
    console.log('Opening consultation modal...');
  }
}