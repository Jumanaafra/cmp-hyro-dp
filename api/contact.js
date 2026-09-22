import { Resend } from "resend";

// In-memory rate limiter: IP -> Array of timestamps
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);

  // Periodic cleanup
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

function sanitize(str) {
  if (!str) return "";
  return String(str)
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function parseBody(req) {
  if (req.body) {
    if (typeof req.body === "object") return req.body;
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch (err) {
        return {};
      }
    }
  }

  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Method not allowed. Only POST is accepted." }));
  }

  try {
    const body = (await parseBody(req)) || {};

    const {
      name,
      email,
      phone = "",
      company = "",
      service = "General Inquiry",
      budget = "",
      message,
      _hp = "", // Honeypot field for bot detection
    } = body;

    // 1. Honeypot check: bots fill this hidden field; humans don't
    if (_hp && _hp.trim().length > 0) {
      // Silently return success to mislead the bot without sending email
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({ success: true, message: "Enquiry received successfully." })
      );
    }

    // 2. Rate limit check
    const clientIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.headers["x-real-ip"] ||
      req.socket?.remoteAddress ||
      "";

    if (isRateLimited(clientIp)) {
      res.statusCode = 429;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          error: "Too many enquiries submitted recently. Please wait a few minutes before trying again.",
        })
      );
    }

    // 3. Validation
    const cleanName = sanitize(name);
    const cleanEmail = String(email || "").trim();
    const cleanPhone = sanitize(phone);
    const cleanCompany = sanitize(company);
    const cleanService = sanitize(service);
    const cleanBudget = sanitize(budget);
    const cleanMessage = sanitize(message);

    if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ error: "Please provide a valid name (2-100 characters)." }));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail) || cleanEmail.length > 120) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ error: "Please provide a valid email address." }));
    }

    if (!cleanMessage || cleanMessage.length < 10 || cleanMessage.length > 5000) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          error: "Please provide a message between 10 and 5,000 characters.",
        })
      );
    }

    // 4. Verify Resend Configuration
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "info@hyrovision.com";
    const verifiedSender = "Hyro Vision <info@hyrovision.com>";

    if (!apiKey) {
      console.error("[Resend Error] Missing RESEND_API_KEY in environment variables.");
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          error: "Email delivery service is currently not configured on this server.",
        })
      );
    }

    const resend = new Resend(apiKey);
    const timestampStr = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      dateStyle: "full",
      timeStyle: "long",
    }) + " UTC";

    // ── Email 1: Notification to info@hyrovision.com ──
    const internalSubject = `New Website Enquiry — ${cleanName}`;
    const internalHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #f1f5f9; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #141418; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #14B8A6 0%, #0d9488 100%); padding: 24px 32px; color: #000000; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
          .header p { margin: 4px 0 0 0; font-size: 13px; font-weight: 600; opacity: 0.9; }
          .content { padding: 32px; }
          .field-row { margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .field-label { font-size: 11px; text-transform: uppercase; color: #14B8A6; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 4px; }
          .field-value { font-size: 15px; color: #f1f5f9; line-height: 1.5; }
          .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; margin-top: 8px; }
          .footer { padding: 20px 32px; background: #0f0f12; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #64748b; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Hyro Vision</h1>
            <p>New Commercial / Project Enquiry</p>
          </div>
          <div class="content">
            <div class="field-row">
              <div class="field-label">Sender Name</div>
              <div class="field-value"><strong>${cleanName}</strong></div>
            </div>
            <div class="field-row">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${cleanEmail}" style="color: #14B8A6; text-decoration: none;">${cleanEmail}</a></div>
            </div>
            ${cleanPhone ? `
            <div class="field-row">
              <div class="field-label">Phone / WhatsApp</div>
              <div class="field-value">${cleanPhone}</div>
            </div>
            ` : ""}
            ${cleanCompany ? `
            <div class="field-row">
              <div class="field-label">Company / Organization</div>
              <div class="field-value">${cleanCompany}</div>
            </div>
            ` : ""}
            <div class="field-row">
              <div class="field-label">Service of Interest</div>
              <div class="field-value">${cleanService}</div>
            </div>
            ${cleanBudget ? `
            <div class="field-row">
              <div class="field-label">Estimated Budget</div>
              <div class="field-value">${cleanBudget}</div>
            </div>
            ` : ""}
            <div class="field-row" style="border-bottom: none; margin-bottom: 0;">
              <div class="field-label">Project Details / Message</div>
              <div class="message-box">${cleanMessage}</div>
            </div>
          </div>
          <div class="footer">
            <span>Source: hyrovision.com</span>
            <span>Submitted: ${timestampStr}</span>
          </div>
        </div>
      </body>
      </html>
    `;

    const internalText = `
HYRO VISION — NEW WEBSITE ENQUIRY
------------------------------------------------
Name:    ${cleanName}
Email:   ${cleanEmail}
${cleanPhone ? `Phone:   ${cleanPhone}\n` : ""}${cleanCompany ? `Company: ${cleanCompany}\n` : ""}Service: ${cleanService}
${cleanBudget ? `Budget:  ${cleanBudget}\n` : ""}
Message:
${cleanMessage}
------------------------------------------------
Source:    Hyro Vision Website (https://hyrovision.com)
Submitted: ${timestampStr}
Reply-To:  ${cleanEmail}
    `.trim();

    // ── Email 2: Auto-responder confirmation to visitor ──
    const visitorSubject = `Thank you for contacting Hyro Vision`;
    const visitorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #f1f5f9; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #141418; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden; }
          .header { background: #0f0f12; padding: 28px 32px; border-bottom: 1px solid rgba(20,184,166,0.3); }
          .logo { font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; }
          .logo span { color: #14B8A6; }
          .content { padding: 32px; }
          .content h2 { font-size: 18px; color: #ffffff; margin-top: 0; margin-bottom: 14px; font-weight: 700; }
          .content p { font-size: 14px; line-height: 1.65; color: #94a3b8; margin-bottom: 16px; }
          .summary-card { background: rgba(20,184,166,0.06); border: 1px solid rgba(20,184,166,0.2); border-radius: 8px; padding: 18px 22px; margin: 20px 0; }
          .summary-title { font-size: 12px; text-transform: uppercase; color: #14B8A6; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 8px; }
          .summary-item { font-size: 13px; color: #e2e8f0; margin-bottom: 6px; }
          .cta-btn { display: inline-block; background: #14B8A6; color: #000000 !important; font-weight: 700; font-size: 13px; padding: 10px 22px; border-radius: 6px; text-decoration: none; margin-top: 10px; }
          .footer { padding: 24px 32px; background: #0f0f12; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #64748b; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Hyro <span>Vision</span></div>
          </div>
          <div class="content">
            <h2>Thank you for reaching out, ${cleanName}!</h2>
            <p>
              We have received your enquiry regarding <strong>${cleanService}</strong>. Our engineering team reviews all technical requirements and will get back to you with architectural feasibility and sprint estimates within <strong>24 business hours</strong>.
            </p>
            <div class="summary-card">
              <div class="summary-title">Summary of Your Enquiry</div>
              <div class="summary-item"><strong>Service:</strong> ${cleanService}</div>
              ${cleanCompany ? `<div class="summary-item"><strong>Company:</strong> ${cleanCompany}</div>` : ""}
              ${cleanBudget ? `<div class="summary-item"><strong>Budget Tier:</strong> ${cleanBudget}</div>` : ""}
            </div>
            <p>
              If your request is time-sensitive or you wish to discuss requirements directly with our team, you can also reach us via WhatsApp:
            </p>
            <a href="https://wa.me/919360294463" class="cta-btn">Connect on WhatsApp →</a>
          </div>
          <div class="footer">
            <div><strong>Hyro Vision — Intelligent Digital Experiences</strong></div>
            <div>Email: <a href="mailto:info@hyrovision.com" style="color: #14B8A6; text-decoration: none;">info@hyrovision.com</a> | Web: <a href="https://hyrovision.com" style="color: #14B8A6; text-decoration: none;">https://hyrovision.com</a></div>
            <div style="margin-top: 6px;">We engineer high-performance web applications, autonomous AI agents, and enterprise platforms.</div>
          </div>
        </div>
      </body>
      </html>
    `;

    const visitorText = `
Hello ${cleanName},

Thank you for reaching out to Hyro Vision. We have received your project enquiry regarding "${cleanService}".

Our engineering team reviews all technical specifications and will get back to you within 24 business hours.

Summary of submitted details:
- Service: ${cleanService}
${cleanCompany ? `- Company: ${cleanCompany}\n` : ""}${cleanBudget ? `- Budget: ${cleanBudget}\n` : ""}
If you have an urgent inquiry, you can connect directly with our engineers on WhatsApp:
https://wa.me/919360294463

Best regards,
Hyro Vision Engineering Team
Email: info@hyrovision.com
Website: https://hyrovision.com
    `.trim();

    // ── Dispatch Both Emails in Parallel ──
    const [internalResult, visitorResult] = await Promise.allSettled([
      // 1. Internal notification
      resend.emails.send({
        from: verifiedSender,
        to: recipientEmail,
        replyTo: cleanEmail,
        subject: internalSubject,
        html: internalHtml,
        text: internalText,
      }),
      // 2. Auto-responder to visitor
      resend.emails.send({
        from: verifiedSender,
        to: cleanEmail,
        replyTo: recipientEmail,
        subject: visitorSubject,
        html: visitorHtml,
        text: visitorText,
      }),
    ]);

    // Check if internal notification succeeded
    if (internalResult.status === "rejected" || internalResult.value?.error) {
      const err = internalResult.reason || internalResult.value?.error;
      console.error("[Resend Error - Internal Email Failed]:", err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          error: "Failed to deliver enquiry email. Please try again or email us directly at info@hyrovision.com.",
        })
      );
    }

    if (visitorResult.status === "rejected" || visitorResult.value?.error) {
      console.warn(
        "[Resend Warning - Visitor Auto-responder Failed]:",
        visitorResult.reason || visitorResult.value?.error
      );
      // Non-fatal: internal email was delivered, so we still return success to the user
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        success: true,
        message: "Enquiry delivered successfully. A confirmation email has been sent to your inbox.",
      })
    );
  } catch (error) {
    console.error("[API Contact Error]:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        error: "An unexpected error occurred while submitting your enquiry. Please email info@hyrovision.com.",
      })
    );
  }
}
