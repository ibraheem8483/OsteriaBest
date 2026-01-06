
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === MENU ITEMS ===
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(), // text to allow formatted strings like "350 EGP"
  category: text("category").notNull(), // Starters, Pasta, Pizza, Main Courses, Desserts, Beverages
  available: boolean("available").default(true).notNull(),
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

// === RESERVATIONS ===
export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  date: text("date").notNull(), // YYYY-MM-DD
  time: text("time").notNull(), // HH:MM
  guests: integer("guests").notNull(),
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReservationSchema = createInsertSchema(reservations).omit({ id: true, createdAt: true });
export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;
