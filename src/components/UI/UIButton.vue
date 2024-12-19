<script setup>
import { useModalStore } from '@/data/store'
const store = useModalStore()
const showModal = () => {
  store.showModal()
}

</script>

<template>
  <button @click="showModal">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  font-family: Raleway, sans-serif;
  font-size: 12px;
  font-weight: 700;
  position: relative;
  line-height: 14px;
  box-shadow: 0px 15px 30px 0px rgba(20, 102, 204, 0.16);
  background: linear-gradient(270deg, rgb(135, 67, 255), rgb(65, 54, 241) 100%);
  height: 100%;
  width: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  border-radius: 12px;
  border: none;
  cursor: pointer;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: -25%;
    left: -30%;
    background: #fff;
    height: 150%;
    width: 1px;
    opacity: 0.5;
    transform: rotate(30deg);
    box-shadow: 0 0 15px 15px #fff;
  }

  &:hover {
    &:after {
      animation: hover 500ms linear;
    }
  }

  &:active {
    transform: scale(0.9);
  }
}

@keyframes hover {
  0% {
    left: -20%;
  }
  100% {
    left: 120%;
  }
}
</style>
