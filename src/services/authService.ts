import type { User } from "../types";

const USERS_KEY = 'auth_module_users';
const CURRENT_USER_KEY = 'auth_module_current_user';

export const authService = {
    getUsers(): User[] {
        const usersJson = localStorage.getItem(USERS_KEY);
        return usersJson ? JSON.parse(usersJson) : [];
    },

    saveUsers(users: User[]): void {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    },

    register(user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = this.getUsers();
                if (users.find(u => u.email === user.email)) {
                    reject(new Error('Email already exists'));
                    return;
                }
                users.push(user);
                this.saveUsers(users);
                resolve();
            }, 1500); // Emulate async
        });
    },

    login(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = this.getUsers();
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
                    resolve(user);
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 1500);
        });
    },

    logout(): void {
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser(): User | null {
        const userJson = localStorage.getItem(CURRENT_USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    },

    updateProfile(email: string, updatedData: Partial<User>): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = this.getUsers();
                const index = users.findIndex(u => u.email === email);
                if (index !== -1) {
                    //@ts-ignore
                    const updatedUser: User = { ...users[index], ...updatedData };
                    users[index] = updatedUser;
                    this.saveUsers(users);
                    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
                    resolve(updatedUser);
                } else {
                    reject(new Error('User not found'));
                }
            }, 1500);
        });
    },

    resetPassword(email: string, newPassword: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = this.getUsers();
                const user = users.find(u => u.email === email);
                if (user) {
                    if (newPassword === user.password) {
                        reject(new Error('New password cannot be the same as old password'));
                        return;
                    }
                    user.password = newPassword;
                    this.saveUsers(users);
                    resolve();
                } else {
                    reject(new Error('Failed to reset password'));
                }
            }, 1500);
        });
    }
};
