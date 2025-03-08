<script setup>
import TheHeader from '@/components/base/TheHeader.vue';
import { nft } from '@/data/nft';
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import BasePicture from '@/components/base/BasePicture.vue'
import UIButton from '@/components/UI/UIButton.vue'
import BaseSvg from '@/components/base/BaseSvg.vue'
import CountDown from '@/components/pages/main/CountDown.vue'
import UIPlaceBidModal from '@/components/UI/UIPlaceBidModal.vue'
import CardsNft from '@/components/pages/main/CardsNft.vue'
import UsersActivityInfo from '@/components/pages/artwork/UsersActivityInfo.vue'
import { users } from '@/data/users.js';

const route = useRoute();
const nftId = ref(Number(route.query.id) || 0);
const showCountDown = ref(true);
const buttonText = ref('Place a bid');


const currentNft = ref(nft.find(item => item.id === nftId) || nft[0]);

const currentUser = ref(users.find(user => user.id === currentNft.value.user) || users[0]);

watch(() => route.query.id, (newId) => {
  const id = Number(newId) || 0;
  currentNft.value = nft.find(item => item.id === id) || nft[0];
  currentUser.value = users.find(user => user.id === currentNft.value.user) || users[0];
});

const handleBidClick = () => {
  showCountDown.value = false;
  buttonText.value = 'Buy art';
};

</script>

<template>
  <TheHeader/>

  <section class="artwork">

    <div class="container">

      <div class="artwork__top">
        <div class="artwork__top-photo">

          <BasePicture
            :srcset="currentNft.photo.webp"
            :src="currentNft.photo.src"
            :width="currentNft.photo.width"
            :height="currentNft.photo.height"
            :alt="currentNft.photo.alt"
          />

        </div>


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
          <div class="activity__ending" v-show="showCountDown">
            <p class="activity__title">Auction ending in:</p>
            <CountDown
              class="activity__ending-time"
              v-if=" currentNft?.price?.time"
              :initialTime="currentNft.price.time * 3600"
            />
            <p v-else class="activity__ending-time">Sold</p>
          </div>
          <div class="activity__button">

            <UIButton @click="handleBidClick" modalName="placeBidModal">{{ buttonText }}</UIButton>

          </div>

        </div>
      </div>
    </div>

  </section>

  <UIPlaceBidModal/>

  <UsersActivityInfo :user="currentUser" :nft="currentNft"/>

  <CardsNft/>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/style';

.artwork {
  margin-top: 96px;

  @include media-breakpoint-down(xs) {
    padding-top: unset;
    height: 400px;
  }



  &__top-photo {
    height: 518px;

    img{
      height: 100%;
    }

    @include media-breakpoint-down(sm) {
      height: 400px;
    }

    @include media-breakpoint-down(xs) {
      height: 250px;
    }
  }

  &__top-activity {
    margin: 0 auto;
    transform: translateY(-50%);

    @include media-breakpoint-down(xs) {
      transform: translateY(-100%);
    }
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

  @include media-breakpoint-down(sm) {
    padding: 10px 10px;
    width: 400px;
    flex-wrap: wrap;
  }

  @include media-breakpoint-down(xs) {
    width: 90%;
  }

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
      bottom: 0;

      @include media-breakpoint-down(sm) {
        right: -10px;
      }

      @include media-breakpoint-down(xs) {
        display: none;
      }
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

    @include media-breakpoint-down(sm) {
      font-size: 12px;
    }
  }

  &__current-number-desc {
    font-weight: 600;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
    @include media-breakpoint-down(sm) {
      font-size: 12px;
    }
  }

  &__title {
    font-weight: 600;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 8px;
  }

  &__ending {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      background: #ffffff26;
      width: 3px;
      height: 43px;
      border-radius: 12px;
      right: -20px;
      bottom: 0;

      @include media-breakpoint-down(sm) {
        right: -10px;
      }

      @include media-breakpoint-down(sm) {
        display: none;
      }
    }
  }

  &__ending-time {
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    text-align: center;

    @include media-breakpoint-down(sm) {
      font-size: 12px;
    }
  }

  &__button {
    width: 138px;
    height: 40px;

    @include media-breakpoint-down(sm) {
      width: 100px;
    }

    @include media-breakpoint-down(xs) {
      align-self: center;
      margin: 12px auto 0;
    }
  }
}
</style>
