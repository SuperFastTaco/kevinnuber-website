export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { eventName, eventSourceUrl, userData } = req.body;
  const pixelId = process.env.VITE_META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken || accessToken === "your-meta-access-token") {
    console.warn("Meta CAPI: Missing Pixel ID or Access Token. Skipping server-side event.");
    return res.status(200).json({ status: "skipped", reason: "missing_config" });
  }

  try {
    // Vercel passes the client IP in the x-forwarded-for header
    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || "";

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: eventName,
              event_time: Math.floor(Date.now() / 1000),
              action_source: "website",
              event_source_url: eventSourceUrl,
              user_data: {
                client_ip_address: clientIp.split(',')[0].trim(), // Get the real IP if multiple are forwarded
                client_user_agent: req.headers["user-agent"],
                ...userData,
              },
            },
          ],
        }),
      }
    );

    const result = await response.json();
    console.log("Meta CAPI Result:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Meta CAPI Error:", error);
    res.status(500).json({ error: "Failed to send event to Meta" });
  }
}
