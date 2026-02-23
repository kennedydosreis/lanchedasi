const USER_STORAGE_KEY = 'lanchedasi_user';

export class UserRepository {
    /**
     * @returns {Object|null}
     */
    static getUser() {
        if (typeof window === 'undefined') return null;
        try {
            const saved = localStorage.getItem(USER_STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error('Failed to load user from localStorage', e);
            return null;
        }
    }

    /**
     * @param {Object} userData { name: string, phone: string }
     */
    static saveUser(userData) {
        if (typeof window === 'undefined') return;
        try {
            // Merge with existing data to preserve other fields if any
            const existing = this.getUser() || {};
            const updated = { ...existing, ...userData };
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('Failed to save user to localStorage', e);
        }
    }

    static clearUser() {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(USER_STORAGE_KEY);
    }
}
