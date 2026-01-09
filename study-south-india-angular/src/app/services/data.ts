import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class Data {
  private apiUrl = 'http://127.0.0.1:8000/api';

  async getCourses() {
    const res = await axios.get(`${this.apiUrl}/courses/`);
    return res.data;
  }

  async getStateData(state: string) {
    const res = await axios.get(`${this.apiUrl}/state/${state}/`);
    return res.data;
  }
}
