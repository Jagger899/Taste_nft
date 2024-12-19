<script setup>
import UIButton from './UIButton.vue'
import { defineProps, defineEmits } from 'vue'
import SvgManager from '../base/SvgManager.vue'

const props = defineProps({
  visible: Boolean,
  cards: {
    type: Array,
    default: () => []
  }
})

const close = () => {
  emit('update:visible', false)
}

const emit = defineEmits(['update:visible'])
</script>

<template>
  <SvgManager />
  <div v-if="visible" class="wallet-modal">
    <div class="wallet-modal__content">
      <span class="wallet-modal__close" @click="close">&times;</span>
      <!-- <svg>
        <use xlink:href="close-modal"></use>
      </svg> -->
      <h2 class="wallet-modal__title">Connecting wallet</h2>
      <ul class="wallet-modal__cards">
        <li class="wallet-modal__card card" v-for="(item, index) in cards" :key="index">
          <div class="wallet-modal__number">{{ index + 1 }}</div>
          <div class="card__video"></div>
          <h3 class="card__description">{{ item.description }}</h3>
        </li>
      </ul>
      <div class="wallet-modal__button"><UIButton>Connect wallet</UIButton></div>
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
  top: 65px;
  left: 50%;
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
    height: 354px;
    margin: 0 auto;
    border-radius: 32px;
  }

  &__close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
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
    top: -18px;
    left: -4px;
    font-size: 20px;
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
