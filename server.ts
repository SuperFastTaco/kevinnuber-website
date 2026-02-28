import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("subscribers.db");

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/subscribe", async (req, res) => {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const stmt = db.prepare(
        "INSERT INTO subscribers (first_name, last_name, email) VALUES (?, ?, ?)"
      );
      stmt.run(firstName, lastName, email);

      // Send email notification if SMTP is configured
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const mailOptions = {
          from: `"Insights Notification" <${process.env.SMTP_USER}>`,
          to: "kevin.nuber@simplicitygroup.com",
          subject: "New Insights Subscriber!",
          text: `You have a new subscriber!\n\nName: ${firstName} ${lastName}\nEmail: ${email}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #0f2b46;">New Insights Subscriber!</h2>
              <p>You have a new subscriber from your blog:</p>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              </div>
              <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
                This is an automated notification from your website.
              </p>
            </div>
          `,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(`Notification email sent for ${email}`);
        } catch (mailError) {
          console.error("Error sending notification email:", mailError);
          // We don't fail the request if email fails, as the subscriber is already in DB
        }
      }

      res.status(201).json({ message: "Successfully subscribed" });
    } catch (error: any) {
      if (error.code === "SQLITE_CONSTRAINT" || error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        return res.status(400).json({ error: "Email already subscribed" });
      }
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // For demo purposes, a route to see subscribers (in a real app this would be protected)
  app.get("/api/subscribers", (req, res) => {
    const subscribers = db.prepare("SELECT * FROM subscribers ORDER BY created_at DESC").all();
    res.json(subscribers);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
