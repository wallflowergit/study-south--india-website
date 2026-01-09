export interface Course {
  id?: number;
  stream: string;
  level: string;
  name: string;
  image?: string;           // Optional: Direct image URL or path
  image_url?: string;   
  description: string;
  created_at?: string;
  updated_at?: string;
}