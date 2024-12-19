<script setup>
import TheHeader from '@/components/base/TheHeader.vue'
import TheSearch from '@/components/base/TheSearch.vue'
import SvgManager from '@/components/base/SvgManager.vue'
import PromoSLider from './components/pages/main/PromoSlider.vue'
import UIWalletModal from './components/UI/UIWalletModal.vue'
import { useModalStore } from './data/store'
import UIWalletModalComlete from './components/UI/UIWalletModalComlete.vue'


const store = useModalStore()
const cards = [
  { description: 'Описание что нужно посмотреть' },
  { description: 'Описание что нужно сделать' },
  { description: 'Описание, как это сделать' }
]
</script>

<template>
  <div class="app">
    <TheHeader />

    <TheSearch />

    <UIWalletModal :visible="store.isModalVisible" :cards="cards" @update:visible="store.hideModal" />
    <UIWalletModalComlete :visible="store.isCompleteModalVisible" @update:visible="store.hideCompleteModal"/>

    <SvgManager />

    <PromoSLider />
  </div>
</template>

<style lang="scss"></style>
