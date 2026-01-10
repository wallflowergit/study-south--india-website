import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  /**
   * Get the best available image URL from an object
   * Prioritizes image_url over image, handles various edge cases
   */
  getImageUrl(item: any, placeholderType: 'course' | 'institution' = 'course'): string {
    const placeholder = placeholderType === 'course' 
      ? 'assets/images/course-placeholder.png' 
      : 'assets/images/institution-placeholder.png';
    
    // Priority: image_url > image > placeholder
    const imageUrl = item?.image_url || item?.image;
    
    if (!imageUrl || imageUrl.trim() === '') {
      return placeholder;
    }
    
    // If it's already a full URL, return it
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative path, it might be from your backend
    // Adjust this based on your backend URL structure
    return imageUrl;
  }
  
  /**
   * Handle image load errors
   */
  handleImageError(event: Event, placeholderType: 'course' | 'institution' = 'course'): void {
    const img = event.target as HTMLImageElement;
    const placeholder = placeholderType === 'course' 
      ? 'assets/images/course-placeholder.png' 
      : 'assets/images/institution-placeholder.png';
    
    // Prevent infinite loop if placeholder also fails
    if (!img.src.includes('placeholder')) {
      img.src = placeholder;
    }
  }
  
  /**
   * Preload an image to check if it's valid
   */
  preloadImage(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!url) {
        resolve(false);
        return;
      }
      
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      
      // Timeout after 5 seconds
      setTimeout(() => resolve(false), 5000);
    });
  }
}