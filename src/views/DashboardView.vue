<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { LogOut, Settings} from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="glass-card" style="max-width: 600px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <h1 style="text-align: left; margin-bottom: 0;">Dashboard</h1>
      <button @click="handleLogout" class="btn btn-secondary" style="width: auto; padding: 8px 16px;">
        <LogOut :size="18" /> Logout
      </button>
    </div>

    <div v-if="authStore.user" style="display: grid; gap: 2rem;">
      <div style="background: rgba(255,255,255,0.02); border-radius: 20px; padding: 2rem; border: 1px solid var(--glass-border);">
        <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold;">
            {{ authStore.user.name?.charAt(0) }}
          </div>
          <div>
            <h2 style="font-size: 1.25rem;">{{ authStore.user.name }}</h2>
            <p style="color: var(--text-muted);">{{ authStore.user.email }}</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
           <div class="btn btn-secondary" @click="router.push('/update-profile')">
             <Settings :size="18" /> Edit Profile
           </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem;">
         <div v-for="tag in ['Active', 'Verified', 'Pro']" :key="tag" 
              style="padding: 12px; border-radius: 12px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); text-align: center; font-size: 0.875rem; color: #818cf8;">
           {{ tag }}
         </div>
      </div>
    </div>
  </div>
</template>
