<script setup>
import TheHeader from '@/components/base/TheHeader.vue';
import { nft } from '@/data/nft';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import BasePicture from '@/components/base/BasePicture.vue'
import UIButton from '@/components/UI/UIButton.vue'
import BaseSvg from '@/components/base/BaseSvg.vue'
import CountDown from '@/components/pages/main/CountDown.vue'

const route = useRoute();
const nftId = Number(route.query.id) || 0;

const currentNft = ref(nft.find(item => item.id === nftId));
</script>

<template>
  <TheHeader/>
  <section class="artwork">

    <div class="container">

      <div class="artwork__top">

        <BasePicture
          :srcset="currentNft.photo.webp"
          :src="currentNft.photo.src"
          :width="currentNft.photo.width"
          :height="currentNft.photo.height"
          :alt="currentNft.photo.alt"
        />

        <div class="artwork__top-activity activity">

          <div class="activity__current">

            <p class="activity__title">Current Bid:</p>

            <div class="activity__current-box">

              <BaseSvg id="tongue" class="activity__current-svg"/>

              <div class="activity__current-numbers">

                <span class="activity__current-number">{{ currentNft.price.quantity }}M</span>

                <span class="activity__current-number-desc">{{currentNft.price.value}}</span>

              </div>

            </div>

          </div>
          <div class="activity__ending">
            <p class="activity__title">Auction ending in:</p>
            <CountDown
              class="activity__ending-time"
              v-if="currentNft?.price?.time"
              :initialTime="currentNft.price.time * 3600"
            />
            <p v-else class="activity__ending-time">Sold</p>
          </div>
          <div class="activity__button">

            <UIButton>Place a bid</UIButton>

          </div>

        </div>
      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/style';

.artwork {
  margin-top: 96px;

  @include media-breakpoint-down(xs) {
    padding-top: unset;
    height: 400px;
  }

  &__top-activity {
    margin: 0 auto;
  }
}

.activity {
  width: 518px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
  background: #30363d;
  padding: 16px 20px;

  &__current {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      background: #ffffff26;
      width: 3px;
      height: 43px;
      border-radius: 12px;
      right: -20px;
      bottom: 20px;
    }
  }

  &__current-svg {
    width: 19px;
    height: 19px;
  }

  &__current-box {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__current-numbers {
    display: flex;
    gap: 5px;
  }

  &__current-number {
    font-weight: 600;
    font-size: 16px;
    color: $whiteColor;
  }

  &__current-number-desc {
    font-weight: 600;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
  }

  &__title {
    font-weight: 600;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 8px;
  }

  &__ending-time {
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }

  &__button {
    width: 138px;
    height: 40px;
  }
}
</style>
