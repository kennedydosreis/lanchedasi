interface UserData {
    name: string;
    phone: string;
    [key: string]: any;
}

const USER_STORAGE_KEY = 'lanchedasi_user';

export class UserRepository {
    /**
     * @returns {UserData|null}
     */
    static getUser(): UserData | null {
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
     * @param {Partial<UserData>} userData 
     */
    static saveUser(userData: Partial<UserData>): void {
        if (typeof window === 'undefined') return;
        try {
            // Merge with existing data to preserve other fields if any
            const existing = this.getUser() || {} as UserData;
            const updated = { ...existing, ...userData };
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('Failed to save user to localStorage', e);
        }
    }

    static clearUser(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(USER_STORAGE_KEY);
    }
}
