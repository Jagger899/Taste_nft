<script setup>
import {users} from '@/data/users.js';
import { following } from '@/data/following.js'
import {followers} from '@/data/followers.js'
import { ref } from 'vue'
import { socialIcons } from '@/components/composable/copyLink.js'
import BasePicture from '@/components/base/BasePicture.vue'
import BaseSvg from '@/components/base/BaseSvg.vue'


const currentUser = ref(users[0]);
</script>

<template>
  <section class="info">

    <div class="container">

      <div v-if="currentUser" class="users__info info">

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
          <div class="info__socials">

            <BaseSvg
              v-for="icon in socialIcons"
              :key="icon"
              :id="icon.id"
              class="info__socials-svg"
              @click="icon.action(icon.route)"
            />
          </div>
        </div>
      </div>

    </div>


  </section>
</template>

<style scoped lang="scss">

</style>
