// src/app/models/institution.model.ts
export interface Institution {
  id: number;
  name: string;
  location: string;
  state: string;
  image?: string;           // Optional: Direct image URL or path
  image_url?: string;       // Optional: Computed from backend
  created_at: string;
  updated_at: string;
}