import { ref } from 'vue'

export function useTimer(initialTime) {
  const time = ref(initialTime)
  const formattedTime = ref('')

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours}h ${minutes}m ${seconds}s`
  }

  const updateTime = () => {
    if (time.value > 0) {
      time.value--
      formattedTime.value = formatTime(time.value)
    }
  }

  formattedTime.value = formatTime(time.value)

  return {
    time,
    formattedTime,
    updateTime
  }
}



