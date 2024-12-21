<script setup>
import { defineProps, defineEmits } from 'vue'
import UIButton from '@/components/UI/UIButton.vue'
import { useModalStore } from '@/components/stores/store'
const props = defineProps({
  visible: Boolean,
  cards: {
    type: Array,
    default: () => []
  }
})

const store = useModalStore()

const close = () => {
  store.closeModal('walletModal')
}

const connectWallet = () => {
  store.closeModal('walletModal')
  store.openModal('walletCompleteModal')
}
</script>

<template>
  <div v-if="store.modals.walletModal" class="wallet-modal">
    <div class="wallet-modal__content">
      <div class="wallet-modal__close" @click="close"></div>
      <h2 class="wallet-modal__title">Connecting wallet</h2>
      <ul class="wallet-modal__cards">
        <li class="wallet-modal__card card" v-for="(item, index) in cards" :key="index">
          <div class="wallet-modal__number">{{ index + 1 }}.</div>
          <div class="card__video">
            <img src="../../assets/images/video-play.svg" alt="play" class="card__video-play">
          </div>
          <h3 class="card__description">{{ item.description }}</h3>
        </li>
      </ul>
      <div class="wallet-modal__button">
        <UIButton @click="connectWallet">Connect wallet</UIButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/base/base.scss';
@import '@/assets/scss/base/reset.scss';
@import '@/assets/scss/style.scss';
@import '@/assets/scss/base/colors.scss';

.wallet-modal {
  position: fixed;
  display: block;
  padding-top: 65px;
  // top: 65px;
  // left: 50%;
  // transform: translate(-50%, 50%);
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  overflow: auto;

  &__content {
    box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
    padding: 45px 28px 32px 31px;
    background: #30363d;
    width: 653px;
    // height: 354px;
    margin: 0 auto;
    border-radius: 32px;
    position: relative;
  }

  &__close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    right: 45px;
  }

  &__close {
    position: absolute;
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

  &__title {
    color: $whiteColor;
    text-align: center;
    margin-bottom: 40px;
  }

  &__cards {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  &__button {
    width: 157px;
    height: 40px;
    margin: 0 auto;
  }

  &__svg {
    margin-left: 0 0 auto auto;
  }

  &__number {
    border-radius: 16px;
    width: 40px;
    height: 40px;
    background: $whiteColor;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 4;
    top: -18px;
    left: -4px;
    font-size: 20px;
    font-weight: 700;
    color: #1f2b38;
  }
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &__video {
    border-radius: 16px;
    width: 160px;
    height: 90px;
    background: #c4c4c4;
    margin-bottom: 12px;
    position: relative;
  }

  &__video-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  &__description {
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: $whiteColor;
    max-width: 177px;
  }
}
</style>
