import { Component, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
    imports: [ CommonModule,],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(private dataService: Data) {}

  async ngOnInit() {
    this.courses = await this.dataService.getCourses();
  }
}
