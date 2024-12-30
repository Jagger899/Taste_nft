<script setup>
import { useModalStore } from '@/components/stores/store'

const store = useModalStore()

const close = () => {
  store.closeModal('videoModal')
}
</script>

<template>
  <div v-if="store.modals.videoModal" class="video-modal">
    <div class="video-modal__content">
      <div class="video-modal__close" @click="close"></div>
      <iframe
        :src="store.activeVideoUrl.url"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="video-modal__iframe"
      ></iframe>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/base/base.scss';
@import '@/assets/scss/base/reset.scss';
@import '@/assets/scss/style.scss';
@import '@/assets/scss/base/colors.scss';

.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.video-modal__content {
  position: relative;
  width: 80%;
  height: 80%;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.video-modal__close {
  position: absolute;
  right: 24px;
  height: 16px;
  width: 16px;
  padding: 10px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 8px;
    width: 2px;
    height: 20px;
    border-radius: 2px;
    background: $whiteColor;
    transform: rotate(-45deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 8px;
    width: 2px;
    height: 20px;
    border-radius: 2px;
    background: $whiteColor;
    transform: rotate(45deg);
  }
}

.video-modal__iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
