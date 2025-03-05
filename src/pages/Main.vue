<script setup>
import PromoSLider from '@/components/pages/main/Promo.vue';
import CardsNft from '@/components/pages/main/CardsNft.vue';
import UsersSlider from '@/components/pages/main/UsersSlider.vue';
import UIDropdown from '@/components/UI/UIDropdown.vue';
import { ref } from 'vue'

const sort = ref('Recently added');
const filter = ref('All');
const reduce = ref('RedAddTitle');
const pop = ref(null);
const map = ref('Default');
const anotherMethods = ref('AnotherMethods');
</script>

<template>
  <div class="main">
    <PromoSLider />
    <div class="container">
      <div class="dropdowns">

        <div class="dropdowns__box">

          <UIDropdown
            :list="['Recently added', 'Popular', 'The best']"
            @submit="(event) => (sort = event)"
          />

        </div>

        <UIDropdown
          :list="['All', 'Auctions', 'Default']"
          @submit="(event) => (filter = event)"
        />

        <UIDropdown
          :list="['RedAddTitle', 'RedAddPop']"
          @submit="(event) => (reduce = event)"
        />
        <UIDropdown
          :list="['Default', 'MapChangeCost', 'MapChangePopul']"
          @submit="(event) => (map = event)"
        />
        <UIDropdown
          :list="['Another methods', 'Pop', 'Includes','Reverse']"
          @submit="(event) => (anotherMethods = event)"
        />
      </div>
    </div>

    <CardsNft
      :sort="sort"
      :filter="filter"
      :reduce="reduce"
      :pop="pop"
      :map="map"
      :another-methods="anotherMethods"
    />

    <UsersSlider />
  </div>
</template>

<style lang="scss" scoped>
.dropdowns {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  &__box {
    width: 168px;
  }
}
</style>

