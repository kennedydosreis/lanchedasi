import { z } from 'zod';

/**
 * Schema para um item individual do cardápio
 */
export const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  image: z.string(),
  popular: z.boolean().optional(),
});

/**
 * Schema para o cardápio completo
 */
export const MenuDataSchema = z.object({
  version: z.string(),
  combos: z.array(MenuItemSchema),
  sanduiches: z.array(MenuItemSchema),
  kikao: z.array(MenuItemSchema),
  bebidas: z.array(MenuItemSchema),
  porcoes: z.array(MenuItemSchema),
  pratos: z.array(MenuItemSchema),
  sobremesas: z.array(MenuItemSchema),
});

/**
 * Tipo inferido do schema de item do cardápio
 */
export type MenuItem = z.infer<typeof MenuItemSchema>;

/**
 * Tipo inferido do schema do cardápio completo
 */
export type MenuData = z.infer<typeof MenuDataSchema>;
