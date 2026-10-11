import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/assessment', '/pricing'],
        disallow: [
          '/hasil/',
          '/roadmap',
          '/misi',
          '/kegiatan',
          '/passport',
          '/api/',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://www.gapless.id/sitemap.xml',
    host: 'https://www.gapless.id',
  };
}
