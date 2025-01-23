<template>
  <span>{{ formattedTime }}</span>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useTimer } from '@/components/composable/timer.js';

const props = defineProps({
  initialTime: {
    type: Number,
    required: true
  }
});

const { time, formattedTime, updateTime } = useTimer(props.initialTime);

onMounted(() => {
  const intervalId = setInterval(updateTime, 1000);
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

watch(() => props.initialTime, (newTime) => {
  time.value = newTime;
});
</script>
