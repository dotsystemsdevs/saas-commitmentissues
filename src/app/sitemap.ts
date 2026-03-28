import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://commitmentissues.dev', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://commitmentissues.dev/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}
