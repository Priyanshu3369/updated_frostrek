/**
 * SEO Schema/Structured Data for Frostrek
 * This file contains JSON-LD structured data to help Google understand Frostrek as a corporate technology brand
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.frostrek.com/#organization",
  "name": "Frostrek LLP",
  "alternateName": "Frostrek",
  "url": "https://www.frostrek.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.frostrek.com/logo.png",
    "width": 512,
    "height": 512
  },
  "description": "Frostrek is an ISO 9001:2015 and ISO 27001:2022 certified AI & technology company delivering intelligent systems, agentic workflows, and scalable software solutions.",
  "foundingDate": "2023",
  "slogan": "Intelligent systems built to scale with how your business thinks",
  "sameAs": [
    "https://www.linkedin.com/company/frostrek",
    "https://twitter.com/frostrek",
    "https://github.com/frostrek"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "sales",
      "email": "info@frostrek.com",
      "availableLanguage": ["English", "Hindi"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer support",
      "email": "support@frostrek.com",
      "availableLanguage": ["English", "Hindi"]
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressLocality": "India"
  },
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 10,
    "maxValue": 50
  },
  "knowsAbout": [
    "Artificial Intelligence",
    "Machine Learning",
    "AI Model Training",
    "Agentic Workflows",
    "Enterprise Software Development",
    "ServiceNow Implementation",
    "AI Agents",
    "Workflow Automation"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certification",
      "name": "ISO 9001:2015 Certified"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certification",
      "name": "ISO 27001:2022 Certified"
    }
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.frostrek.com/#website",
  "url": "https://www.frostrek.com",
  "name": "Frostrek - AI & Technology Solutions",
  "description": "Official website of Frostrek LLP - Enterprise AI solutions, agentic workflows, and scalable software development.",
  "publisher": {
    "@id": "https://www.frostrek.com/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.frostrek.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "en-US"
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.frostrek.com/#localbusiness",
  "name": "Frostrek LLP",
  "image": "https://www.frostrek.com/logo.png",
  "url": "https://www.frostrek.com",
  "telephone": "+91-XXXXXXXXXX",
  "email": "info@frostrek.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150",
    "bestRating": "5"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 20.5937,
      "longitude": 78.9629
    },
    "geoRadius": "5000"
  },
  "serviceType": [
    "AI Development",
    "Machine Learning Solutions",
    "Enterprise Software Development",
    "ServiceNow Implementation",
    "AI Consulting",
    "Workflow Automation"
  ]
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Frostrek Services",
  "description": "Comprehensive AI and technology services offered by Frostrek LLP",
  "itemListElement": [
    {
      "@type": "Service",
      "position": 1,
      "name": "AI Talent Acquisition & Deployment",
      "description": "Identify and place experienced AI professionals who align precisely with your project goals, technical needs, and delivery schedules.",
      "provider": { "@id": "https://www.frostrek.com/#organization" },
      "serviceType": "AI Staffing"
    },
    {
      "@type": "Service",
      "position": 2,
      "name": "AI Model Training & Performance Optimization",
      "description": "Improve AI model outcomes through expert-led training, fine-tuning, and real-world validation for consistent accuracy and impact.",
      "provider": { "@id": "https://www.frostrek.com/#organization" },
      "serviceType": "AI Training"
    },
    {
      "@type": "Service",
      "position": 3,
      "name": "Tailored AI Development Solutions",
      "description": "Create custom-built AI systems designed to solve complex business problems with scalable, dependable, and efficient architectures.",
      "provider": { "@id": "https://www.frostrek.com/#organization" },
      "serviceType": "AI Development"
    },
    {
      "@type": "Service",
      "position": 4,
      "name": "AI Agents & Autonomous Systems",
      "description": "Build intelligent AI agents capable of independent reasoning, decision-making, and task execution across operational workflows.",
      "provider": { "@id": "https://www.frostrek.com/#organization" },
      "serviceType": "AI Agents"
    },
    {
      "@type": "Service",
      "position": 5,
      "name": "AI-Powered Application & Platform Development",
      "description": "Build production-ready web and mobile applications, internal tools, dashboards, and platforms that seamlessly embed AI into everyday business operations.",
      "provider": { "@id": "https://www.frostrek.com/#organization" },
      "serviceType": "Software Development"
    },
    {
      "@type": "Service",
      "position": 6,
      "name": "Organizational Workflow Automation & Integration",
      "description": "Integrate AI into organizational processes to automate workflows, enhance efficiency, and enable seamless coordination across systems and teams.",
      "provider": { "@id": "https://www.frostrek.com/#organization" },
      "serviceType": "Workflow Automation"
    },
    {
      "@type": "Service",
      "position": 7,
      "name": "ServiceNow Expertise",
      "description": "ServiceNow-focused implementation and managed services support through CSA and CAD certified professionals.",
      "provider": { "@id": "https://www.frostrek.com/#organization" },
      "serviceType": "ServiceNow"
    }
  ]
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does Frostrek offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Frostrek offers comprehensive AI and technology services including AI Talent Acquisition, AI Model Training & Optimization, Custom AI Development, AI Agents & Autonomous Systems, AI-Powered Application Development, Workflow Automation, and ServiceNow Implementation."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide custom AI model development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Frostrek specializes in creating custom-built AI systems designed to solve complex business problems with scalable, dependable, and efficient architectures tailored to your specific needs."
      }
    },
    {
      "@type": "Question",
      "name": "Can Frostrek integrate AI into existing systems?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Frostrek integrates AI into organizational processes to automate workflows, enhance efficiency, and enable seamless coordination across systems and teams."
      }
    },
    {
      "@type": "Question",
      "name": "How do I collaborate with Frostrek?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can get started by contacting us through our website contact form or emailing info@frostrek.com. We'll arrange a tailored discovery session to align on your goals and provide a roadmap for implementation."
      }
    },
    {
      "@type": "Question",
      "name": "Is Frostrek ISO certified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Frostrek is ISO 9001:2015 and ISO 27001:2022 certified, demonstrating our commitment to quality management and information security."
      }
    }
  ]
};

// Generate breadcrumb schema for any page
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Combine all schemas for homepage
export const getHomePageSchemas = () => [
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  servicesSchema,
  faqSchema
];

// Helper to create script tag content
export const schemaToScriptContent = (schema: object | object[]) => 
  JSON.stringify(Array.isArray(schema) ? schema : schema, null, 0);
