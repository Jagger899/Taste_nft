<script setup>
import { ref } from 'vue'
import TheHeader from '@/components/base/TheHeader.vue'
import TheSearch from '@/components/base/TheSearch.vue'
import SvgManager from '@/components/base/SvgManager.vue'
import PromoSLider from './components/pages/main/Promo.vue'
import UIWalletModal from './components/UI/UIWalletModal.vue'
import { useModalStore } from './components/stores/store'
import UIWalletModalComlete from './components/UI/UIWalletModalComlete.vue'
import CardsNft from './components/pages/main/CardsNft.vue'

const store = useModalStore()
const cards = [
  {
    description: 'Описание что нужно посмотреть',
    videoUrl: 'https://www.youtube.com/embed/mrNOYudaMAc?si=TBoNuP_t1F6dOxgu',
  },
  {
    description: 'Описание что нужно сделать',
    videoUrl: 'https://www.youtube.com/embed/mrNOYudaMAc?si=TBoNuP_t1F6dOxgu',
  },
  {
    description: 'Описание, как это сделать',
    videoUrl: 'https://www.youtube.com/embed/3JZ_D3ELwOQ',
  },
];

const searchQuery = ref('');

</script>

<template>
  <div class="app">
    <TheHeader v-model:searchQuery="searchQuery" />

    <TheSearch />

    <!-- <UIWalletModal
      :visible="store.isModalVisible"
      :cards="cards"
      @update:visible="store.hideModal"
    /> -->
    <!-- <UIWalletModalComlete
      :visible="store.isCompleteModalVisible"
      @update:visible="store.hideCompleteModal"
    /> -->

    <teleport to="body">
      <UIWalletModal :cards="cards" />
      <UIWalletModalComlete />
    </teleport>

    <SvgManager />

    <PromoSLider />

    <CardsNft :searchQuery="searchQuery"/>
  </div>
</template>

<style lang="scss"></style>
