import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anytimeconverter.resence.in';
  
  const routes = [
    '',
    '/jpg-to-pdf',
    '/pdf-to-jpg',
    '/merge-pdf',
    '/split-pdf',
    '/word-to-pdf',
    '/pdf-to-text',
    '/images-to-ppt',
    '/image-converter',
    '/compress-file',
    '/privacy',
    '/terms',
    '/blog'
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'weekly' : route === '/privacy' || route === '/terms' ? 'yearly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/jpg-to-pdf' || route === '/pdf-to-jpg' || route === '/images-to-ppt' ? 0.9 : 0.8
  }));
}
