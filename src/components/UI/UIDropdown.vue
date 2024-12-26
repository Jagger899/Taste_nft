<template>
  <div
    ref="currentDrop"
    @click="toggleActive"
    :class="{ dropdown_active: dropActive }"
    class="dropdown"
  >
    <div class="dropdown__button">
      <span>{{ selected || list[0] }}</span>

      <svg class="dropdown__svg">
        <use xlink:href="#dropdown-arrow"></use>
      </svg>
    </div>
    <ul class="dropdown__list">
      <li class="dropdown__item" @click="select(item)" v-for="(item, id) in list" :key="id">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
defineProps(['list'])
const emit = defineEmits(['submit'])

let dropActive = ref(false)
const selected = ref('')
const currentDrop = ref(null)


function select(item) {
  selected.value = item;
  dropActive.value = false;
  emit('submit', item);
}

onMounted(() => window.addEventListener('click', checkClick))

function toggleActive() {
  dropActive.value = !dropActive.value
}
function checkClick(event) {
  if (dropActive.value && !currentDrop.value.contains(event.target)) {
    dropActive.value = false
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/base/base.scss';
@import '@/assets/scss/base/reset.scss';
@import '@/assets/scss/style.scss';
@import '@/assets/scss/base/colors.scss';

.dropdown {
  position: relative;
  font-size: 14px;
  width: 160px;
  cursor: pointer;
  user-select: none;

  @include media-breakpoint-down(xs) {
    width: 140px;
    font-size: 12px;
  }

  &__svg {
    width: 8px;
    height: 5px;
    fill: $whiteColor;
  }

  &__button {
    width: 100%;
    height: 40px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    justify-content: space-between;

    @include media-breakpoint-down(xs) {
      height: 35px;
    }

    @include media-breakpoint-down(xxs) {
      padding: 0 15px;
    }

    span {
      width: 100%;
      text-align: center;
      font-weight: 700;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: $whiteColor;
    }

    svg {
      margin-left: 6px;
      width: 8px;
      height: 5px;
      transition: transform 300ms ease;
      transform-origin: 50% 50%;
    }
  }



  &__list {
    overflow: hidden;
    position: absolute;
    z-index: 10;
    top: 42px;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    background: #1d2228;
    max-height: 150px;
    overflow-y: auto;
    opacity: 0;
    transform: scaleY(0);
    transition:
      transform 300ms ease,
      opacity 300ms ease;
    transform-origin: 0 0;

    @include media-breakpoint-down(xs) {
      top: 37px;
    }

    li {
      font-weight: 500;
      padding: 5px 15px;
      margin: 0 auto;
      overflow: hidden;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover {
        background-color: rgba(255, 255, 255, 0.5);
        color: #1d2228;
        transition:
          color 300ms ease,
          background-color 300ms ease;
      }
    }
  }

  &__item {
    color: $whiteColor;
  }

  &_active {
    .dropdown {
      &__list {
        transform: scaleY(1);
        opacity: 1;
      }

      &__button {
        .dropdown__svg {
          transform: rotate(180deg);
        }
      }
    }
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 3px;

    &:hover {
      background-color: $whiteColor;
    }
  }
  ::-webkit-scrollbar {
    width: 6px;

    @include media-breakpoint-down(sm) {
      width: 6px;
    }
  }
}
</style>
