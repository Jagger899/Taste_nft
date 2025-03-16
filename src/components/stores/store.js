import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const modals = reactive({
    walletModal: false,
    walletCompleteModal: false,
    videoModal: false,
    searchModal: false,
    placeBidModal: false,
    createModal: false,
  })

  const activeVideoUrl = reactive({
    url: ''
  });

  const isProfileVisible = ref(false);
  const isCreateProfileVisible = ref(false);
  const isLoggedIn = ref(false);

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

  const showProfile = () => {
    isProfileVisible.value = true;
    isLoggedIn.value = true;
  }

  const logout = () => {
    isLoggedIn.value = false;
    isProfileVisible.value = false;
  };

  const showCreateProfile = () => {
    isCreateProfileVisible.value = true;
  };

  const hideCreateProfile = () => {
    isProfileVisible.value = false;
  };

  return {
    modals,
    activeVideoUrl,
    openModal,
    closeModal,
    isProfileVisible,
    showProfile,
    isLoggedIn,
    logout,
    showCreateProfile,
    hideCreateProfile,
    isCreateProfileVisible
  }
})
