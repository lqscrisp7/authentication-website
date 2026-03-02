import { defineStore } from 'pinia';
import type { AuthState, User } from '../types';
import { authService } from '../services/authService';

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: authService.getCurrentUser(),
        isLoggedIn: !!authService.getCurrentUser(),
        loading: false,
        error: null,
        successMessage: null,
    }),

    actions: {
        async login(email: string, password: string) {
            this.loading = true;
            this.error = null;
            try {
                const user = await authService.login(email, password);
                this.user = user;
                this.isLoggedIn = true;
                this.successMessage = 'Login successful!';
            } catch (err: any) {
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async register(user: User) {
            this.loading = true;
            this.error = null;
            try {
                await authService.register(user);
                this.successMessage = 'Registration successful! You can now login.';
            } catch (err: any) {
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        logout() {
            authService.logout();
            this.user = null;
            this.isLoggedIn = false;
            this.successMessage = 'Logged out successfully.';
        },

        async updateProfile(data: Partial<User>) {
            if (!this.user) return;
            this.loading = true;
            this.error = null;
            try {
                const updatedUser = await authService.updateProfile(this.user.email, data);
                this.user = updatedUser;
                this.successMessage = 'Profile updated successfully!';
            } catch (err: any) {
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        clearMessages() {
            this.error = null;
            this.successMessage = null;
        },

        async forgotPassword(email: string) {
            this.loading = true;
            this.error = null;
            try {
                await new Promise(r => setTimeout(r, 1500))
                const users = authService.getUsers()
                const user = users.find((user: User) => user.email === email);
                if (!user) {
                    this.error = 'User not found.';
                    return;
                }
            } catch (err: any) {
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async resetPassword(email: string, password: string) {
            this.loading = true;
            this.error = null;
            try {
                await authService.resetPassword(email, password);
                this.successMessage = 'Password reset successful! You can now login.';
            } catch (err: any) {
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        }
    }
});
