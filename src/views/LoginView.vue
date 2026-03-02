<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import BaseInput from '../components/BaseInput.vue';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  await authStore.login(email.value, password.value)
  router.push('/dashboard')
};

onUnmounted(() => authStore.clearMessages())
</script>

<template>
  <div class="glass-card">
    <h1>Welcome Back</h1>
    <p class="subtitle">Please enter your details to sign in</p>
    
    <div v-show="authStore.error" class="error-msg">
      {{ authStore.error }}
    </div>

    <form @submit.prevent="handleLogin">
      <BaseInput 
        v-model="email" 
        label="Email Address" 
        type="email" 
        placeholder="name@company.com" 
        required 
      />

      <BaseInput 
        v-model="password" 
        label="Password" 
        type="password" 
        placeholder="••••••••" 
        required 
      />

      <div style="display: flex; justify-content: space-between; margin-bottom: 2rem;">
        <router-link to="/forgot-password" class="link">Forgot password?</router-link>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="authStore.loading">
        <span v-if="authStore.loading" class="loading-spinner"></span>
        <span v-else>Sign In</span>
      </button>

      <div class="auth-footer">
        Don't have an account? 
        <router-link to="/register" class="link">Create an account</router-link>
      </div>
    </form>
  </div>
</template>

