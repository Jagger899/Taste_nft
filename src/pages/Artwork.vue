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

              <BaseSvg id="tongue"/>

              <div class="activity__current-numbers">

                <span class="activity__current-number">1,5M</span>

                <span class="activity__current-number-desc">(1308.54$)</span>

              </div>

            </div>

          </div>
          <div class="activity__ending">
            <p class="activity__title">Current Bid:</p>
            <CountDown
              v-if="nft.price.time"
              :initial-time="nft.price.time * 3600"
            />
          </div>
          <div class="activity__button">

            <UIButton>Place a bid</UIButton>

          </div>

        </div>
      </div>
    </div>

  </section>
</template>
