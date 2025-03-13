<script setup>

import TheHeader from '@/components/base/TheHeader.vue'
import User from '@/components/pages/Creator/User.vue'
import CardsNft from '@/components/pages/main/CardsNft.vue'
import Tabs from '@/components/pages/Creator/Tabs.vue'
import { ref } from 'vue'

const selectedType = ref('auction');
const updateType = (newType) => {
  selectedType.value = newType;
};
</script>

<template>
  <TheHeader/>
  <User/>
  <Tabs @update:type="updateType"/>
  <CardsNft :selected-type="selectedType"/>
</template>



<style lang="scss" scoped>
@import '@/assets/scss/style';


</style>
