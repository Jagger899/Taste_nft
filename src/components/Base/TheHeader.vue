<script setup>
import UIButton from '@/components/UI/UIButton.vue'
import { ref,computed,onMounted, onUnmounted } from 'vue'
import { useModalStore } from '../stores/store'
import BaseSvg from '@/components/base/BaseSvg.vue'
import UIProfile from '@/components/UI/UIProfile.vue'
import { user } from '@/data/profile.js'
import { useRouter } from 'vue-router'

const searchQuery = ref('');
const emit = defineEmits(['update:searchQuery']);
const store = useModalStore();
const router = useRouter();

const showProfileMenu = ref(false);
const isLoggedIn = ref(true);

function goToCreator() {
  showProfileMenu.value = false;
  router.push('/creator')
}

function updateSearchQuery(event) {
  searchQuery.value = event.target.value;
  emit('update:searchQuery', searchQuery.value);

  if (searchQuery.value.trim() !== '') {
    store.openModal('searchModal');
  }
}

function clearSearchQuery() {
  searchQuery.value = ''
  emit('update:searchQuery', searchQuery.value);
  store.closeModal('searchModal');
}

const buttonText = computed(() => isLoggedIn.value ? 'Artwork' : 'Connect wallet');

function toggleProfileMenu(event) {
  event.stopPropagation();
  showProfileMenu.value = !showProfileMenu.value;
}

function handleClickOutside(event) {
  if (!event.target.closest('.profile-box')) {
    showProfileMenu.value = false;
  }
}

function logout() {
  isLoggedIn.value = false;
  showProfileMenu.value = false;
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__logo">
        <picture>
          <source srcset="/public/logo.webp" type="image/webp" />
          <img class="header__img" src="/public/logo.png" alt="logo" />
        </picture>

      </div>

      <div class="header__search">
        <!--      <svg class="header__search-svg">-->
        <!--        <use xlink:href="#search"></use>-->
        <!--      </svg>-->

        <BaseSvg class="header__search-svg" id="search"/>

        <input
          class="header__input"
          type="text"
          placeholder="Search for ..."
          v-model="searchQuery"
          @input="updateSearchQuery"
        />

        <div v-if="searchQuery" class="header__clear-input" @click="clearSearchQuery">

          <BaseSvg id="clear-input" class="header__clear-input-svg" />

          <p class="header__clear-input-text">Clear</p>

        </div>

      </div>

      <div class="header__btn">

        <UIButton modalName="walletModal">{{ buttonText }}</UIButton>

      </div>
    </div>

    <div class="profile-box" v-if="store.isProfileVisible && isLoggedIn">
      <UIProfile @click="toggleProfileMenu" />

      <ul v-if="showProfileMenu" class="profile__list">
        <li class="profile__list-address">
          Address: <span>{{ user.address }}</span>
        </li>
        <li @click="goToCreator">My profile</li>
        <li>Balance settings</li>
        <li @click="logout" class="profile__list-out">Log out</li>
      </ul>
    </div>

  </header>

</template>

<style lang="scss" scoped>
@import "@/assets/scss/style";
.header {
  position: fixed;
  top: 0;
  height: 56px;
  width: 100%;
  background: #30363d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-radius: 0 0 32px 32px;
  z-index: 10;

  &__inner {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    margin-left: 5px;
  }

  &__img {
    width: 38px;
    height: 36px;
  }

  &__search {
    position: relative;
    flex-grow: 1;
    max-width: 100%;
    margin: 0 16px 0 28px;
  }

  &__search-svg {
    position: absolute;
    left: 14.5px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
  }

  &__input {
    width: 100%;
    height: 32px;
    padding: 0 0 0 41px;
    background: #1d2228;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;

    &:focus {
      outline: none;
    }
  }

  &__btn {
    width: 126px;
    height: 32px;
  }

  &__clear-input {
    display: flex;
    align-items: center;
    gap: 4px;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  &__clear-input-svg {
    width: 11px;
    height: 11px;
  }

  &__clear-input-text {
    font-weight: 600;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }
}

.profile {
  &__list {
    position: absolute;
    top: 0;
    width: 279px;
    height: 172px;
    z-index: -1;
    border-radius: 12px;
    box-shadow: 0 25px 40px 0 rgba(20, 102, 204, 0.16);
    background: #30363d;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 12px 20px 12px;

    @include media-breakpoint-down(xs) {
      width: 60vw;
    }

    li {
      font-size: 14px;
      font-weight: 600;
      margin-top: 8px;
      cursor: pointer;
      user-select: none;
    }

    &-address {
      opacity: 0.5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &-out {
      color: #FF5E54;
    }
  }
}

.profile-box {
  position: relative;
}

</style>
