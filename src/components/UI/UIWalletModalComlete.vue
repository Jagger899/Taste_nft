<script setup>
import { useModalStore } from '@/components/stores/store'
import BaseSvg from '@/components/base/BaseSvg.vue'
import { onMounted, onUnmounted } from 'vue'

const store = useModalStore();

const close = () => {
  store.closeModal('walletCompleteModal');
  console.log('Closing modal...');
};

</script>

<template>

  <div v-if="store.modals.walletCompleteModal" class="wallet-complete">

    <div class="wallet-modal__content">

      <div class="wallet-modal__close" @click="close"></div>

      <h2 class="wallet-modal__title">Connecting wallet</h2>

      <div class="wallet-complete__img-box">
        <img src="../../assets/fox.png" alt="fox" class="wallet-complete__img" />
        <BaseSvg class="wallet-complete__svg" id="circle-load" />
      </div>
      <h3 class="wallet-complete__description">Initializing</h3>

    </div>

  </div>

</template>

<style lang="scss">
@import "@/assets/scss/style";

.wallet-complete {
  position: fixed;
  // display: none;
  display: block;
  padding-top: 65px;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  overflow: auto;

  &__img-box {
    position: relative;
    margin-bottom: 10px;
    width:60px;
    height:60px;
  }

  &__svg {
    width: 60px;
    height: 60px;
    position: absolute;
    left: 0;
    animation: rotate 900ms linear infinite;
  }

  &__img {

  }

  &__description {
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: $whiteColor;
    max-width: 177px;
  }
}

.wallet-modal__content {
  box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
  padding: 45px 28px 32px 31px;
  background: #30363d;
  width: 653px;
  // height: 354px;
  margin: 0 auto;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.wallet-modal__title {
  color: $whiteColor;
  text-align: center;
  margin-bottom: 40px;
}

.wallet-modal__close {
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
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
