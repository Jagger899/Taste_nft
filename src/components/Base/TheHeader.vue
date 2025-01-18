<script setup>
import UIButton from '@/components/UI/UIButton.vue'
import { ref, watch } from 'vue'
import { useModalStore } from '../stores/store'
import BaseSvg from '@/components/base/BaseSvg.vue'

const searchQuery = ref('');
const emit = defineEmits(['update:searchQuery']);
const store = useModalStore();

function updateSearchQuery(event) {
  searchQuery.value = event.target.value;
  emit('update:searchQuery', searchQuery.value);

  if (searchQuery.value.trim() !== '') {
    store.openModal('searchModal');
  }
}

function clearSearchQuery() {
  searchQuery.value = ''
  emit('update:searchQuery', searchQuery.value);
  store.closeModal('searchModal');
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
<!--      <svg class="header__search-svg">-->
<!--        <use xlink:href="#search"></use>-->
<!--      </svg>-->

      <BaseSvg class="header__search-svg" id="search"/>

      <input
        class="header__input"
        type="text"
        placeholder="Search for ..."
        v-model="searchQuery"
        @input="updateSearchQuery"
      />

      <div v-if="searchQuery" class="header__clear-input" @click="clearSearchQuery">

        <BaseSvg id="clear-input" class="header__clear-input-svg" />

        <p class="header__clear-input-text">Clear</p>

      </div>

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
  }

  &__search-svg {
    position: absolute;
    left: 14.5px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
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

  &__clear-input {
    display: flex;
    align-items: center;
    gap: 4px;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  &__clear-input-svg {
    width: 11px;
    height: 11px;
  }

  &__clear-input-text {
    font-weight: 600;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
