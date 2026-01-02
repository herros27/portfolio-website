import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'GPTBot',
                disallow: ['/'],
            },
            {
                userAgent: 'Google-Extended',
                disallow: ['/'],
            },
            {
                userAgent: 'ClaudeBot',
                disallow: ['/'],
            },
            {
                userAgent: 'CCBot',
                disallow: ['/'],
            },
            {
                userAgent: 'BingAI',
                disallow: ['/'],
            },
            {
                userAgent: '*',
                allow: ['/'],
            },
        ],
        sitemap: 'https://kemz.my.id/sitemap.xml',
    }
}
