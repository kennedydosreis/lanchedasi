import { ReviewSchema, ReviewStoreSchema } from '../schemas/review.schema';
import { browser } from '$app/environment';

export class ReviewRepository {
    static STORAGE_KEY = 'lanchedasi_reviews';

    static async getReviewsByItem(itemId) {
        if (!browser) return [];
        
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (!raw) return [];

        try {
            const allReviews = JSON.parse(raw);
            const validated = ReviewStoreSchema.parse(allReviews);
            return validated.filter(r => r.itemId === itemId);
        } catch (e) {
            console.error('Failed to parse reviews:', e);
            return [];
        }
    }

    static async addReview(reviewData) {
        if (!browser) return null;

        try {
            const newReview = ReviewSchema.parse({
                ...reviewData,
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                isVerified: true // Mockando como verificado para fins de demo local
            });

            const raw = localStorage.getItem(this.STORAGE_KEY);
            const allReviews = raw ? JSON.parse(raw) : [];
            
            allReviews.push(newReview);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allReviews));

            return newReview;
        } catch (e) {
            console.error('Validation failed for review:', e);
            throw e;
        }
    }
}
