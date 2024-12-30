// import { defineStore } from 'pinia'
// import { reactive } from 'vue'

// export const useModalStore = defineStore('modal', () => {
//   const modals = reactive({
//     walletModal: false,
//     walletCompleteModal: false,
//   })
//   const openModal = (modalName) => {
//     modals[modalName] = true;

//   }
//   const closeModal = (modalName) => {
//     modals[modalName] = false;
//   }

//   return {
//     modals,
//     openModal,
//     closeModal
//   }
// })

import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const modals = reactive({
    walletModal: false,
    walletCompleteModal: false,
    videoModal: false
  })

  const activeVideoUrl = reactive({
    url: ''
  })

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

  return {
    modals,
    activeVideoUrl,
    openModal,
    closeModal
  }
})
