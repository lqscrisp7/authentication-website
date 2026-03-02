<script setup lang="ts">
import { onUnmounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import BaseInput from '../components/BaseInput.vue';

const router = useRouter();
const authStore = useAuthStore();

const step = ref(1);

const formData = ref({
  email: '',
  password: '',
  name: '',
  phone: '',
  address: '',
  age: 0,
  gender: 'male' as const,
});

const nextStep = () => {
  if (step.value < 3) step.value++;
};

const prevStep = () => {
  if (step.value > 1) step.value--;
};

const handleRegister = async () => {
 await authStore.register({...formData.value, createdAt: new Date().toISOString()});
 setTimeout(() => {
  authStore.clearMessages()
  router.push('/login')
 }, 2000);
};

onUnmounted(() => authStore.clearMessages())
</script>

<template>
  <div class="glass-card">
    <h1>Join Us</h1>
    <p class="subtitle">Step {{ step }} of 3: {{ step === 1 ? 'Credentials' : step === 2 ? 'Personal Info' : 'Confirmation' }}</p>

    <div v-if="authStore.error" class="error-msg" style="margin-bottom: 1.5rem;">
      {{ authStore.error }}
    </div>

    <div v-if="authStore.successMessage" class="success-msg">
      {{ authStore.successMessage }}
    </div>

    <!-- Progress Bar -->
    <div style="display: flex; gap: 8px; margin-bottom: 2rem;">
      <div v-for="i in 3" :key="i" :style="{
        flex: 1,
        height: '4px',
        borderRadius: '2px',
        background: i <= step ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
        transition: 'all 0.3s ease'
      }"></div>
    </div>

    <form @submit.prevent="step === 3 ? handleRegister() : nextStep()">
      <!-- Step 1: Email & Password -->
      <div v-if="step === 1">
        <BaseInput 
          v-model="formData.email" 
          label="Email Address" 
          type="email" 
          placeholder="name@company.com" 
          required 
        />
        
        <BaseInput 
          v-model="formData.password" 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          required 
        />
        <!-- TODO: Add password strength indicator -->
      </div>

      <!-- Step 2: Details -->
      <div v-if="step === 2">
        <BaseInput 
          v-model="formData.name" 
          label="Full Name" 
          placeholder="John Doe" 
          required 
        />
        
        <BaseInput 
          v-model="formData.phone" 
          label="Phone Number" 
          type="tel" 
          placeholder="+1 (555) 000-0000" 
          required 
        />

        <BaseInput 
          v-model="formData.address" 
          label="Address" 
          placeholder="123 Main St" 
          required 
        />
        
        <div style="display:flex; justify-content: space-between;column-gap: 10px;">
            <div style="width: 50%;">
              <BaseInput 
                v-model="formData.age" 
                label="Age" 
                type="number" 
                required 
                min="1" 
              />
            </div>
            <div class="input-group" style="width: 50%;">
                <label>Gender</label>
                <select v-model="formData.gender" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
      </div>

      <!-- Step 3: Summary -->
      <div v-if="step === 3">
        <div style="background: rgba(255,255,255,0.02); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <h3 style="margin-bottom: 1rem; font-size: 1rem;">Verification Summary</h3>
          <div style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.8;">
            <p><strong>Email:</strong> {{ formData.email }}</p>
            <p><strong>Name:</strong> {{ formData.name }}</p>
            <p><strong>Phone:</strong> {{ formData.phone }}</p>
            <p><strong>Address:</strong> {{ formData.address }}</p>
            <p><strong>Age:</strong> {{ formData.age }}</p>
            <p><strong>Gender:</strong> {{ formData.gender.replace(/\b\w/gi, c => c.toUpperCase()) }}</p>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; margin-top: 2rem;">
        <button v-if="step > 1" type="button" @click="prevStep" class="btn btn-secondary">
          Back
        </button>
        <button type="submit" class="btn btn-primary" :disabled="authStore.loading">
          <span v-if="authStore.loading" class="loading-spinner"></span>
          <span v-else>
            <!-- TODO: Add comprehensive form validation before proceeding to the next step -->
            {{ step === 3 ? 'Confirm Registration' : 'Next Step' }}
          </span>
        </button>

      </div>

      <div v-if="step === 1" class="auth-footer">
        Already have an account? 
        <router-link to="/login" class="link">Sign in</router-link>
      </div>
    </form>
  </div>
</template>
