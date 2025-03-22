import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.cricbrains.in/',
      lastModified: new Date('2025-03-16T01:29:29+00:00'),
      changeFrequency: 'monthly',
      priority: 1.00,
    },
    
    
  ];
}

// Ensure static generation
export const dynamic = 'force-static';
export const revalidate = false;