
<script setup>
import UIDropdown from '@/components/UI/UIDropdown.vue';
import { nft } from '@/data/nft';
import BasePicture from '@/components/base/BasePicture.vue';
import { ref, computed, onMounted } from 'vue';
import { users } from '@/data/users';
import CountDown from './CountDown.vue';
import { useRouter } from 'vue-router';

const windowWidth = ref(window.innerWidth);
const router = useRouter();

const props = defineProps({
  sort: {
    type: String,
    default: 'Recently added'
  },
  filter: {
    type: String,
    default: 'All'
  },
  reduce: {
    type: String,
    default: 'RedAddTitle'
  },
  pop: {
    type: String,
    default: null
  },
  map: {
    type: String,
    default: 'Default'
  },
  anotherMethods: {
    type: String,
    default: 'Another Methods'
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
  let sortedNft = nft.map(item => ({
    ...item,
    price: {
      ...item.price,
      originalQuantity: item.price.originalQuantity ?? item.price.quantity
    },
    sortInfo: {
      ...item.sortInfo,
      originalActivity: item.sortInfo.originalActivity ?? item.sortInfo.activity,
      originalPopular: item.sortInfo.originalPopular ?? item.sortInfo.popular
    }
  }));

  switch (props.sort) {
    case 'Recently added':
      sortedNft.sort((a, b) => b.sortInfo.recentlyAdded - a.sortInfo.recentlyAdded);
      break;
    case 'Popular':
      sortedNft.sort((a, b) => b.sortInfo.popular - a.sortInfo.popular);
      break;
    case 'The best':
      sortedNft.sort((a, b) => b.sortInfo.best - a.sortInfo.best);
      break;
  }

  switch (props.reduce) {
    case 'RedAddTitle':
      sortedNft.reduce((acc, curr) => {
        if (curr.description.title.includes('Digital') && !curr.description.title.includes('Popular')) {
          curr.description.title += ' Popular';
        } else if (curr.description.title.includes('Paradise') && !curr.description.title.includes('Badly')) {
          curr.description.title += ' Badly';
        } else if (!curr.description.title.match(/\b(Popular|Badly|Initial)\b/)) {
          curr.description.title += ' Initial';
        }
        return acc;
      }, []);
      break;
    case 'RedAddPop':
      sortedNft = sortedNft.map(curr => {
        curr.description.title = curr.description.title.split(' ').slice(0, -1).join(' ');
        return curr;
      });
      break;
  }

  switch (props.map) {
    case 'MapChangeCost':
      sortedNft = sortedNft.map(curr => {
        let num = parseFloat(curr.price.quantity);
        if (num <= 2) curr.price.quantity = num + 8;
        return curr;
      });
      break;
    case 'MapChangePopul':
      sortedNft = sortedNft.map(curr => {
        if (curr.sortInfo.popular <= 5) {
          curr.sortInfo.activity -= 26;
          curr.price.quantity += ' Bad result';
        }
        return curr;
      });
      break;
    case 'Default':
      sortedNft = sortedNft.map(curr => {
        curr.price.quantity = parseFloat(curr.price.originalQuantity) || 0;
        curr.sortInfo.activity = curr.sortInfo.originalActivity || 0;
        curr.sortInfo.popular = curr.sortInfo.originalPopular || 0;

        if (typeof curr.price.quantity === 'string') {
          curr.price.quantity = curr.price.quantity.replace(' Bad result', '');
        }
        return curr;
      });
      break;
  }

  switch (props.filter) {
    case 'Auctions':
      sortedNft = sortedNft.filter(item => item.type === 'auction');
      break;
    case 'Default':
      sortedNft = sortedNft.filter(item => item.type === 'default');
      break;
  }

  switch (props.anotherMethods) {
    case 'Pop':
      sortedNft.pop();
      break;

    case 'Includes':
      sortedNft = sortedNft.filter((item) =>
        console.log(item.description.title.includes('Digital'))
      );
      break;

    case 'Reverse':
      console.log(sortedNft);
      sortedNft.reverse();
      console.log(sortedNft);
      break;

    case 'Another methods':

      sortedNft = nft.map(item => {
        console.log('original', item);
        return { ...item };
      });
      break;

    default:
      break;
  }

  if (props.searchQuery) {
    sortedNft = sortedNft.filter(item =>
      item.description.title.toLowerCase().includes(props.searchQuery.toLowerCase())
    );
  }

  let limit = windowWidth.value < 768 ? 6 : windowWidth.value < 1024 ? 8 : 12;

  return sortedNft.slice(0, limit);
});

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
});

function getUserById(userId) {
  return users.find(user => user.id === userId) || {};
}

function goToArtwork(nftId) {
  router.push({ path: '/artwork', query: { id: nftId } });
}
</script>

<template>
  <section class="nft-cards">

    <div class="container">

      <div v-if="filteredAndSortedNft.length === 0">There is no cards</div>

      <div v-else class="cards">

        <div class="card" v-for="nftInfo in filteredAndSortedNft" :key="nftInfo.id" @click="goToArtwork(nftInfo.id)">

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

            <h2 class="card__title">

              {{ nftInfo.description.title }}



            </h2>

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

  &__title-info {
    color: #8743ff;
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
