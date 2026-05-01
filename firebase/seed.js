/**
 * SEED SCRIPT — Run once to populate Firestore with existing static data.
 *
 * HOW TO USE:
 *   1. Make sure your .env file has valid Firebase credentials
 *   2. Open browser dev console on http://localhost:5173
 *   3. Import and call: import { seedAll } from './firebase/seed'; seedAll();
 *   OR
 *   Run this from the admin panel: Settings → "Seed Database" button
 *
 * SAFE TO RUN MULTIPLE TIMES — uses setDoc (overwrite), not addDoc
 */

import { db } from "./config";
import {
  collection,
  doc,
  setDoc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";

const ts = () => serverTimestamp();

/* ─────────────────────────── HERO ─────────────────────────── */
const heroData = {
  badge: "Next-Gen Vision AI · Est. 2024",
  headline_prefix: "We Build",
  words: ["Intelligent", "Powerful", "Scalable", "Futuristic", "Innovative"],
  headline_suffix: "Digital Experiences",
  subtitle:
    "AI-powered software, custom vision systems, and enterprise platforms — engineered to perform at scale and designed to impress at first glance.",
  cta_primary_label: "View Projects",
  cta_primary_href: "#projects",
  cta_secondary_label: "Get Started",
  cta_secondary_href: "#contact",
  stats: [
    { v: "50+", l: "Projects" },
    { v: "30+", l: "Clients" },
    { v: "2+", l: "Yrs Exp" },
    { v: "4", l: "Products" },
  ],
  metrics: [
    { label: "AI Inference Speed", val: "12ms", pct: "92%", color: "#14B8A6" },
    { label: "System Uptime", val: "99.9%", pct: "99%", color: "#10b981" },
    { label: "Client Satisfaction", val: "4.9/5", pct: "98%", color: "#3b82f6" },
  ],
  techs: [
    "React", "Next.js", "Python", "TensorFlow", "Three.js",
    "Firebase", "TypeScript", "Node.js", "Flutter", "Docker",
  ],
  updatedAt: ts(),
};

/* ─────────────────────────── ABOUT ─────────────────────────── */
const aboutData = {
  tag: "About Us",
  title: "Pioneering the Future of",
  title_gradient: "Vision Technology",
  description1:
    "Hyro Vision is a full-stack AI and software studio at the intersection of intelligence and design. We architect digital systems that don't just function — they inspire.",
  description2:
    "From computer vision pipelines to premium enterprise SaaS platforms, we bring technical excellence and aesthetic obsession to every build.",
  stats: [
    { icon: "🚀", label: "Projects Delivered", value: "50+" },
    { icon: "🌍", label: "Global Clients", value: "30+" },
    { icon: "⚡", label: "AI Models Deployed", value: "15+" },
    { icon: "🏆", label: "Industry Awards", value: "8" },
  ],
  updatedAt: ts(),
};

/* ─────────────────────────── SERVICES ─────────────────────────── */
const services = [
  {
    id: "ai-ml",
    icon: "🧠", title: "AI & Machine Learning",
    desc: "Custom neural networks, computer vision pipelines, NLP systems, and predictive analytics engineered for real-world performance.",
    tags: ["TensorFlow", "PyTorch", "OpenCV"],
    color: "#14B8A6", order: 0, visible: true,
  },
  {
    id: "computer-vision",
    icon: "👁️", title: "Computer Vision",
    desc: "Real-time object detection, facial recognition, document scanning, and video analytics systems built for scale.",
    tags: ["YOLO", "OpenCV", "MediaPipe"],
    color: "#3b82f6", order: 1, visible: true,
  },
  {
    id: "enterprise-software",
    icon: "⚙️", title: "Enterprise Software",
    desc: "Full-stack SaaS platforms, ERP systems, and B2B tools designed to automate workflows and drive business growth.",
    tags: ["React", "Node.js", "PostgreSQL"],
    color: "#10b981", order: 2, visible: true,
  },
  {
    id: "mobile-apps",
    icon: "📱", title: "Mobile Applications",
    desc: "Cross-platform iOS & Android apps with smooth UX, real-time sync, and AI-powered features baked in.",
    tags: ["Flutter", "React Native", "Firebase"],
    color: "#8b5cf6", order: 3, visible: true,
  },
  {
    id: "cloud-devops",
    icon: "☁️", title: "Cloud & DevOps",
    desc: "Scalable cloud infrastructure, CI/CD pipelines, containerized microservices, and 99.9% uptime architecture.",
    tags: ["AWS", "Docker", "Kubernetes"],
    color: "#f59e0b", order: 4, visible: true,
  },
  {
    id: "ui-ux",
    icon: "🎨", title: "UI/UX Design",
    desc: "Pixel-perfect, conversion-optimized interfaces — from wireframe to working product — with motion design and micro-interactions.",
    tags: ["Figma", "Framer", "Spline"],
    color: "#ec4899", order: 5, visible: true,
  },
];

/* ─────────────────────────── PRODUCTS ─────────────────────────── */
const products = [
  {
    id: "hyrovision-ai",
    name: "HyroVision AI", tagline: "Real-Time Computer Vision Platform",
    desc: "Cloud-native vision AI with object detection, face recognition, and video analytics. Power your camera feeds with intelligence.",
    badge: "🔥 Flagship", badgeColor: "#14B8A6",
    stats: [{ v: "60fps", l: "Processing" }, { v: "99.2%", l: "Accuracy" }, { v: "12ms", l: "Latency" }],
    tags: ["Vision AI", "Real-Time", "Cloud"],
    gradient: "linear-gradient(135deg, rgba(20,184,166,0.15), rgba(59,130,246,0.08))",
    border: "rgba(20,184,166,0.35)", glow: "#14B8A6",
    order: 0, visible: true,
  },
  {
    id: "hyroflow",
    name: "HyroFlow", tagline: "Intelligent Workflow Automation",
    desc: "AI-powered BPM platform that automates repetitive tasks, orchestrates teams, and delivers measurable business outcomes.",
    badge: "⚡ Popular", badgeColor: "#8b5cf6",
    stats: [{ v: "80%", l: "Time Saved" }, { v: "500+", l: "Workflows" }, { v: "4.9★", l: "Rating" }],
    tags: ["Automation", "BPM", "AI"],
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(20,184,166,0.06))",
    border: "rgba(139,92,246,0.3)", glow: "#8b5cf6",
    order: 1, visible: true,
  },
  {
    id: "hyrochat",
    name: "HyroChat", tagline: "Contextual AI Communications Suite",
    desc: "Omnichannel messaging platform with built-in GPT-powered chatbot, smart routing, and real-time customer sentiment analysis.",
    badge: "✨ New", badgeColor: "#10b981",
    stats: [{ v: "10M+", l: "Messages" }, { v: "50+", l: "Channels" }, { v: "99.9%", l: "Uptime" }],
    tags: ["Chat AI", "CXM", "SaaS"],
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(59,130,246,0.06))",
    border: "rgba(16,185,129,0.3)", glow: "#10b981",
    order: 2, visible: true,
  },
  {
    id: "hyroscan",
    name: "HyroScan", tagline: "Document Intelligence & OCR Engine",
    desc: "Extract, classify, and process documents at scale using deep learning OCR. Works on invoices, IDs, reports, and more.",
    badge: "📄 Enterprise", badgeColor: "#f59e0b",
    stats: [{ v: "98%", l: "OCR Accuracy" }, { v: "2s", l: "Per Doc" }, { v: "40+", l: "Languages" }],
    tags: ["OCR", "Document AI", "Enterprise"],
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.06))",
    border: "rgba(245,158,11,0.3)", glow: "#f59e0b",
    order: 3, visible: true,
  },
];

