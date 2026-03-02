import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../store/auth';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ForgotPasswordView from '../views/ForgotPasswordView.vue';
import ResetPasswordView from '../views/ResetPasswordView.vue';
import DashboardView from '../views/DashboardView.vue';
import UpdateProfileView from '../views/UpdateProfileView.vue';


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { guestOnly: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: { guestOnly: true },
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPasswordView,
        meta: { guestOnly: true },
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: ResetPasswordView,
        meta: { guestOnly: true },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: { requiresAuth: true },
    },
    {
        path: '/update-profile',
        name: 'UpdateProfile',
        component: UpdateProfileView,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        next('/login');
    } else if (to.meta.guestOnly && authStore.isLoggedIn) {
        next('/dashboard');
    } else {
        next();
    }
});

export default router;
