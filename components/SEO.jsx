import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://hyrovision.com";
const DEFAULT_IMAGE = `${BASE_URL}/assets/hyro-logo-dark.png`;
const LOGO_MARK = `${BASE_URL}/assets/hyro-logo-mark.png`;

function setMetaTag(selector, attrName, attrValue, content) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonicalLink(href) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function setJsonLdScript(schemaObj) {
  const existing = document.getElementById("json-ld-schema");
  if (existing) existing.remove();

  if (!schemaObj) return;

  const script = document.createElement("script");
  script.id = "json-ld-schema";
  script.type = "application/ld+json";
  script.text = JSON.stringify(schemaObj);
  document.head.appendChild(script);
}

export default function SEO({
  title = "Intelligent Digital Experiences",
  description = "Hyro Vision builds high-performance digital products, AI-powered systems and intelligent automation solutions for modern businesses.",
  ogType = "website",
  image = DEFAULT_IMAGE,
  schema = null,
  breadcrumbs = null,
}) {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}${location.pathname}`;
  const fullTitle = title.includes("Hyro Vision")
    ? title
    : `${title} | Hyro Vision`;

  useEffect(() => {
    // 1. Page Title
    document.title = fullTitle;

    // 2. Meta description
    setMetaTag('meta[name="description"]', "name", "description", description);

    // 3. Canonical Link
    setCanonicalLink(canonicalUrl);

    // 4. OpenGraph
    setMetaTag('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMetaTag('meta[property="og:description"]', "property", "og:description", description);
    setMetaTag('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMetaTag('meta[property="og:type"]', "property", "og:type", ogType);
    setMetaTag('meta[property="og:image"]', "property", "og:image", image);
    setMetaTag('meta[property="og:site_name"]', "property", "og:site_name", "Hyro Vision");
    setMetaTag('meta[property="og:locale"]', "property", "og:locale", "en_US");

    // 5. Twitter Card
    setMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", image);

    // 6. JSON-LD Graph Generation
    const organizationSchema = {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Hyro Vision",
      legalName: "Hyro Vision",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_MARK,
      },
      image: DEFAULT_IMAGE,
      description:
        "Hyro Vision builds high-performance digital products, AI-powered systems and intelligent automation solutions for modern businesses.",
      email: "info@hyrovision.com",
      telephone: "+919360294463",
      sameAs: [
        "https://www.linkedin.com/company/hyrovision/",
        "https://www.instagram.com/hyro_vision?stkn=NnlmdjM1cnd2dmkx",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+919360294463",
        contactType: "customer service",
        email: "info@hyrovision.com",
        availableLanguage: ["English"],
      },
    };

    const webSiteSchema = {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "Hyro Vision",
      url: BASE_URL,
      description: "Technology, AI & Digital Solutions",
      publisher: { "@id": `${BASE_URL}/#organization` },
    };

    const webPageSchema = {
      "@type": ogType === "article" ? "TechArticle" : "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: fullTitle,
      description: description,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-US",
    };

    const graphItems = [organizationSchema, webSiteSchema, webPageSchema];

    // Optional BreadcrumbList schema
    if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      graphItems.push({
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.name,
          item: crumb.url || `${BASE_URL}${crumb.path ? (crumb.path.startsWith("/") ? "" : "/") + crumb.path : ""}`,
        })),
      });
    }

    // Append custom or page-specific schema
    if (schema) {
      if (Array.isArray(schema)) {
        schema.forEach((s) => {
          const item = { ...s };
          delete item["@context"];
          graphItems.push(item);
        });
      } else if (schema["@graph"] && Array.isArray(schema["@graph"])) {
        schema["@graph"].forEach((s) => {
          const item = { ...s };
          delete item["@context"];
          graphItems.push(item);
        });
      } else {
        const item = { ...schema };
        delete item["@context"];
        graphItems.push(item);
      }
    }

    const unifiedGraph = {
      "@context": "https://schema.org",
      "@graph": graphItems,
    };

    setJsonLdScript(unifiedGraph);

    return () => {
      const script = document.getElementById("json-ld-schema");
      if (script) script.remove();
    };
  }, [fullTitle, description, canonicalUrl, ogType, image, schema, breadcrumbs]);

  return null;
}
