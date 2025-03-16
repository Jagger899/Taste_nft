<script setup>
import BaseInput from '@/components/base/BaseInput.vue'
import { ref, reactive } from 'vue';
import {useModalStore} from '@/components/stores/store.js'
import UIButton from '@/components/UI/UIButton.vue'

const modalStore = useModalStore();

const closeProfile = () => {
  modalStore.hideCreateProfile();
  console.log('must hide')
};

const formData = reactive({
  name: '',
  username: '',
  email: '',
  bio: '',
  image: null,
  twitch: '',
  instagram: '',
  twitter: '',
  onlyfans: ''
});

const errors = reactive({
  name: '',
  username: '',
  email: ''
});

const previewImage = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    formData.image = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const validateForm = () => {
  errors.name = formData.name ? '' : 'Имя обязательно';
  errors.username = formData.username ? '' : 'Имя пользователя обязательно';
  errors.email = /\S+@\S+\.\S+/.test(formData.email) ? '' : 'Неверный email';

  if (!errors.name && !errors.username && !errors.email) {
    console.log('Форма валидна:', formData);
  }
};
</script>

<template>
  <div class="profile">
    <div class="profile__content">
      <h2 class="profile__title">Edit your Profile</h2>
      <div class="profile__close" @click="closeProfile"></div>


      <BaseInput v-model="formData.name" label="Имя" :error="errors.name" />
      <BaseInput v-model="formData.username" label="Имя пользователя" :error="errors.username" />
      <BaseInput v-model="formData.email" label="Email" :error="errors.email" />

      <textarea v-model="formData.bio" placeholder="BIO"></textarea>

      <div class="profile-image">
        <label>Фото профиля</label>
        <input type="file" @change="handleFileUpload" accept="image/*" />
        <img v-if="previewImage" :src="previewImage" alt="Preview" class="preview" />
      </div>

      <BaseInput v-model="formData.twitch" label="Twitch" />
      <BaseInput v-model="formData.instagram" label="Instagram" />
      <BaseInput v-model="formData.twitter" label="Twitter" />
      <BaseInput v-model="formData.onlyfans" label="Onlyfans" />

      <div class="create-modal__button">
        <UIButton
          @click="validateForm"
          Сохранить изменения
        ></UIButton>
      </div>

    </div>
    </div>

</template>

<style scoped lang="scss">
@import "@/assets/scss/style";
.profile {
  position: fixed;
  display: block;
  padding-top: 65px;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  overflow: auto;
  color: $whiteColor;

  &__content{
    box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
    padding: 45px 28px 32px 31px;
    background: #30363d;
    width: 653px;
    margin: 0 auto;
    border-radius: 32px;
    //display: flex;
    //flex-direction: column;
    //align-items: center;
    position: relative;
  }

  &__title{
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    color: #fff;
    margin-bottom: 16px;
  }

  &__close{
    position: absolute;
    right: 24px;
    height: 16px;
    width: 16px;
    padding: 10px;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 1px;
      left: 8px;
      width: 2px;
      height: 20px;
      border-radius: 2px;
      background: #fff;
      transform: rotate(-45deg);
    }

    &::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 8px;
      width: 2px;
      height: 20px;
      border-radius: 2px;
      background: #fff;
      transform: rotate(45deg);
    }
  }
}

textarea {
  width: 100%;
  min-height: 80px;
}

.profile-image img {
  max-width: 100px;
  border-radius: 50%;
  margin-top: 10px;
}

button {
  background-color: #6200ea;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
