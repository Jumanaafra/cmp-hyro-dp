import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://hyrovision.com";
const DEFAULT_IMAGE = `${BASE_URL}/assets/hyro-logo-dark.png`;

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

    // 5. Twitter Card
    setMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", image);

    // 6. JSON-LD Structured Data
    setJsonLdScript(schema);

    return () => {
      const script = document.getElementById("json-ld-schema");
      if (script) script.remove();
    };
  }, [fullTitle, description, canonicalUrl, ogType, image, schema]);

  return null;
}
