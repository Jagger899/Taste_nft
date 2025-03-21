<script setup>
import { getTargetRoute, socialIcons } from '@/components/composable/copyLink.js'
import BaseSvg from '@/components/base/BaseSvg.vue'
import BasePicture from '@/components/base/BasePicture.vue'
import { users } from '@/data/users.js'
import {nft} from '@/data/nft.js'
import { ref, watch, computed } from 'vue'
import {bids} from '@/data/bids.js';
import { openPageInNewTab, copyPageLink, } from '@/components/composable/copyLink.js'
import { useRouter } from 'vue-router'

const props = defineProps({
  nftId: {
    type: Number,
    required: false
  }
})

const currentUser = ref(users[0]);
const currentNft = ref(nft[0]);
const currentPage = 'usersActivity';
const router = useRouter();

const updateUser = (id) => {
  const foundUser = users.find((user) => user.id === id);
  if (foundUser) {
    currentUser.value = foundUser;
  } else {
    const randomIndex = Math.floor(Math.random() * users.length);
    currentUser.value = users[randomIndex];
  }
}

const updateNft = (id) => {
  const foundNft = nft.find((item) => item.id === id);
  currentNft.value = foundNft || nft[0];
};

watch(
  () => props.nftId,
  (newId) => {
    updateUser(newId);
    updateNft(newId);
  },
  { immediate: true }
)

const sortedBids = computed(() => {
  return [...bids].sort((a, b) => b.price - a.price);
});

const getUserById = (userId) => {
  return users.find(user => user.id === userId) || null;
};

const goToCreatorPage = (userId) => {
  router.push({ path: '/creator', query: { userId } })
}


const handleIconClick = (icon) => {
  switch (icon.route) {
    case 'dynamic':
      router.push({ path: '/creator', query: { id: currentNft.value.id } })
      break;
    case 'copy':
      copyPageLink(currentPage);
      break;
    default:
      openPageInNewTab(icon.route);
  }
};

</script>

<template>
  <section class="users">

    <div class="container">

      <div class="users__inner">

        <div v-if="currentUser" class="users__info info">

          <div class="info__user">

            <div class="info__user-photo">

              <BasePicture
                :srcset="currentUser.photo.webp"
                :width="currentUser.photo.width"
                :height="currentUser.photo.height"
                :src="currentUser.photo.src"
                alt="logo"
              />

            </div>

            <div class="info__user-info">

              <p class="info__user-name">{{ currentUser.name }}</p>

              <p class="info__user-nick">{{ currentUser.nickname }}</p>
            </div>
          </div>

          <h1 class="info__title">
            {{currentNft.description.title}}</h1>

          <p class="info__copy">
            <span class="info__copy-title">Copy:</span>
            {{currentNft.description.count}}
          </p>
          <p class="info__description">
            <span class="info__description-title">Description: </span>
            {{ currentNft.description.text}}
          </p>

          <div class="info__results">
            <div class="info__socials">

              <BaseSvg
                v-for="icon in socialIcons"
                :key="icon"
                :id="icon.id"
                class="info__socials-svg"
                @click="handleIconClick(icon)"
              />
            </div>
          </div>
        </div>

        <div class="users__bids">

          <h2 class="users__bids-title">Activity</h2>

          <div class="users__bids-box">
            <div class="bid" v-for="bid in sortedBids" :key="bid.user">

              <div class="bid__info">

                <div class="bid__user-photo">

                  <BasePicture
                    :srcset="getUserById(bid.user).photo.srcset"
                    :width="getUserById(bid.user).photo.width"
                    :height="getUserById(bid.user).photo.height"
                    :src="getUserById(bid.user).photo.src"
                    :alt="getUserById(bid.user).photo.alt"
                    class="bid__user-photo-pict"
                  />

                </div>

                <div class="bid__info-title-box">

                  <div class="bid__info-title"><span>Bid placed by </span>{{ bid.code }}</div>

                  <div class="bid__info-date">{{ bid.date }}</div>

                </div>

              </div>

              <div class="bid__sum">

                <BaseSvg id="tongue" class="bid__sum-icon-tongue" />

                <p class="bid__sum__quantity">
                  {{bid.quantity}}

                  <span class="bid__sum__quantity-description">({{ bid.price }}$)</span>
                </p>

                <div class="bid__sum-open-button" @click="goToCreatorPage(bid.user)">
                  <BaseSvg id="open" class="bid__sum-icon-open"   />
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/style';

