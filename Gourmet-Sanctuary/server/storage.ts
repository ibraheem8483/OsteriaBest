
import { db } from "./db";
import {
  menuItems,
  reservations,
  type MenuItem,
  type InsertMenuItem,
  type Reservation,
  type InsertReservation,
} from "@shared/schema";

export interface IStorage {
  getMenuItems(): Promise<MenuItem[]>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  seedMenu(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems);
  }

  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const [created] = await db.insert(reservations).values(reservation).returning();
    return created;
  }

  async seedMenu(): Promise<void> {
    // We want to replace the menu entirely with the new data
    // First, clear existing items
    await db.delete(menuItems);

    const items: InsertMenuItem[] = [
      // Snacks
      { name: "House Marinated Olives", description: "Lemon & Garlic", price: "150", category: "Snacks", available: true },
      { name: "Toasted Sourdough", description: "Garlic & Herb Butter, Olive Oil & Balsamic", price: "190", category: "Snacks", available: true },
      { name: "Bruschetta", description: "Marinated Tomatoes, Burrata, Black Olive Caramel, Ciabatta", price: "160", category: "Snacks", available: true },
      { name: "Crispy Potato Millefeuille", description: "Aged Parmesan, Roasted Garlic Mayo", price: "180", category: "Snacks", available: true },
      { name: "Hummus", description: "Tomato & Artichoke Salsa, Toasted Flat Bread", price: "140", category: "Snacks", available: true },
      { name: "Panko Fried Prawns", description: "Bloody Mary Sauce", price: "490", category: "Snacks", available: true },
      { name: "Truffle & Parmesan Hand Cut Chips", description: "Truffle Mayo", price: "130", category: "Snacks", available: true },
      { name: "House Cured Bresaola", description: "Cornichons, Pickled Red Onions, Sourdough Crisps", price: "280", category: "Snacks", available: true },
      { name: "Tempura Halloumi", description: "Tomato & Chili Jam", price: "210", category: "Snacks", available: true },
      { name: "Cauliflower & Truffle Arancini", description: "Truffle Mayo", price: "250", category: "Snacks", available: true },

      // Raw/Marinated
      { name: "Tuna Tartare", description: "Sriracha Mayo, Jalapenos, Apple, Coriander & Sesame", price: "430", category: "Raw/Marinated", available: true },
      { name: "Carpaccio of Octopus", description: "Shallot, Orange & Herb Salad, Chili & Citrus Dressing", price: "310", category: "Raw/Marinated", available: true },
      { name: "Salmon Crudo", description: "Chilli & Soy Dressing, Pickled Daikon, Spring Onion & Cucumber", price: "590", category: "Raw/Marinated", available: true },
      { name: "Hay Smoked Beef Carpaccio", description: "Mushroom Tapenade, Roasted Garlic Mayo, Black Pepper Crackers", price: "420", category: "Raw/Marinated", available: true },

      // Small Plates
      { name: "Roasted Carrot & Cumin Soup", description: "Coriander Yoghurt, Spiced Hazelnuts", price: "180", category: "Small Plates", available: true },
      { name: "Chargrilled Teriyaki Chicken Skewers", description: "Tonkatsu Mayo", price: "275", category: "Small Plates", available: true },
      { name: "Burrata", description: "Zucchini Carpaccio, Chili & Garlic Dressing, Sun Dried Tomatoes, Toasted Sesame", price: "370", category: "Small Plates", available: true },
      { name: "Seared Beef Fillet", description: "Sliced Rare Beef, Wasabi Dressing, Garlic & Ginger Beef Sauce, Shoestring Potato", price: "480", category: "Small Plates", available: true },
      { name: "Chargrilled King Prawns", description: "Garlic & Lemon Burnt Butter, Toasted Sourdough", price: "940", category: "Small Plates", available: true },
      { name: "Baked Brie", description: "Rosemary, Garlic & Honey, Red Onion Marmalade, Toasted Sourdough", price: "370", category: "Small Plates", available: true },

      // Sourdough Flatbreads
      { name: "Garlic & Herb Butter", description: "Sourdough Flatbread", price: "180", category: "Sourdough Flatbreads", available: true },
      { name: "Bresaola, Sun Dried Tomato, Rucola", description: "Sourdough Flatbread", price: "220", category: "Sourdough Flatbreads", available: true },
      { name: "Tomato, Burrata, Salsa Verde", description: "Sourdough Flatbread", price: "200", category: "Sourdough Flatbreads", available: true },
      { name: "Roasted Mushroom, Black Truffle, Grana Padano", description: "Sourdough Flatbread", price: "240", category: "Sourdough Flatbreads", available: true },

      // Salads
      { name: "Burrata", description: "Marinated Heritage Tomatoes, Mixed Leaves, Balsamic Dressing, Sourdough Crisps", price: "360", category: "Salads", available: true },
      { name: "Honey Glazed Goats Cheese", description: "Roasted Beetroot & Apple Salad, Candied Walnuts", price: "375", category: "Salads", available: true },
      { name: "Greek Salad", description: "Feta Cheese, Olives, Cucumber, Tomato, Red Onions, Olive Oil, Lemon & Mint Vinaigrette", price: "295", category: "Salads", available: true },
      { name: "Grilled Salmon Fillet", description: "Mixed leaves, Cherry Tomatoes, Green Beans, Avocado, Citrus Dressing", price: "630", category: "Salads", available: true },
      { name: "Thai Beef Salad", description: "Salted Peanuts, Pickled Shallots, Mint & Coriander, Red Chili & Soy Dressing", price: "540", category: "Salads", available: true },
      { name: "Caesar Salad", description: "Cos lettuce, Aged Parmesan, Sourdough Croutons", price: "280", category: "Salads", available: true },
      { name: "Caesar Salad With Grilled Chicken", description: "Cos lettuce, Aged Parmesan, Sourdough Croutons, Grilled Chicken", price: "390", category: "Salads", available: true },

      // Large Plates
      { name: "Roast Chicken", description: "Herb Gnocchi, Mushroom & Spinach Fricassee, Dijon Mustard Sauce", price: "575", category: "Large Plates", available: true },
      { name: "Grilled Lamb Cutlets", description: "Salt Baked Carrots, Braised Lamb Shoulder, Confit Potatoes, Feta Cheese", price: "720", category: "Large Plates", available: true },
      { name: "Beef Fillet", description: "Glazed Short Rib, Roasted Onion Puree, Potato Terrine, Buttered Greens, Beef Sauce", price: "900", category: "Large Plates", available: true },
      { name: "Pan Fried Fillet of Sea Bass", description: "Spring Onion & Herb Orzo, Cauliflower Puree, Tomato & Caper Salsa", price: "480", category: "Large Plates", available: true },
      { name: "Truffle Cheese Burger", description: "Lyonnaise Onions, Dill Pickles, Truffle Mayo, Hand Cut Chips", price: "390", category: "Large Plates", available: true },
      { name: "Veal Milanese", description: "Slow Roasted Tomatoes, Salsa Verde, Rucola & Parmesan", price: "450", category: "Large Plates", available: true },
      { name: "Slow Cooked Beef Ragu", description: "Truffle Risotto, Pickled Shallots, Truffle Crumb", price: "480", category: "Large Plates", available: true },
      { name: "US Angus Rib Eye Steak", description: "Café De Paris Butter, Beef Sauce, Hand Cut Chips", price: "2500", category: "Large Plates", available: true },
      { name: "Butter Roasted Salmon", description: "Potato, Leek, Pea & Cannellini Bean Velouté", price: "780", category: "Large Plates", available: true },
      { name: "Smoked Beef Chateaubriand For 2", description: "Roasted Onions, Caesar Salad, Confit Tomatoes & Hand Cut Chips Served with Beef Jus and Peppercorn Sauce", price: "2300", category: "Large Plates", available: true },

      // Fresh Hand Rolled Pasta
      { name: "Truffle Pappardelle", description: "Black Truffle Butter & Parmesan Cheese", price: "410", category: "Fresh Hand Rolled Pasta", available: true },
      { name: "Sun Dried Tomato & Spinach Agnolotti", description: "Burrata, Mint Pesto & Pine Nuts", price: "410", category: "Fresh Hand Rolled Pasta", available: true },
      { name: "Potato Gnocchi", description: "Roasted Mushroom, Confit Onions, Truffle Cream Sauce", price: "480", category: "Fresh Hand Rolled Pasta", available: true },
      { name: "Prawn Fettuccine", description: "Garlic, Olive Oil, Red Chili & Fresh Herbs", price: "570", category: "Fresh Hand Rolled Pasta", available: true },
      { name: "Sweet Potato & Feta Ravioli", description: "Spinach, Hazelnut Pesto, Herb Cream Sauce", price: "375", category: "Fresh Hand Rolled Pasta", available: true },
      { name: "Salmon & Cream Cheese Tortellini", description: "Tomato Cream Sauce, Fried Capers, Parsley", price: "450", category: "Fresh Hand Rolled Pasta", available: true },

      // Desserts
      { name: "Banoffee Choux Bun", description: "Caramelised Banana Mousse, Salted Caramel Ice Cream", price: "290", category: "Desserts", available: true },
      { name: "Dark Chocolate Delice", description: "Peanut Butter Ganache, Milk Ice Cream", price: "275", category: "Desserts", available: true },
      { name: "Tiramisu", description: "Coffee Sponge, White Chocolate & Mascarpone Mousse, Hazelnut Praline", price: "260", category: "Desserts", available: true },
      { name: "Date & Walnut Pudding", description: "Butterscotch Sauce, Honeycomb, Vanilla Ice Cream", price: "260", category: "Desserts", available: true },
      { name: "Mango & Coconut Pavlova", description: "Crème Chantilly, Toasted Almonds, Coconut Ice Cream", price: "245", category: "Desserts", available: true },
      { name: "Osteria Affogato", description: "Vanilla Ice Cream, Sea Salt Caramel, Espresso Shot", price: "160", category: "Desserts", available: true },

      // Soft Drinks
      { name: "Dasani Water Small", description: "Still Water", price: "40", category: "Soft Drinks", available: true },
      { name: "Dasani Water Large", description: "Still Water", price: "70", category: "Soft Drinks", available: true },
      { name: "Nestle Sparkling Water", description: "Sparkling Water", price: "70", category: "Soft Drinks", available: true },
      { name: "Coca Cola", description: "Soft Drink", price: "60", category: "Soft Drinks", available: true },
      { name: "Coca Cola Zero", description: "Soft Drink", price: "60", category: "Soft Drinks", available: true },
      { name: "Sprite", description: "Soft Drink", price: "60", category: "Soft Drinks", available: true },
      { name: "Sprite Zero", description: "Soft Drink", price: "60", category: "Soft Drinks", available: true },
      { name: "Schweppes Club Soda", description: "Soft Drink", price: "70", category: "Soft Drinks", available: true },
      { name: "Schweppes Tonic Water", description: "Soft Drink", price: "70", category: "Soft Drinks", available: true },
      { name: "Schweppes Pomegranate", description: "Soft Drink", price: "65", category: "Soft Drinks", available: true },
      { name: "Schweppes Pineapple", description: "Soft Drink", price: "65", category: "Soft Drinks", available: true },
      { name: "Red Bull", description: "Energy Drink", price: "140", category: "Soft Drinks", available: true },
      { name: "Red Bull Sugar Free", description: "Energy Drink", price: "140", category: "Soft Drinks", available: true },
      { name: "Birell 0%", description: "Alcohol Free Beer", price: "90", category: "Soft Drinks", available: true },
      { name: "Fresh Orange Juice", description: "Fruit Juice", price: "110", category: "Soft Drinks", available: true },
      { name: "House Lemonade", description: "Fruit Juice", price: "80", category: "Soft Drinks", available: true },
      { name: "Raspberry Iced Tea", description: "Iced Tea", price: "75", category: "Soft Drinks", available: true },
      { name: "Mango Iced Tea", description: "Iced Tea", price: "75", category: "Soft Drinks", available: true },

      // Coffee
      { name: "Espresso", description: "Coffee", price: "55", category: "Coffee", available: true },
      { name: "Espresso Macchiato", description: "Coffee", price: "75", category: "Coffee", available: true },
      { name: "Americano", description: "Coffee", price: "80", category: "Coffee", available: true },
      { name: "Flat White", description: "Coffee", price: "75", category: "Coffee", available: true },
      { name: "Cappuccino", description: "Coffee", price: "85", category: "Coffee", available: true },
      { name: "Latte", description: "Coffee", price: "85", category: "Coffee", available: true },
      { name: "Mocha", description: "Coffee", price: "90", category: "Coffee", available: true },
      { name: "Spanish Latte", description: "Coffee", price: "95", category: "Coffee", available: true },
      { name: "Belgian Hot Chocolate", description: "Hot Chocolate", price: "140", category: "Coffee", available: true },
      { name: "Turkish Coffee", description: "Coffee", price: "55", category: "Coffee", available: true },

      // Kid's Menu - Starters
      { name: "Cheese & Garlic Flat Bread (Kid's)", description: "Starters", price: "125", category: "Kid's Menu", available: true },
      { name: "Crispy Chicken Strips (Kid's)", description: "BBQ Dipping Sauce", price: "160", category: "Kid's Menu", available: true },
      { name: "Fish Goujons (Kid's)", description: "Garlic Mayo", price: "135", category: "Kid's Menu", available: true },
      // Kid's Menu - Mains
      { name: "Pasta & Tomato Sauce (Kid's)", description: "Mains", price: "160", category: "Kid's Menu", available: true },
      { name: "Chicken Breast (Kid's)", description: "Roasted Potatoes, Buttered Vegetables", price: "180", category: "Kid's Menu", available: true },
      { name: "Fillet Steak (Kid's)", description: "Salad & Hand Cut Chips", price: "350", category: "Kid's Menu", available: true },
      // Kid's Menu - Desserts
      { name: "Chocolate Brownie (Kid's)", description: "Chocolate Sauce, Vanilla Ice Cream", price: "150", category: "Kid's Menu", available: true },
      { name: "Ice Cream by the Scoop (Kid's)", description: "Chocolate, Strawberry or Vanilla", price: "70", category: "Kid's Menu", available: true },
    ];

    await db.insert(menuItems).values(items);
  }
}

export const storage = new DatabaseStorage();
