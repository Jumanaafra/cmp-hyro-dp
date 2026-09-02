import { company } from "../data/company.js";
import { services } from "../data/services.js";
import { projects } from "../data/projects.js";
import { technologies } from "../data/technologies.js";
import { capabilities } from "../data/capabilities.js";
import { processSteps } from "../data/process.js";

/**
 * Build Knowledge Base Chunks for RAG Retrieval
 */
const KNOWLEDGE_CHUNKS = [
  {
    id: "company-core",
    type: "company",
    keywords: ["hyrovision", "company", "who", "about", "positioning", "contact", "email", "whatsapp", "location", "start", "hire"],
    content: `COMPANY IDENTITY & MISSION:
Name: ${company.name}
Tagline: ${company.tagline}
Positioning: ${company.positioning}
Description: ${company.description}
Core Capabilities: ${company.capabilities.join(", ")}
Contact Email: ${company.contact.email}
WhatsApp: ${company.contact.whatsappNumber}
Website: ${company.contact.website}
How to Start a Project: ${company.howToStart}`,
  },
  ...services.map((s) => ({
    id: `service-${s.id}`,
    type: "service",
    keywords: [
      s.title.toLowerCase(),
      ...s.capabilities.map((c) => c.toLowerCase()),
      ...s.useCases.map((u) => u.toLowerCase()),
      "service",
      "offer",
      "build",
    ],
    content: `SERVICE: ${s.title}
Description: ${s.description}
Key Capabilities: ${s.capabilities.join(", ")}
Use Cases: ${s.useCases.join("; ")}`,
  })),
  ...projects.map((p) => ({
    id: `project-${p.id}`,
    type: "project",
    keywords: [
      p.title.toLowerCase(),
      p.category.toLowerCase(),
      ...p.technologies.map((t) => t.toLowerCase()),
      "project",
      "portfolio",
      "case study",
      "work",
    ],
    content: `PROJECT: ${p.title} (${p.category})
Description: ${p.description}
Technologies: ${p.technologies.join(", ")}
Live URL: ${p.liveUrl || "Available on request"}`,
  })),
  {
    id: "technologies-all",
    type: "technologies",
    keywords: ["technology", "tech stack", "languages", "frameworks", "tools", "database", "ai", "cloud", "frontend", "backend"],
    content: `TECHNOLOGY STACK:
${Object.entries(technologies)
  .map(([cat, techs]) => `${cat}: ${techs.join(", ")}`)
  .join("\n")}`,
  },
  {
    id: "capabilities-all",
    type: "capabilities",
    keywords: ["capabilities", "expertise", "specialization", "skills"],
    content: `ENGINEERING CAPABILITIES:
${capabilities.map((c) => `- ${c.title}: ${c.description} (Key tools: ${c.tags.join(", ")})`).join("\n")}`,
  },
  {
    id: "process-all",
    type: "process",
    keywords: ["process", "workflow", "methodology", "steps", "how do you work", "phases"],
    content: `ENGINEERING PROCESS (8 PHASES):
${processSteps.map((p) => `${p.step}. ${p.title}: ${p.description} (Output: ${p.expectedOutput})`).join("\n")}`,
  },
];

/**
 * Score relevance of knowledge chunks to query
 */
function retrieveRelevantContext(queryText) {
  const q = queryText.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);

  const scored = KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    // Direct chunk content search
    const contentLower = chunk.content.toLowerCase();
    if (contentLower.includes(q)) score += 10;

    // Keyword matching
    for (const kw of chunk.keywords) {
      if (q.includes(kw)) score += 5;
      for (const w of words) {
        if (kw.includes(w) || w.includes(kw)) score += 2;
      }
    }

    // Always give base weight to company core
    if (chunk.id === "company-core") score += 3;

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Take top 4 relevant chunks (or at least company-core + top matches)
  const topChunks = scored.slice(0, 4).map((s) => s.chunk.content);

  // Guarantee company-core is present
  const coreChunk = KNOWLEDGE_CHUNKS.find((c) => c.id === "company-core").content;
  if (!topChunks.includes(coreChunk)) {
    topChunks.unshift(coreChunk);
  }

  return topChunks.join("\n\n---\n\n");
}

/**
 * Parse JSON body gracefully.
 */
async function parseBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on("error", reject);
  });
}

/**
 * Serverless / local API Handler
 */
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("[API] GEMINI_API_KEY environment variable is not configured.");
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "AI assistant is temporarily unavailable. Please try again.",
      })
    );
    return;
  }

  try {
    const body = await parseBody(req);
    const userMessage = body.message;

    if (!userMessage || typeof userMessage !== "string") {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Invalid message provided." }));
      return;
    }

    // RAG Retrieval Layer
    const retrievedContext = retrieveRelevantContext(userMessage);

    const systemInstruction = `You are the "HyroVision AI Assistant", the official representative and technology advisor for HyroVision.
Your goal is to inform visitors about HyroVision's engineering services, verified projects, tech stack capabilities, and project inquiry process.

CRITICAL OPERATIONAL RULES:
1. GROUNDING: Answer using ONLY the verified HyroVision information in the RETRIEVED CONTEXT below.
2. NO HALLUCINATIONS: Never invent clients, testimonials, awards, pricing figures, revenue, employees, or unsupported capabilities.
3. UNKNOWN FACTS: If a question asks about details not covered in the retrieved context, politely explain that the specific information is not available in HyroVision's verified knowledge base, and invite them to contact HyroVision at ${company.contact.email} or WhatsApp ${company.contact.whatsappNumber}.
4. TONE & STYLE: Professional, concise, enterprise-ready. Use markdown bolding for key terms and bullet points for lists.

=== RETRIEVED CONTEXT ===
${retrievedContext}
=========================`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      system_instruction: {
        parts: [{ text: systemInstruction }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 600,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("[API] Gemini API response error:", response.status, errorData);
      throw new Error(`Gemini status ${response.status}`);
    }

    const data = await response.json();
    let botText = "I encountered an issue processing your query. Please try again.";

    if (data.candidates && data.candidates.length > 0) {
      botText = data.candidates[0].content.parts[0].text;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        text: botText,
        suggestions: [
          "What services do you offer?",
          "Show me your projects",
          "What technologies do you use?",
          "How can I start a project?",
        ],
      })
    );
  } catch (error) {
    console.error("[API] Error in chat endpoint:", error.message);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "AI assistant is temporarily unavailable. Please try again.",
      })
    );
  }
}
