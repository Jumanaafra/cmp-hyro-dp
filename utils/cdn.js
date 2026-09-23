/**
 * CDN Image Optimization Utilities
 * Generates responsive, compressed CDN image URLs with automatic format (AVIF/WebP)
 * and dimension scaling for Unsplash / Imgix edge networks.
 */

/**
 * Returns an edge-optimized CDN URL with tailored width and compression.
 * @param {string} url - Original image URL
 * @param {number} width - Target display width in pixels
 * @param {number} quality - Compression quality (default 75)
 * @returns {string} Optimized CDN URL
 */
export function getCdnImageUrl(url, width = 640, quality = 75) {
  if (!url || typeof url !== "string") return "";

  // If Unsplash CDN image
  if (url.includes("images.unsplash.com")) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set("auto", "format");
      parsed.searchParams.set("fit", "crop");
      parsed.searchParams.set("w", String(width));
      parsed.searchParams.set("q", String(quality));
      return parsed.toString();
    } catch {
      return url;
    }
  }

  return url;
}

/**
 * Generates a responsive srcset string for high-DPI displays and varying viewports.
 * @param {string} url - Original image URL
 * @param {number[]} widths - Array of target widths (e.g., [360, 640, 1080])
 * @returns {string} srcset string
 */
export function getCdnImageSrcSet(url, widths = [360, 640, 960]) {
  if (!url || !url.includes("images.unsplash.com")) return "";
  return widths
    .map((w) => `${getCdnImageUrl(url, w)} ${w}w`)
    .join(", ");
}
