import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isModalVisible = ref(false);
  const isCompleteModalVisible = ref(false);
  const showModal = () => {
    isModalVisible.value = true;
  };
  const hideModal = () => {
    isModalVisible.value = false;
  };
  const showCompleteModal = () => {
    isCompleteModalVisible.value = true
  };
  const hideCompleteModal = () => {
    isCompleteModalVisible.value = false
  };

  return {
    isModalVisible,
    showModal,
    hideModal,
    isCompleteModalVisible,
    showCompleteModal,
    hideCompleteModal
  };

})
