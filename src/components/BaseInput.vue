<script setup lang="ts">
const modelValue = defineModel<string | number>();

defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  min: {
    type: [String, Number],
    default: undefined
  }
});
</script>

<template>
  <div class="input-group">
    <label>{{ label }}</label>
    <input 
      v-model="modelValue" 
      :type="type" 
      :required="required"
      :placeholder="placeholder"
      :min="min"
    />
  </div>
</template>
