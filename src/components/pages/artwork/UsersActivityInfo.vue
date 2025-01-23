<script setup>

import { socialIcons } from '@/components/composable/copyLink.js'
import BaseSvg from '@/components/base/BaseSvg.vue'
import BasePicture from '@/components/base/BasePicture.vue'
import UIButton from '@/components/UI/UIButton.vue'
import { users } from '@/data/users.js'
import { ref, watch } from 'vue'

const props = defineProps({
  nftId: {
    type: Number,
    required: false
  }
});

const currentUser = ref(users[0]);

const updateUser = (id) => {
  const foundUser = users.find(user => user.id === id);
  if (foundUser) {
    currentUser.value = foundUser;
  } else {
    const randomIndex = Math.floor(Math.random() * users.length);
    currentUser.value = users[randomIndex];
  }
};

watch(() => props.nftId, (newId) => {
  updateUser(newId);
}, { immediate: true});

</script>

<template>
  <section class="users">

    <div class="container">

      <div class="info__inner">

        <div v-if="currentUser" class="promo__info info">

          <div class="info__user">

            <BasePicture
              :srcset="currentUser.photo.webp"
              :width="currentUser.photo.width"
              :height="currentUser.photo.height"
              :src="currentUser.photo.src"
              alt="logo"
            />

            <div class="info__user-info">

              <p class="info__user-name">{{ currentUser.name }}</p>

              <p class="info__user-nick">{{ currentUser.nickname }}</p>

            </div>

          </div>

          <h1 class="info__title">WFH - art name</h1>

          <p class="info__description">
            {{ currentUser.description }}
          </p>

          <div class="info__results">

            <div class="info__sold">

              <p class="info__sold-text">Sold for:</p>

              <div class="info__sold-number">

                <BaseSvg id="tongue" class="info__sold-number-svg"/>

                <p class="info__sold-number-value">{{ currentUser.sales.quantity }}M</p>

              </div>

            </div>

            <div class="info__socials">

              <div class="info__button">

                <UIButton>View</UIButton>

              </div>

              <BaseSvg
                v-for="(icon) in socialIcons"
                :key="icon"
                :id="icon.id"
                class="info__socials-svg"
                @click="icon.action(icon.route)"
              />

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

  &__inner {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    @include media-breakpoint-down(md) {
      flex-direction: column;
      align-items: center;
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

    img {
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
      margin-bottom: 16px;
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
}
</style>
