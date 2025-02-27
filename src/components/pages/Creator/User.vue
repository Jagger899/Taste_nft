<script setup>
import {users} from '@/data/users.js';
import { following } from '@/data/following.js'
import {followers} from '@/data/followers.js'
import { ref,watch,computed } from 'vue'
import BasePicture from '@/components/base/BasePicture.vue'
import BaseSvg from '@/components/base/BaseSvg.vue'
import UIButton from '@/components/UI/UIButton.vue'
import { openPageInNewTab, copyPageLink, getTargetRoute, socialIcons } from '@/components/composable/copyLink.js'
import { useRouter, useRoute } from 'vue-router'

// const currentUser = ref(users[0]);
const currentFollower = ref(followers[0]);
const currentPage = 'Creator';
const router = useRouter();
const route = useRoute();
const userId = computed(() => Number(route.query.userId));
const currentUser = computed(() => users.find(user => user.id === userId.value) || users[0])
const updateUser = (userId) => {
  const foundUser = users.find(user => user.id === Number(userId))
  currentUser.value = foundUser || users[0]
}

watch(() => route.query.userId, (newUserId) => {
  if (newUserId){
    updateUser(newUserId);
  }
}, { immediate: true });

const handleIconClick = (icon) => {
  switch (icon.route) {
    case 'dynamic':
      router.push(getTargetRoute(currentPage));
      break;
    case 'copy':
      copyPageLink(currentPage);
      break;
    default:
      openPageInNewTab(icon.route)
  }
}
</script>

<template>
  <section class="info">

    <div class="container">

      <div v-if="currentFollower" class="users__info info">

        <div class="info__top-box">
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

              <p class="info__user-name">{{ currentFollower.name }}</p>

              <p class="info__user-nick">{{ currentFollower.nickname }}</p>
            </div>
          </div>

          <div class="info__advant advant">
            <div class="advant__info-box">

              <div class="advant__info">
                <p class="advant__number">{{currentFollower.sales.quantity}}</p>
                <p class="advant__descr">Followers</p>
              </div>

              <div class="advant__info">
                <p class="advant__number">{{currentFollower.sales.sum}}</p>
                <p class="advant__descr">Following</p>
              </div>

            </div>

            <div class="advant__button">

              <UIButton>Follow</UIButton>

            </div>

            <div class="info__socials">

              <BaseSvg
                v-for="(icon) in socialIcons"
                :key="icon"
                :id="icon.id"
                class="info__socials-svg"
                @click="handleIconClick(icon)"
              />

            </div>

          </div>
        </div>

        <ul class="socials">
          <li class="info__social">
            <BaseSvg id="twitch" class="info__social-svg"/>

            <p class="info__social-text">Twitch</p>
          </li>

          <li class="info__social">
            <BaseSvg id="instagram" class="info__social-svg"/>

            <p class="info__social-text">Instagram</p>
          </li>

          <li class="info__social">
            <BaseSvg id="twitter" class="info__social-svg"/>

            <p class="info__social-text">Twitter</p>
          </li>

          <li class="info__social">
            <BaseSvg id="onlyfans" class="info__social-svg"/>

            <p class="info__social-text">OnlyFans</p>
          </li>
        </ul>

        <p class="info__description">
          <span class="info__description-title">Description: </span>
          {{ currentUser.description}}
        </p>

        <div class="info__results">

        </div>
      </div>

    </div>


  </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/style';

.info {
  padding: 96px 0 51px;
  color: $whiteColor;

  @include media-breakpoint-down(md) {
    padding-top: 40px;
  }

  &__user {
    display: flex;
    gap: 12px;
  }

  &__socials{
    gap: 12px;
    display: flex;
    align-items: center;
  }

  &__social {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__social-svg {
    width: 20px;
    height: 20px;
  }

  &__top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      gap: 20px;
    }
  }

  &__user-photo {
    border-radius: 12px;
    width: 49px;
    height: 49px;
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.15);
    position: relative;
    overflow: hidden;
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

  &__socials-svg {
    width: 40px;
    height: 40px;
  }

  &__description {
    max-width: 1061px;
  }
}

.advant {
  display: flex;
  align-items: center;

  @include media-breakpoint-down(sm) {
    flex-direction: column;
    gap: 20px;
  }

  &__info-box {
    display: flex;
  }

  &__info {
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    gap: 2px;
  }

  &__button {
    width:140px;
    height:40px;
    margin-right:12px;
  }

  &__descr{
    font-weight: 400;
    font-size: 14px;
    line-height: 129%;
    color: rgba(255, 255, 255, 0.5);

  }

  &__number {
    font-weight: 600;
    font-size: 14px;
    line-height: 129%;

  }
}

.socials {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;

  @include media-breakpoint-down(sm) {
    display:grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
}
</style>
