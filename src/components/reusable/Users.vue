<script setup>
import BasePicture from '@/components/base/BasePicture.vue'
const props = defineProps(['userInfo'])
</script>

<template>
  <div class="users">
    <div class="users__image">
      <BasePicture
        :srcset="userInfo.photo.webp"
        :src="userInfo.photo.src"
        :alt="userInfo.photo.alt"
        :lazy="true"
        :width="73"
        :height="73"
      />
    </div>

    <div class="users__title">
      {{ userInfo.name }}
    </div>
    <div class="users__email">
      {{ userInfo.nickname }}
    </div>

    <div class="users__sales">
      {{ userInfo.sales.quantity }} sales on {{ userInfo.sales.sum }}ETH
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/base/base';
@import '@/assets/scss/base/reset';
@import '@/assets/scss/style';
@import '@/assets/scss/base/colors';

.users {
  border: 1px solid #333940;
  height: 100%;
  width: 100%;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    .users__image {
      @include media-breakpoint-up(md) {
        box-shadow: 0 0 30px 0 rgba(255, 255, 255, 0.15);
      }
    }
  }

  &__image {
    margin: 10% auto 7%;
    width: 33%;
    aspect-ratio: 1/ 1;
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    transition: box-shadow 300ms ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
      overflow: hidden;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin: 0 auto;
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    color: $whiteColor;

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      background: $whiteColor;
    }
  }

  &__email {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.6;
    text-align: center;
    margin: 0 auto;
    max-width: 80%;
    background: linear-gradient(270deg, #8743ff 0%, #d8c2ff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__sales {
    font-weight: 600;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    margin: 3px auto 8%;
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
