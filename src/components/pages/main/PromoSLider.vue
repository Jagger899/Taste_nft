<template>
  <div class="slider">

    <swiper
      :effect="'coverflow'"
      class="main-swiper"
      :grabCursor="true"
      @slideChange="(event) => (idActive = event.activeIndex)"
      :slidesPerView="1"
      :coverflowEffect="{
        rotate: -2,
        stretch: '-70%',
        depth: 200,
        modifier: -1,
        slideShadows: false
      }"
      :pagination="true"
      :modules="[EffectCoverflow, Pagination, Navigation]"
    >
      <swiper-slide class="slider__swiper-slide" v-for="(nft, id) in sliderNft" :key="id">

        <BasePicture
          :srcset="nft.photo.webp"
          :width="nft.photo.width"
          :height="nft.photo.height"
          :src="nft.photo.src"
          alt="logo"
        />

      </swiper-slide>

    </swiper>

  </div>

</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { nft } from '@/data/nft.js'
import { ref, watch } from 'vue'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import BasePicture from '@/components/base/BasePicture.vue'
const emit = defineEmits(['activeSlide'])

const sliderNft = nft.filter((nft, id) => id < 5)
const idActive = ref(0)

watch(idActive, () => {
  emit('activeSlide', sliderNft[idActive.value])
})

emit('activeSlide', sliderNft[idActive.value])
</script>

<style lang="scss">
@import '@/assets/scss/base/base';

.slider {
  max-width: 785px;

  @include media-breakpoint-down(lg) {
    max-width: 600px;
    margin: 0 auto;
  }

  @include media-breakpoint-down(md) {
    max-width: 580px;
    margin: 0 auto;
  }

  @include media-breakpoint-down(sm) {
    max-width: 360px;
  }

  @include media-breakpoint-down(xs) {
    max-width: 300px;
  }

  &__swiper-slide {
    img {
      width: 519px;
      height: 519px;
      aspect-ratio: 1/1;
      object-fit: cover;

      @include media-breakpoint-down(md) {
        width: 400px;
        height: 400px;
      }

      @include media-breakpoint-down(sm) {
        width: 100%;
        height: unset;
        aspect-ratio: 1/1;
      }
    }
  }
}

.swiper {
  width: 100%;
  padding-bottom: 45px;


  @include media-breakpoint-down(xs) {
    padding-bottom: 40px;
  }
}

.swiper-slide-active {
  @include media-breakpoint-down(sm) {
  }
}

.swiper-pagination {
  max-width: 640px !important;

  @include media-breakpoint-down(sm) {
    max-width: unset !important;
  }
}

.swiper-pagination-bullet {
  width: 95px;
  height: 5px;
  border-radius: 5px;
  margin: 0 10px 0 0 !important;
  background-color: rgba(255, 255, 255, 0.15);

  @include media-breakpoint-down(sm) {
    width: 10%;
  }
}

.swiper-pagination-bullet-active {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
