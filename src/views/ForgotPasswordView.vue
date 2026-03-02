<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { ArrowLeft } from 'lucide-vue-next';
import BaseInput from '../components/BaseInput.vue';

const authStore = useAuthStore();
const email = ref('');
const showedLink = ref(false);

const handleReset = async () => {
  await authStore.forgotPassword(email.value);
  if(!authStore.error){
    showedLink.value = true;
  }
};

onUnmounted(() => authStore.clearMessages())
</script>

<template>
  <div class="glass-card">
    <h1>Reset Password</h1>
    <p class="subtitle">Enter your email and we'll show you a reset link</p>

    <div v-show="authStore.error" class="error-msg">
      {{ authStore.error }}
    </div>

    <div v-if="showedLink" class="success-msg">
      <p>A reset link has been generated:</p>
      <router-link :to="{ name: 'ResetPassword', query: { email } }" class="link" style="display: block; margin-top: 10px; font-weight: bold;">
        Click here to reset your password
      </router-link>
    </div>

    <form v-else @submit.prevent="handleReset">
      <BaseInput v-model="email" label="Email Address" type="email" placeholder="name@company.com" required />

      <button type="submit" class="btn btn-primary" :disabled="authStore.loading">
        <span v-if="authStore.loading" class="loading-spinner"></span>
        <span v-else>Generate Reset Link</span>
      </button>

      <div class="auth-footer">
        <router-link to="/login" class="link" style="display: flex; align-items: center; justify-content: center; gap: 4px;">
          <ArrowLeft :size="16" /> Back to login
        </router-link>
      </div>
    </form>
  </div>
</template>