.users {
  margin-top: 96px;
  margin-bottom: 80px;
  overflow: hidden;

  @include media-breakpoint-down(sm) {
    margin-top: 0;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    @include media-breakpoint-down(md) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__bids-box {
    overflow: auto;
    height: 90%;
  }

  &__bids{
    flex: 1 1 60%;
    overflow: hidden;
    width: 100%;
    height: 492px;
  }

  &__bids-title {
    font-weight: 700;
    font-size: 18px;
    color: $whiteColor;
    margin-bottom: 16px;
  }

  &__info {
    display: flex;
    gap: 12px;
    flex-direction: column;
    padding-bottom: 50px;
    width: 516px;

    @include media-breakpoint-down(md) {
      margin: 0 auto;
      width: unset;
    }
  }

  .info {
    &__user {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;

      @include media-breakpoint-down(sm) {
        margin-bottom: 0;
      }
    }

    &__copy {
      font-weight: 500;
      font-size: 14px;
      line-height: 129%;
      color: $whiteColor;
    }

    &__copy-title {
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 12px;
    }

    &__user-photo {
      width: 49px;
      height: 49px;
      box-shadow: 0 0 15px #ffffff26;
      border-radius: 12px;

      img {
        width: 49px;
        height: 100%;
        border-radius: 12px;
      }
    }

    &__user-info {
      display: flex;
      flex-direction: column;
    }

    &__user-name {
      font-weight: 700;
      font-size: 18px;
      color: $whiteColor;
    }

    &__user-nick {
      font-weight: 500;
      font-size: 14px;
      background: linear-gradient(270deg, #8743ff 0%, #d8c2ff 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &__title {
      font-weight: 700;
      font-size: 32px;
      color: $whiteColor;

      @include media-breakpoint-down(sm) {
        font-size: 24px;
      }
    }

    &__description {
      font-weight: 500;
      font-size: 14px;
      line-height: 129%;
      color: $whiteColor;
      display: block;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 72px;
      margin-bottom: 16px;
    }

    &__description-title {
      color: rgba(255, 255, 255, 0.5);
    }

    &__button {
      width: 97px;
      height: 40px;
    }

    &__results {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__sold {
      display: flex;
      gap: 12px;
    }

    &__sold-number {
      display: flex;
      gap: 5px;
    }

    &__sold-number-value {
      font-weight: 600;
      font-size: 16px;
      color: $whiteColor;
    }

    &__sold-text {
      font-weight: 600;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
    }

    &__socials-svg {
      width: 40px;
      height: 40px;
    }

    &__sold-number-svg {
      width: 19px;
      height: 19px;
    }

    &__socials {
      display: flex;
      gap: 12px;
    }
  }

  &__slider-img {
    width: 519px;
    height: 519px;
    object-fit: cover;

    @include media-breakpoint-down(md) {
      width: 400px;
      height: 400px;
    }
  }

  .bid{
    border: 1px solid #30363d;
    min-height: 67px;
    margin: 0 8px 8px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;

    &__info {
      display: flex;
      align-items: center;
      gap:10px;
    }

    &__user-photo{
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.15);
      position: relative;
      width: 32px;
      height: 32px;

      @include media-breakpoint-down(xs) {
        margin: 0 7px 0 10px;
      }

      img {
        width: 32px;
        height: 32px;
        object-fit: cover;
        display: block;
      }

    }

    &__sum-icon-open{
      width: 20px;
      height: 20px;
    }

    &__sum-icon-tongue {
      width: 19px;
      height: 19px;
      margin-right: 6px;
    }

    &__sum-open-button {
      box-shadow: 0 15px 30px 0 rgba(20, 102, 204, 0.16);
      background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
      border-radius: 12px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__info-title {
      font-weight: 700;
      font-size: 20px;
      color: #fff;

      @include media-breakpoint-down(sm) {
        font-size: 16px;
      }

      @include media-breakpoint-down(xs) {
        span {
          display: none;
        }

        font-size: 14px;
      }
    }

    &__info-date {
      font-weight: 500;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);

      @include media-breakpoint-down(sm) {
        font-size: 12px;
      }

      @include media-breakpoint-down(xs) {
        font-size: 10px;
      }
    }

    &__sum {
      display: flex;
      align-items: center;

    }

    &__sum__quantity {
      font-weight: 600;
      font-size: 16px;
      color: #fff;
      margin-right: 16px;

      @include media-breakpoint-down(sm) {
        font-size: 12px;
      }
    }

    &__sum__quantity-description{
      color: rgba(255, 255, 255, 0.5);
    }

  }
}
</style>
