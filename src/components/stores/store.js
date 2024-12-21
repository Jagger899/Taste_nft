import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const modals = reactive({
    walletModal: false,
    walletCompleteModal: false
  })
  const openModal = (modalName) => {
    modals[modalName] = true;

  }
  const closeModal = (modalName) => {
    modals[modalName] = false;
  }

  return {
    modals,
    openModal,
    closeModal
  }
})