/* ─────────────────────────── PROJECTS ─────────────────────────── */
const projects = [
  {
    id: "p1", title: "Neural Retail Analytics", category: "Computer Vision",
    desc: "AI-powered foot traffic analysis system for retail chains using ceiling cameras and demographic detection.",
    tech: ["Python", "YOLO", "React", "AWS"], color: "#14B8A6", emoji: "🏪", size: "large",
    order: 0, visible: true,
  },
  {
    id: "p2", title: "MedScan Pro", category: "Healthcare AI",
    desc: "Medical document digitization and intelligent data extraction for hospital systems.",
    tech: ["OCR", "TensorFlow", "Node.js"], color: "#3b82f6", emoji: "🏥", size: "small",
    order: 1, visible: true,
  },
  {
    id: "p3", title: "SmartLogistics Hub", category: "Enterprise SaaS",
    desc: "Real-time fleet tracking, route optimization, and warehouse management platform for logistics companies.",
    tech: ["React", "PostgreSQL", "Maps API"], color: "#10b981", emoji: "🚚", size: "small",
    order: 2, visible: true,
  },
  {
    id: "p4", title: "EduVision LMS", category: "EdTech Platform",
    desc: "Modern learning management system with AI-powered personalized curriculum and adaptive assessments.",
    tech: ["Next.js", "Firebase", "AI/ML"], color: "#8b5cf6", emoji: "🎓", size: "large",
    order: 3, visible: true,
  },
  {
    id: "p5", title: "FinFlow Dashboard", category: "FinTech",
    desc: "Real-time financial analytics and reporting suite with AI-driven anomaly detection and forecasting.",
    tech: ["React", "Python", "D3.js"], color: "#f59e0b", emoji: "📊", size: "small",
    order: 4, visible: true,
  },
  {
    id: "p6", title: "SecureVault Identity", category: "Biometrics",
    desc: "Enterprise-grade facial recognition authentication system with liveness detection and audit logging.",
    tech: ["OpenCV", "FastAPI", "Redis"], color: "#ec4899", emoji: "🔐", size: "small",
    order: 5, visible: true,
  },
];

