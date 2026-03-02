<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../store/auth';
import BaseInput from '../components/BaseInput.vue';

const route = useRoute();
const authStore = useAuthStore();

const email = (route.query.email as string) || '';
const newPassword = ref('');
const confirmPassword = ref('');

const handleReset = async () => {
  if (newPassword.value !== confirmPassword.value) {
    authStore.error = "Passwords do not match";
    return;
  }
  
  await authStore.resetPassword(email, newPassword.value);
};
</script>

<template>
  <div class="glass-card">
    <h1>New Password</h1>
    <p class="subtitle">Resetting password for <strong>{{ email }}</strong></p>

    <div v-show="authStore.error" class="error-msg" style="margin-bottom: 1.5rem;">
      {{ authStore.error }}
    </div>

    <div v-show="authStore.successMessage" class="success-msg" style="display: flex; flex-direction: column; row-gap: 5px;">
      {{ authStore.successMessage }}
      <router-link to="/login" class="link">Login Now</router-link>
    </div>

    <form v-if="!authStore.successMessage" @submit.prevent="handleReset">
      <BaseInput v-model="newPassword" label="New Password" type="password" placeholder="••••••••" required />
      <BaseInput v-model="confirmPassword" label="Confirm New Password" type="password" placeholder="••••••••" required />

      <button type="submit" class="btn btn-primary" :disabled="authStore.loading">
        <span v-if="authStore.loading" class="loading-spinner"></span>
        <span v-else>Update Password</span>
      </button>
    </form>
  </div>
</template>
