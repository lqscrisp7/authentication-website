<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { ArrowLeft, Save } from 'lucide-vue-next';
import BaseInput from '../components/BaseInput.vue';

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  name: authStore.user?.name || '',
  phone: authStore.user?.phone || '',
  address: authStore.user?.address || '',
  age: authStore.user?.age || 0,
  gender: authStore.user?.gender || 'male' as const,
});

const handleUpdate = async () => {
  await authStore.updateProfile(formData.value)
  setTimeout(() => {
    authStore.clearMessages()
  }, 2000);
};
</script>

<template>
  <div class="glass-card">
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <button @click="router.push('/dashboard')" class="btn btn-secondary" style="width: auto; padding: 8px;">
            <ArrowLeft :size="20" />
        </button>
        <h1 style="margin: 0; font-size: 1.5rem;">Update Profile</h1>
    </div>

    <div v-show="authStore.error" class="error-msg" style="margin-bottom: 1.5rem;">
      {{ authStore.error }}
    </div>

    <div v-show="authStore.successMessage" class="success-msg">
      {{ authStore.successMessage }}
    </div>

    <form @submit.prevent="handleUpdate">
      <BaseInput v-model="formData.name" label="Full Name" required />
      <BaseInput v-model="formData.phone" label="Phone Number" type="tel" required />
      <BaseInput v-model="formData.address" label="Address" required />

       <div style="display:flex; justify-content: space-between;column-gap: 10px;">
        <BaseInput v-model="formData.age" label="Age" type="number" required min="1" style="width: 50%;"/>
        <div class="input-group" style="width: 50%;">
          <label>Gender</label>
          <select v-model="formData.gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="authStore.loading" style="margin-top: 1rem;">
        <span v-if="authStore.loading" class="loading-spinner"></span>
        <Save v-else :size="18" />
        <span>Save Changes</span>
      </button>
    </form>
  </div>
</template>
