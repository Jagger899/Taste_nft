<script setup>
import { useModalStore } from '@/components/stores/store.js'

import UIButton from '@/components/UI/UIButton.vue'
import { ref, computed, watch } from 'vue'

const store = useModalStore()
const close = function () {
  store.closeModal('placeBidModal');
}

const input = ref('');
const maxValue = 1000000;
const price = computed(() => {
  const value = parseFloat(input.value);
  return !isNaN(value) ? (value / 43).toFixed(2) : '0';
})

const isValid = ref(false);

watch(input, (newValue) => {
  console.log(input.value)
  const numberValue = newValue
    .split('')
    .filter(char => !isNaN(char) && char !== ' ')
    .join('');
  input.value = numberValue;
  console.log(input.value)

  if (numberValue === '' || isNaN(parseFloat(numberValue)) || parseFloat(numberValue) > maxValue) {
    isValid.value = false;
    console.log(isValid.value)
  } else {
    isValid.value = true;
    console.log(isValid.value)
  }
});

const openCompleteModal = function() {
  store.closeModal('placeBidModal');
  store.openModal('walletCompleteModal');
  setTimeout(() => {
    store.closeModal('walletCompleteModal');
  }, 2000);
};

</script>

<template>
  <div class="place-modal" v-if="store.modals.placeBidModal">

    <div class="place-modal__content">

      <h2 class="place-modal__title">Place a bid</h2>

      <div class="place-modal__close" @click="close"></div>

      <div class="order">

        <h3 class="order__title">Min.sum</h3>

        <div class="order__box">

          <form action="" class="order__form" >

            <input type="text" class="order__form-input" v-model="input"/>
            <span class="error" v-if="!isValid && input.value !== ''">Enter only number not exceeding 1,000,000</span>
          </form>
          <p class="order__price">({{price}}$)</p>
        </div>

        <div class="order__button">
          <UIButton :disabled="!isValid" @click="openCompleteModal">Place</UIButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/style';

.place-modal {
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

  &__content {
    box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
    padding: 45px 28px 32px 31px;
    background: #30363d;
    width: 653px;
    height: 268px;
    margin: 0 auto;
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    @include media-breakpoint-down(sm) {
      height: 200px;
      width: 400px;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    color: $whiteColor;
  }

  .place-modal__close {
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
}

.order {
  &__title {
    font-weight: 600;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 8px;
  }

  &__box {
    display: flex;
    align-items: center;
    margin-bottom: 31px;
    gap: 10px;
    width: 600px;

    @include media-breakpoint-down(xs) {
      display: block;
      margin-bottom: 20px;
    }
  }

  &__form {
    margin-right: 10px;
    position: relative;
    @include media-breakpoint-down(xs) {
      margin-bottom: 20px;
    }

    &:before {
      content: 'TASTE';
      position: absolute;
      right: 13px;
      top: 10px;
      color: $whiteColor;
    }

    .error {
      position: absolute;
      color: $whiteColor;
      width: 100%;
      bottom: -60px;
      left: 0;
    }
  }

  &__form-input {
    background: #1d2228;
    border-radius: 8px;
    color: $whiteColor;
    width: 176px;
    height: 40px;
    border: none;
    padding: 0 70px 0 16px;
    font-weight: 600;
    line-height: 19px;

    @include media-breakpoint-down(xs) {
      width: 100%;
    }

    &:focus {
      border: none;
      outline: none;
    }
  }

  &__price {
    font-weight: 600;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
  }

  &__button {
    border-radius: 12px;
    width: 157px;
    height: 40px;
    margin: 0 auto;
  }
}
</style>
