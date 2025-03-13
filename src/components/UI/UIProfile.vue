<script setup>
import { user } from '@/data/profile.js'
import BasePicture from '@/components/base/BasePicture.vue'
import BaseSvg from '@/components/base/BaseSvg.vue'
import { useModalStore } from '@/components/stores/store';
defineProps(['active', 'adaptive'])

</script>

<template>
  <div class="profile" :class="{ button_adaptive: adaptive }">
    <div class="profile__photo">
      <BasePicture :src="user.photo.src" :alt="user.photo.alt" :srcset="user.photo.srcset" />
    </div>

    <div class="profile__main">
      <h4 class="profile__name">{{ user.name }}</h4>

      <p class="profile__text">
        <span class="profile__nickname">{{ user.nickname }}</span>

        <span class="profile__balance-title">Balance:</span>

        <BaseSvg id="tongue" />

        <span class="profile__balance-sum">{{ user.balance }}</span>
      </p>
    </div>

    <BaseSvg class="profile__arrow" :class="{ button__arrow_active: active }" :id="'dropdown-arrow'" />
  </div>
</template>



<style lang="scss" scoped>
@import '@/assets/scss/style';

.profile {
  position: relative;
  user-select: none;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #30363d;


  &__photo {
    flex-shrink: 0;
    border-radius: 12px;
    overflow: hidden;
    width: 40px;
    height: 40px;
    border: 12px;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
  }

  &__name {
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
    color: $whiteColor;
    text-align: left;
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__text {
    line-height: 16px;
    display: flex;
    margin-top: 3px;
  }

  &__main {
    flex-grow: 1;

    svg {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }

  &__nickname {
    background: linear-gradient(270deg, #8743ff 0%, #d8c2ff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 12px;
    font-weight: 500;
    width: 100%;
    display: block;
    max-width: 70px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 6px;
  }

  &__balance {
    &-title {
      color: $whiteColor;
      opacity: 0.5;
      font-size: 12px;
      font-weight: 600;
      margin-right: 8px;
    }

    &-sum {
      font-size: 12px;
      font-weight: 600;
      color: $whiteColor;
    }
  }

  &__arrow {
    position: absolute;
    right: 0;
    top: 22px;
    width: 10px;
    height: 10px;
    transition: transform 300ms ease 0s;

    &_active {
      transform: rotate(90deg);
    }
  }

  &_adaptive {
    @include media-breakpoint-down(sm) {
      padding: 0;
    }
    .button {
      &__main {
        @include media-breakpoint-down(sm) {
          display: none;
        }
      }

      &__arrow {
        @include media-breakpoint-down(sm) {
          display: none;
        }
      }

      &__photo {
        @include media-breakpoint-down(sm) {
          width: 30px;
          height: 30px;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