/* ─────────────────────────── PROCESS ─────────────────────────── */
const processSteps = [
  { id: "s1", icon: "💡", step: "01", title: "Idea & Discovery", desc: "Deep-dive consultations to understand your goals, users, and technical constraints.", order: 0, visible: true },
  { id: "s2", icon: "📐", step: "02", title: "Planning & Strategy", desc: "Architecture diagrams, tech stack selection, sprint planning, and milestone definition.", order: 1, visible: true },
  { id: "s3", icon: "🎨", step: "03", title: "Design & Prototype", desc: "High-fidelity UI designs, interactive prototypes, and design system setup.", order: 2, visible: true },
  { id: "s4", icon: "⚙️", step: "04", title: "Development & QA", desc: "Agile development with continuous testing, code reviews, and performance optimization.", order: 3, visible: true },
  { id: "s5", icon: "🚀", step: "05", title: "Delivery & Support", desc: "Seamless deployment, handover documentation, and ongoing maintenance support.", order: 4, visible: true },
];

/* ─────────────────────────── PRICING ─────────────────────────── */
const pricingPlans = [
  {
    id: "starter",
    name: "Starter", price: "$2,500", period: "/ project",
    tagline: "Perfect for small businesses",
    features: ["Up to 5 project pages", "Mobile responsive design", "Basic AI integration", "1 month support", "Source code handover"],
    missing: ["Advanced AI features", "Cloud deployment", "Priority support"],
    color: "#3b82f6", cta: "Get Started", highlighted: false, order: 0, visible: true,
  },
  {
    id: "professional",
    name: "Professional", price: "$7,500", period: "/ project",
    tagline: "Most popular for growing teams",
    features: ["Full-featured web application", "Custom AI/ML integration", "Cloud deployment & DevOps", "3 months priority support", "Performance optimization", "Analytics dashboard"],
    missing: ["Dedicated project manager"],
    color: "#14B8A6", cta: "Most Popular", highlighted: true, order: 1, visible: true,
  },
  {
    id: "enterprise",
    name: "Enterprise", price: "Custom", period: "quote",
    tagline: "For large-scale projects",
    features: ["End-to-end custom platform", "Advanced AI & vision systems", "Multi-cloud architecture", "12 months dedicated support", "SLA guarantee (99.9%)", "Dedicated project manager", "Monthly performance reports"],
    missing: [],
    color: "#8b5cf6", cta: "Contact Us", highlighted: false, order: 2, visible: true,
  },
];

/* ─────────────────────────── TECH STACK ─────────────────────────── */
const techStack = [
  { id: "t1", name: "React", icon: "⚛️", order: 0, visible: true },
  { id: "t2", name: "Next.js", icon: "▲", order: 1, visible: true },
  { id: "t3", name: "Python", icon: "🐍", order: 2, visible: true },
  { id: "t4", name: "TensorFlow", icon: "🧠", order: 3, visible: true },
  { id: "t5", name: "PyTorch", icon: "🔥", order: 4, visible: true },
  { id: "t6", name: "Three.js", icon: "🎮", order: 5, visible: true },
  { id: "t7", name: "Node.js", icon: "🟢", order: 6, visible: true },
  { id: "t8", name: "TypeScript", icon: "📘", order: 7, visible: true },
  { id: "t9", name: "Flutter", icon: "🦋", order: 8, visible: true },
  { id: "t10", name: "Docker", icon: "🐳", order: 9, visible: true },
  { id: "t11", name: "Kubernetes", icon: "☸️", order: 10, visible: true },
  { id: "t12", name: "AWS", icon: "☁️", order: 11, visible: true },
  { id: "t13", name: "Firebase", icon: "🔥", order: 12, visible: true },
  { id: "t14", name: "PostgreSQL", icon: "🐘", order: 13, visible: true },
  { id: "t15", name: "OpenCV", icon: "👁️", order: 14, visible: true },
  { id: "t16", name: "Figma", icon: "🎨", order: 15, visible: true },
];

