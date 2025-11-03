import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
// import { Resend } from "npm:resend";

import { Resend } from "resend";
// import { Resend } from "jsr:resend";


const resend = new Resend(Deno.env.get("RESEND_API_KEY")); // must match env variable


interface ContactFormData {
  full_name: string;
  phone?: string;
  email: string;
  service?: string;
  message: string;
}

serve(async (req) => {
  // --- CORS handling ---
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // --- Preflight ---
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ success: false, error: "Method not allowed" }),
        { status: 405, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    const data: ContactFormData = await req.json();

    if (!data.full_name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    // Send email via Resend
    const result = await resend.emails.send({
      from: "marketing@osangroupoman.com",
      to: "info@osbic.net",
      subject: `New Contact Form Submission from ${data.full_name}`,
      html: `
        <p><strong>Name:</strong> ${data.full_name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
        <p><strong>Service:</strong> ${data.service || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Edge Function Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message ?? String(err) }),
      { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
    );
  }
});
