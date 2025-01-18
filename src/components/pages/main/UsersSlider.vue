<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Scrollbar } from 'swiper/modules'
import { users } from '@/data/users'
import Users from '../../reusable/Users.vue'
import 'swiper/css/scrollbar'
import 'swiper/css'

const usersSlide = users.filter((user, id) => id < 10);

const modules = [Scrollbar];


</script>

<template>
  <section class="users-slider">
    <div class="container">
      <h2 class="users-slider__title">Featured creators</h2>
      <swiper
        class="user-swiper"
        :slides-per-view="1.1"
        :space-between="16"
        :modules="modules"
        :scrollbar="{
          draggable: true
        }"
        :breakpoints="{
          '320': {
            slidesPerView: 1.1
          },
          '375': {
            slidesPerView: 1.8
          },
          '576': {
            slidesPerView: 2.5
          },
          '768': {
            slidesPerView: 4.1
          },
          '1024': {
            slidesPerView: 5.1
          }
        }"
      >
        <swiper-slide v-for="(user, index) in usersSlide" :key="index">
          <Users :userInfo="user" />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<style lang="scss">
//@import '@/assets/scss/base/base';
//@import '@/assets/scss/base/reset';
//@import '@/assets/scss/style';
//@import '@/assets/scss/base/colors';

@import '@/assets/scss/style';

.users-slider {
  padding-bottom: 66px;
  &__title {
    font-weight: 700;
    font-size: 32px;
    color: $whiteColor;
    margin-bottom: 24px;
  }
}

.user-swiper {
  padding-bottom: 25px;
}
.swiper-slide {
  width: 100%;
}

.swiper-scrollbar {
  width: 100vw !important;
  height: 5px !important;
  left: 0 !important;
  max-width: 100% !important;
  background: unset;

  @include media-breakpoint-down(sm) {
    display: none !important;
  }
}

.swiper-scrollbar-drag {
  background-color: rgba(255, 255, 255, 0.5);
  &:hover {
    background: linear-gradient(270deg, rgb(135, 67, 255), rgb(65, 54, 241) 100%);
  }

  &:active {
    background: linear-gradient(270deg, rgb(135, 67, 255), rgb(65, 54, 241) 100%);
  }
}
</style>
