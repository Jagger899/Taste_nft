<script setup>
import { ref, defineEmits } from 'vue';
import {nft} from '@/data/nft.js';

const activeTab = ref('Created');
const emit = defineEmits(['update:type']);
const changeTab = (tab) => {
  activeTab.value = tab;
  emit('update:type', tab);
};

</script>

<template>
  <div class="container">
    <ul class="tabs">
      <li
        class="tabs__item"
        :class="{ '_active': activeTab === 'Created' }"
        @click="changeTab('Created')"
      >
        Created
      </li>
      <li
        class="tabs__item"
        :class="{ '_active': activeTab === 'Collected' }"
        @click="changeTab('Collected')"
      >
        Collected
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/style';
.tabs {
  display: flex;
  gap: 24px;

  &__item{
    font-size: 18px;
    font-weight: 700;
    color: #ffffff80;
    margin-bottom: 24px;
    transition: color .3s ease;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;

    &._active {
      color:$whiteColor;
    }
  }
}
</style>
