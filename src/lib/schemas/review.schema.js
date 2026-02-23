import { z } from 'zod';

export const ReviewSchema = z.object({
    id: z.string().uuid(),
    itemId: z.string(),
    author: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    rating: z.number().min(1).max(5),
    comment: z.string().min(5, "Comentário deve ter pelo menos 5 caracteres"),
    timestamp: z.string().datetime(),
    isVerified: z.boolean().default(false)
});

export type Review = z.infer<typeof ReviewSchema>;

export const ReviewStoreSchema = z.array(ReviewSchema);
