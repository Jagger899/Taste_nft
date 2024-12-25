<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import CoverflowSlider from './PromoSLider.vue'
import { users } from '@/data/users.js'
import { ref } from 'vue'

const currentUser = ref(users[0])
console.log(currentUser.value)

const updateUser = function(nft){
  const userId = nft.user
  currentUser.value = users.find((user) => user.id === userId)
}
</script>

<template>
  <section class="promo">
    <div class="container">
      <div class="promo__inner">
        <div v-if="currentUser" class="promo__info info">
          <div class="info__user">
            <picture>
              <source :srcset="currentUser.photo.srcset" type="image/webp" />
              <img
                class="info__user-img"
                :src="currentUser.photo.src"
                :alt="currentUser.photo.alt"
              />
            </picture>
            <div class="info__user-info">
              <p class="info__user-name">{{ currentUser.name }}</p>
              <p class="info__user-nick">{{ currentUser.nickname }}</p>
            </div>
          </div>
          <h1 class="info__title">WFH - art name</h1>
          <p class="info__description">
            {{ currentUser.description }}
          </p>
        </div>
        <div class="promo__slider">
          <CoverflowSlider @activeSlide="updateUser" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/base/base';
@import '@/assets/scss/base/reset';
@import '@/assets/scss/style';
@import '@/assets/scss/base/colors';

.promo {
  margin-top: 96px;

  &__inner {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    @include media-breakpoint-down(md) {
      flex-direction: column;
    }
  }

  &__info {
    display: flex;
    gap: 12px;
    flex-direction: column;
    padding-bottom: 50px;
    width: 516px;

    @include media-breakpoint-down(md) {
      margin: 0 auto;
    }
  }

  .info {
    &__user {
      display: flex;
      gap: 12px;
    }

    &__user-img {
      border-radius: 12px;
      width: 49px;
      height: 49px;
      box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.15);
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
    }
  }

  &__slider-img {
    width: 519px;
    height: 519px;
    object-fit: cover;
  }
}
</style>
