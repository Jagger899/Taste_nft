<script setup>
import { ref, computed } from 'vue'
import { useModalStore } from '../stores/store'
import { nft } from '@/data/nft'
import UIDropdown from '@/components/UI/UIDropdown.vue'
import BasePicture from '@/components/base/BasePicture.vue'
import { users } from '@/data/users'
import { defineProps } from 'vue'
import CountDown from '../pages/main/CountDown.vue'
import UIButton from '../UI/UIButton.vue'
import BaseSvg from '@/components/base/BaseSvg.vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})

const store = useModalStore();
const sort = ref('Recently added');
const filter = ref('All');

const filteredAndSortedNft = computed(() => {
  let sortedNft = [...nft]

  switch (sort.value) {
    case 'Recently added':
      sortedNft.sort((a, b) => b.sortInfo.recentlyAdded - a.sortInfo.recentlyAdded)
      break
    case 'Popular':
      sortedNft.sort((a, b) => b.sortInfo.popular - a.sortInfo.popular)
      break
    case 'The best':
      sortedNft.sort((a, b) => b.sortInfo.best - a.sortInfo.best)
      break
    default:
      break
  }

  switch (filter.value) {
    case 'Auctions':
      sortedNft = sortedNft.filter((item) => item.type === 'auction')
      break
    case 'Default':
      sortedNft = sortedNft.filter((item) => item.type === 'default')
      break
    default:
      break
  }

  if (props.searchQuery.trim() !== '') {
    sortedNft = sortedNft.filter((item) =>
      item.description.title.toLowerCase().includes(props.searchQuery.toLowerCase())
    )
  }

  return sortedNft;
})

function getUserById(userId) {
  return users.find((user) => user.id === userId) || {};
}

function showAllCards() {
  localSearchQuery.value = '';
  emit('update:searchQuery', '');
  sort.value = 'Recently added';
  filter.value = 'All';
}

</script>

<template>
  <div v-if="store.modals.searchModal" class="search" @scroll.prevent="" >

    <div class="container">

      <div class="search__content">

        <div class="search__close" @click="store.closeModal('searchModal')"></div>

        <div class="search__nft-cards">

          <div class="dropdowns">

            <UIDropdown
              :list="['Recently added', 'Popular', 'The best']"
              @submit="(event) => (sort = event)"
            />

            <UIDropdown
              :list="['All', 'Auctions', 'Default']"
              @submit="(event) => (filter = event)"
            />
          </div>

          <div v-if="filteredAndSortedNft.length === 0" class="no-cards">There is no cards</div>

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

                    <BaseSvg id="tongue" class="card__info-advant-svg"/>

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

          <div class="cards__btn">

            <UIButton @click="showAllCards">Show All</UIButton>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<style scoped lang="scss">
//@import '@/assets/scss/base/base';
//@import '@/assets/scss/base/reset';
//@import '@/assets/scss/style';
//@import '@/assets/scss/base/colors';

@import '@/assets/scss/style';

.search {
  position: fixed;
  top: 88px;
  left: 0;
  width: 100%;
  height: calc(100% - 100px);
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 32px 0;

  &__content {
    background: #30363d;
    padding: 10px;
    position: relative;
  }

  &__close {
    position: absolute;
    height: 16px;
    width: 16px;
    padding: 10px;
    cursor: pointer;
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    right: 10px;

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

.search::-webkit-scrollbar {
  width: 0;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 40px;
  }

  &__btn {
    width: 140px;
    height: 40px;
    margin: 0 auto;
    display: block;
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

.no-cards {
  color: $whiteColor;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}

body.modal-open {
  overflow: hidden;
}
</style>
