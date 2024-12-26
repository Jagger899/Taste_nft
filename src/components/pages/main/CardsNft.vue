<script setup>
import UIDropdown from '@/components/UI/UIDropdown.vue'
import { nft } from '@/data/nft'
import BasePicture from '@/components/base/BasePicture.vue'
import { ref, computed, onMounted } from 'vue'

const sort = ref('Recently added')
const filter = ref('All')
const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

const filteredAndSortedNft = computed(() => {
  let sortedNft = [...nft];

  if (sort.value === 'Recently added') {
    sortedNft.sort((a, b) => b.sortInfo.recentlyAdded - a.sortInfo.recentlyAdded);
  } else if (sort.value === 'Popular') {
    sortedNft.sort((a, b) => b.sortInfo.popular - a.sortInfo.popular);
  } else if (sort.value === 'The best') {
    sortedNft.sort((a, b) => b.sortInfo.best - a.sortInfo.best);
  }

  if (filter.value === 'Auctions') {
    sortedNft = sortedNft.filter((item) => item.type === 'auction')
  } else if (filter.value === 'Default') {
    sortedNft = sortedNft.filter((item) => item.type === 'default')
  }

  console.log(filter.value)

  let limit = 12
  if (windowWidth.value < 1024 && windowWidth.value > 768) {
    limit = 8
  } else if (windowWidth.value < 768) {
    limit = 6
  }
  return sortedNft.slice(0, limit)
})

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})
</script>
<template>
  <section class="nft-cards">
    <div class="container">
      <div class="dropdowns">
        <div class="dropdowns__box">
          <UIDropdown
            :list="['Recently added', 'Popular', 'The best']"
            @submit="(e) => (sort = e)"
          />
        </div>
        <UIDropdown :list="['All', 'Auctions', 'Default']" />
      </div>
      <div class="cards">
        <div class="card" v-for="(nftInfo, index) in filteredAndSortedNft" :key="nftInfo.id">
          <BasePicture
            class="card__img"
            :srcset="nftInfo.photo.webp"
            :src="nftInfo.photo.src"
            :width="nftInfo.photo.width"
            :height="nftInfo.photo.height"
            :lazy="true"
            :alt="nftInfo.photo.alt"
          />
          <!-- <img src="../../../assets/images/nft/0/default.jpg" alt="" class="card__img" /> -->
          <div class="card__info">
            <h2 class="card__title">{{ nftInfo.description.title }}</h2>
            <div class="card__info-sold card__info-sold_first">
              <p class="card__info-text">Sold for:</p>
              <div class="card__info-advant">
                <svg class="card__info-advant-svg">
                  <use xlink:href="#tongue"></use>
                </svg>
                <p class="card__info-advant-number">{{ nftInfo.price.quantity }}M</p>
              </div>
            </div>
            <div class="card__info-sold">
              <p class="card__info-text">Ending in:</p>
              <p class="card__info-advant-number" v-if="nftInfo.price.time">
                {{ nftInfo.price.time }}h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/base/base';
@import '@/assets/scss/base/reset';
@import '@/assets/scss/style';
@import '@/assets/scss/base/colors';

.nft-cards {
}

.dropdowns {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  &__box {
    width: 168px;
  }
}

.cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 60px;

  @include media-breakpoint-down(md) {
    grid-template-columns: repeat(3, 1fr);
  }

  @include media-breakpoint-down(sm) {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 50px;
  }

  @include media-breakpoint-down(xs) {
    grid-template-columns: repeat(1, 1fr);
    margin-bottom: 40px;
  }
}

.card {
  max-width: 317px;
  border: 1px solid #333940;

  &__info {
    padding: 24px 12px 18px;
  }

  &__info-text {
    font-weight: 600;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }

  &__info-sold {
    display: flex;
    justify-content: space-between;

    &_first {
      margin-bottom: 15px;
    }
  }

  &__info-advant {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__info-advant-svg {
    width: 19px;
    height: 19px;
  }

  &__info-advant-number {
    font-weight: 600;
    font-size: 16px;
    color: $whiteColor;
  }

  &__img {
    width: 100%;
    height: 317px;
  }

  &__title {
    font-weight: 700;
    font-size: 20px;
    color: $whiteColor;
    margin-bottom: 17px;
  }
}
</style>