/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */
const testimonials = [
  {
    id: "tm1", name: "Sarah Chen", role: "CTO, NeuralRetail Inc.", avatar: "SC",
    text: "Hyro Vision transformed our retail analytics. The computer vision system they built processes 60+ camera feeds in real-time with accuracy we didn't think was possible. It's genuinely impressive.",
    rating: 5, color: "#14B8A6", order: 0, visible: true,
  },
  {
    id: "tm2", name: "Alex Müller", role: "CEO, MedScan Solutions", avatar: "AM",
    text: "We came with a complex healthcare problem and they delivered beyond expectations. The OCR engine processes thousands of medical documents daily with 98% accuracy. Incredible team.",
    rating: 5, color: "#3b82f6", order: 1, visible: true,
  },
  {
    id: "tm3", name: "Priya Nair", role: "Product Lead, EduTech Global", avatar: "PN",
    text: "The LMS they built for us has a UX that our students actually love. The AI personalization module boosted course completion by 43%. We couldn't be happier with the outcome.",
    rating: 5, color: "#8b5cf6", order: 2, visible: true,
  },
  {
    id: "tm4", name: "Omar Al-Rashid", role: "Director of Tech, SwiftLogistics", avatar: "OA",
    text: "Their enterprise logistics platform saved us 80+ hours per week in manual operations. The real-time tracking and AI-driven route optimization paid for itself within 3 months.",
    rating: 5, color: "#10b981", order: 3, visible: true,
  },
];

/* ─────────────────────────── CTA ─────────────────────────── */
const ctaData = {
  tag: "Ready to Build?",
  title: "Let's Build Something",
  title_gradient: "Powerful Together",
  description:
    "Whether you have a fully-formed idea or just a spark — we're here to turn it into something extraordinary.",
  btn_primary_label: "Start Your Project",
  btn_primary_href: "#contact",
  btn_secondary_label: "Email Us",
  updatedAt: ts(),
};

/* ─────────────────────────── CONTACT INFO ─────────────────────────── */
const contactInfo = {
  email: "hello@hyrovision.ai",
  whatsapp_number: "+1 (555) 123-4567",
  whatsapp_link: "https://wa.me/15551234567",
  location: "Dubai, UAE · Remote Worldwide",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Twitter", href: "#" },
  ],
  updatedAt: ts(),
};

/* ─────────────────────────── SETTINGS ─────────────────────────── */
const settings = {
  site_name: "Hyro Vision",
  maintenance_mode: false,
  updatedAt: ts(),
};

/* ─────────────────────────── SEED ALL ─────────────────────────── */
export async function seedAll() {
  console.log("🌱 Seeding Firestore...");

  // Single-doc collections
  await setDoc(doc(db, "hero_section", "main"), heroData);
  console.log("✅ hero_section");

  await setDoc(doc(db, "about_section", "main"), aboutData);
  console.log("✅ about_section");

  await setDoc(doc(db, "cta_section", "main"), ctaData);
  console.log("✅ cta_section");

  await setDoc(doc(db, "contact_info", "main"), contactInfo);
  console.log("✅ contact_info");

  await setDoc(doc(db, "settings", "main"), settings);
  console.log("✅ settings");

  // Array collections — batch write per collection
  const batches = [
    ["services", services],
    ["products", products],
    ["projects", projects],
    ["process_steps", processSteps],
    ["pricing_plans", pricingPlans],
    ["tech_stack", techStack],
    ["testimonials", testimonials],
  ];

  for (const [colName, items] of batches) {
    const batch = writeBatch(db);
    items.forEach((item) => {
      const { id, ...data } = item;
      batch.set(doc(db, colName, id), { ...data, updatedAt: ts() });
    });
    await batch.commit();
    console.log(`✅ ${colName} (${items.length} docs)`);
  }

  console.log("🎉 Seeding complete! All collections populated.");
}
