<script setup>
import {users} from '@/data/users.js';
import { following } from '@/data/following.js'
import {followers} from '@/data/followers.js'
import { ref } from 'vue'
import BasePicture from '@/components/base/BasePicture.vue'
import BaseSvg from '@/components/base/BaseSvg.vue'
import UIButton from '@/components/UI/UIButton.vue'
import { openPageInNewTab, copyPageLink, getTargetRoute, socialIcons } from '@/components/composable/copyLink.js'
import { useRouter } from 'vue-router'


const currentUser = ref(users[0]);
const currentPage = 'Creator';
const router = useRouter();

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

      <div v-if="currentUser" class="users__info info">

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

              <p class="info__user-name">{{ currentUser.name }}</p>

              <p class="info__user-nick">{{ currentUser.nickname }}</p>
            </div>
          </div>

          <div class="info__advant advant">
            <div class="advant__info">
              <p class="advant__number">234</p>
              <p class="advant__descr">Followers</p>
            </div>

            <div class="advant__info">
              <p class="advant__number">15</p>
              <p class="advant__descr">Following</p>
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

        <div class="socials">
          <div class="social">
            <BaseSvg
              v-for="(icon) in socialIcons"
              :key="icon"
              :id="icon.id"
              class="social__svg"
              @click="handleIconClick(icon)"
            />
          </div>
        </div>

        <h1 class="info__title">
          {{currentUser.description}}</h1>

        <p class="info__copy">
          <span class="info__copy-title">Copy:</span>
          {{currentUser.description}}
        </p>
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
  &__user {
    display: flex;
    gap: 12px;
  }

  &__socials{
    gap: 12px;
    display: flex;
    align-items: center;
  }

  &__top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
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
}

.advant {
  display: flex;
  align-items: center;

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
</style>
