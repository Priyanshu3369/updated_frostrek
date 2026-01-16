import { useEffect } from 'react';
import { 
  getHomePageSchemas, 
  generateBreadcrumbSchema,
  schemaToScriptContent 
} from "../lib/seo-schema";

/**
 * SEOHead Component
 * Injects structured data and manages meta tags for optimal Google visibility
 * Use this component on each page to ensure proper SEO setup
 */
const SEOHead = ({
  title = 'Frostrek - AI & Technology Solutions | Enterprise AI Development',
  description = 'Frostrek is an ISO 9001:2015 and ISO 27001:2022 certified AI & technology company delivering intelligent systems, agentic workflows, and scalable software solutions for enterprise businesses.',
  canonicalUrl = 'https://www.frostrek.com',
  ogImage = 'https://www.frostrek.com/og-image.png',
  ogType = 'website',
  breadcrumbs,
  schemas,
  noindex = false,
}) => {

  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const setMetaTag = (name, content, isProperty = false) => {
      const attrName = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attrName}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Helper to update or create link tag
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);

      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // Basic SEO meta tags
    setMetaTag('description', description);
    setMetaTag(
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // Canonical URL
    setLinkTag('canonical', canonicalUrl);

    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:site_name', 'Frostrek', true);
    setMetaTag('og:locale', 'en_US', true);

    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);
    setMetaTag('twitter:site', '@frostrek');
    setMetaTag('twitter:creator', '@frostrek');

    // Additional SEO tags
    setMetaTag('author', 'Frostrek LLP');
    setMetaTag('publisher', 'Frostrek LLP');
    setMetaTag('copyright', `© ${new Date().getFullYear()} Frostrek LLP. All rights reserved.`);
    setMetaTag('language', 'English');
    setMetaTag('revisit-after', '7 days');
    setMetaTag('distribution', 'global');
    setMetaTag('rating', 'general');

    // Geo tags
    setMetaTag('geo.region', 'IN');
    setMetaTag('geo.placename', 'India');

    // Remove existing JSON-LD
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Prepare schemas
    const allSchemas = schemas || getHomePageSchemas();

    if (breadcrumbs && breadcrumbs.length > 0) {
      allSchemas.push(generateBreadcrumbSchema(breadcrumbs));
    }

    // Inject JSON-LD
    allSchemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = schemaToScriptContent(schema);
      document.head.appendChild(script);
    });

    // Cleanup
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };

  }, [title, description, canonicalUrl, ogImage, ogType, breadcrumbs, schemas, noindex]);

  return null;
};

export default SEOHead;
