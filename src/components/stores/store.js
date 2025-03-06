import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const modals = reactive({
    walletModal: false,
    walletCompleteModal: false,
    videoModal: false,
    searchModal: false,
    placeBidModal: false,
  })

  const activeVideoUrl = reactive({
    url: ''
  });
  const isProfileVisible = ref(false);

  const openModal = (modalName, videoUrl = '') => {
    modals[modalName] = true
    if (modalName === 'videoModal') {
      activeVideoUrl.url = videoUrl
    }
  }

  const closeModal = (modalName) => {
    modals[modalName] = false
    if (modalName === 'videoModal') {
      activeVideoUrl.url = ''
    }
  }

  const showProfileAfterDelay = () => {
    setTimeout(() => {
      isProfileVisible.value = true;
    }, 500);
  }

  return {
    modals,
    activeVideoUrl,
    openModal,
    closeModal,
    isProfileVisible,
    showProfileAfterDelay
  }
})
