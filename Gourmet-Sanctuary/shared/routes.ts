
import { z } from 'zod';
import { insertMenuItemSchema, insertReservationSchema, menuItems, reservations } from './schema';

export { insertMenuItemSchema, insertReservationSchema, menuItems, reservations };

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  menu: {
    list: {
      method: 'GET' as const,
      path: '/api/menu',
      responses: {
        200: z.array(z.custom<typeof menuItems.$inferSelect>()),
      },
    },
  },
  reservations: {
    create: {
      method: 'POST' as const,
      path: '/api/reservations',
      input: insertReservationSchema,
      responses: {
        201: z.custom<typeof reservations.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export type MenuItemResponse = z.infer<typeof api.menu.list.responses[200]>[number];
export type CreateReservationInput = z.infer<typeof api.reservations.create.input>;
