import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { Resend } from "resend";

// Initialize Resend ONCE
const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Seed menu data
  await storage.seedMenu();

  // =======================
  // MENU ROUTE
  // =======================
  app.get(api.menu.list.path, async (_req, res) => {
    const menu = await storage.getMenuItems();
    res.json(menu);
  });

  // =======================
  // RESERVATION ROUTE
  // =======================
  app.post(api.reservations.create.path, async (req, res) => {
    try {
      console.log("RESERVATION HIT", req.body);

      const input = api.reservations.create.input.parse(req.body);

      const reservation = await storage.createReservation(input);

      console.log("RESEND KEY EXISTS:", !!process.env.RESEND_API_KEY);

      // 🔔 EMAIL NOTIFICATION (SAFE)
      try {
        await resend.emails.send({
          from: "Osteria <onboarding@resend.dev>",
          to: ["ibraheem.abdussalam8971@gmail.com"],
          subject: "New Reservation Received",
          html: `
            <h2>New Reservation</h2>
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Phone:</strong> ${input.phone}</p>
            <p><strong>Date:</strong> ${input.date}</p>
            <p><strong>Time:</strong> ${input.time}</p>
            <p><strong>Guests:</strong> ${input.guests}</p>
            <p><strong>Special Requests:</strong> ${input.specialRequests || "None"}</p>
          `,
        });
      } catch (emailErr) {
        console.error("EMAIL FAILED", emailErr);
      }

      res.status(201).json(reservation);

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      console.error("RESERVATION ERROR", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
