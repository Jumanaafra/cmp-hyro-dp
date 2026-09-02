/**
 * HYROVISION — Centralized Technologies Data
 * SOURCE OF TRUTH for all technology stack information.
 * Used by AI chatbot and technology-related components.
 *
 * All data verified from spec.md Section 16.
 * DO NOT add unsupported or unverified technologies.
 */

export const technologies = {
  Frontend: [
    "React.js",
    "Next.js",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
  ],
  Backend: ["Node.js", "Express.js", "Python"],
  Database: [
    "MongoDB",
    "PostgreSQL",
    "Supabase",
    "SQLite",
    "Firebase Firestore",
    "Mongoose",
  ],
  AI: ["OpenAI", "Gemini", "LangGraph", "MCP"],
  Automation: ["n8n", "Make.com"],
  Cloud: ["AWS", "Vercel", "Netlify", "Render", "Firebase"],
  Creative: ["GSAP", "Framer Motion", "Canvas"],
};

/** Flat list of all technologies for search */
export const allTechnologies = Object.values(technologies).flat();

/** Category lookup: given a tech name, return its category */
export function getTechCategory(techName) {
  for (const [category, techs] of Object.entries(technologies)) {
    if (
      techs.some((t) => t.toLowerCase() === techName.toLowerCase())
    ) {
      return category;
    }
  }
  return null;
}
