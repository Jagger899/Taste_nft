<script setup>
defineProps({
  modelValue: String,
  label: String,
  error: String
});
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">

</style>
