<script setup>
import UIButton from '@/components/UI/UIButton.vue';
import { ref } from 'vue'

const searchQuery = ref('');
const emit = defineEmits(['update:searchQuery']);

function updateSearchQuery(event) {
  searchQuery.value = event.target.value
  emit('update:searchQuery', searchQuery.value)
}

</script>

<template>
  <header class="header">
    <div class="header__logo">
      <picture>
        <source srcset="/public/logo.webp" type="image/webp" />
        <img class="header__img" src="/public/logo.png" alt="logo" />
      </picture>
    </div>

    <div class="header__search">
      <svg>
        <use xlink:href="#search"></use>
      </svg>

      <input
        class="header__input"
        type="text"
        placeholder="Search for ..."
        @input="updateSearchQuery"
       />
    </div>

    <div class="header__btn">
      <UIButton modalName="walletModal">Connect wallet</UIButton>
    </div>
  </header>


</template>



<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  height: 56px;
  width: 100%;
  background: #30363d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-radius: 0px 0px 32px 32px;
  z-index: 10;

  &__logo {
    margin-left: 5px;
  }

  &__img {
    width: 38px;
    height: 36px;
  }

  &__search {
    position: relative;
    flex-grow: 1;
    max-width: 100%;
    margin: 0 16px 0 28px;

    svg {
      position: absolute;
      left: 14.5px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
    }
  }

  &__input {
    width: 100%;
    height: 32px;
    padding: 0 0 0 41px;
    background: #1d2228;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;

    &:focus {
      outline: none;
    }
  }

  &__btn {
    width: 126px;
    height: 32px;
  }
}
</style>
