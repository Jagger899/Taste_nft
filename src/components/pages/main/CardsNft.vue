
<script setup>
import UIDropdown from '@/components/UI/UIDropdown.vue'
import { nft } from '@/data/nft'
import BasePicture from '@/components/base/BasePicture.vue'
import { ref, computed, onMounted, onUnmounted, defineProps } from 'vue'
import { users } from '@/data/users'
import CountDown from './CountDown.vue'

const sort = ref('Recently added');
const filter = ref('All');
const windowWidth = ref(window.innerWidth);

const props = defineProps({
  sort: {
    type: String,
    default: 'Recently added'
  },
  filter: {
    type: String,
    default: 'All'
  },
  searchQuery: {
    type: String,
    default: ''
  }
});

function updateWindowWidth() {
  windowWidth.value = window.innerWidth;
}

const filteredAndSortedNft = computed(() => {
  let sortedNft = [...nft];
  switch (props.sort) {
    case 'Recently added':
      sortedNft.sort((a, b) => b.sortInfo.recentlyAdded - a.sortInfo.recentlyAdded)
      break;
    case 'Popular':
      sortedNft.sort((a, b) => b.sortInfo.popular - a.sortInfo.popular)
      break;
    case 'The best':
      sortedNft.sort((a, b) => b.sortInfo.best - a.sortInfo.best)
      break;
    default:
      break;
  }

  switch (props.filter) {
    case 'Auctions':
      sortedNft = sortedNft.filter((item) => item.type === 'auction')
      break;
    case 'Default':
      sortedNft = sortedNft.filter((item) => item.type === 'default')
      break;
    default:
      break;
  }

  if (props.searchQuery) {
    sortedNft = sortedNft.filter((item) =>
      item.description.title.toLowerCase().includes(props.searchQuery.toLowerCase())
    )
  }

  let limit = 12;

  if (windowWidth.value < 1024 && windowWidth.value > 768) {
    limit = 8;
  } else if (windowWidth.value < 768) {
    limit = 6;
  }
  return sortedNft.slice(0, limit);
})

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
});

function getUserById(userId) {
  return users.find((user) => user.id === userId) || {};
}

</script>

<template>
  <section class="nft-cards">

    <div class="container">

      <div v-if="filteredAndSortedNft.length === 0">There is no cards</div>

      <div v-else class="cards">

        <div class="card" v-for="nftInfo in filteredAndSortedNft" :key="nftInfo.id">

          <div class="info__user">

            <picture>
              <source :srcset="getUserById(nftInfo.user).photo.srcset" type="image/webp" />
              <img
                class="info__user-img"
                :src="getUserById(nftInfo.user).photo.src"
                :alt="getUserById(nftInfo.user).photo.alt"
              />
            </picture>

            <div class="info__user-info">

              <p class="info__user-name">{{ getUserById(nftInfo.user).name }}</p>

              <p class="info__user-nick">{{ getUserById(nftInfo.user).nickname }}</p>

            </div>

          </div>

          <BasePicture
            class="card__img"
            :srcset="nftInfo.photo.webp"
            :src="nftInfo.photo.src"
            :width="nftInfo.photo.width"
            :height="nftInfo.photo.height"
            :lazy="true"
            :alt="nftInfo.photo.alt"
          />

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

              <CountDown
                class="card__info-advant-number"
                v-if="nftInfo.price.time"
                :initial-time="nftInfo.price.time * 3600"
              />

              <p class="card__info-advant-number" v-else>Sold</p>

            </div>

          </div>

        </div>

      </div>

    </div>

  </section>

</template>

<style scoped lang="scss">
@import '@/assets/scss/style';

.nft-cards {
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 40px;
  }
}

.card {
  max-width: 317px;
  border: 1px solid #333940;
  position: relative;

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

.info {
  &__user {
    display: flex;
    gap: 12px;
    position: absolute;
    top: 12px;
    left: 16px;
    background: $whiteColor;
    border-radius: 12px;
    padding: 9px 12px 6px 9px;
  }

  &__user-img {
    border-radius: 8px;
    width: 26px;
    height: 26px;
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.15);
  }

  &__user-info {
    display: flex;
    flex-direction: column;
  }

  &__user-name {
    font-weight: 700;
    font-size: 14px;
    color: #1d2228;
  }

  &__user-nick {
    font-weight: 500;
    font-size: 12px;
    background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
