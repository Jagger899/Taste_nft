<script setup>
import { computed, ref, watch } from 'vue'
import { useModalStore } from '@/components/stores/store';
import UIButton from '@/components/UI/UIButton.vue'
import BaseSvg from '@/components/base/BaseSvg.vue'

const store = useModalStore();
const image = ref(null);
const imagePreview = ref(null);
const fileInput = ref(null);
const step = ref(1);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  handleFile(file);
};

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  handleFile(file);
};

const handleFile = (file) => {
  const validTypes = ['image/png', 'image/jpeg', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return;
  }
  image.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const nextStep = () => {
  if (step.value === 1 && image.value) {
    step.value = 2;
  } else if (step.value === 2) {
    step.value = 3;
  } else if (step.value === 3) {
    store.openModal('secondStepModal');
    store.closeModal('createModal');
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const input = ref('');
const maxValue = 1000000;
const price = computed(() => {
  const value = parseFloat(input.value);
  return !isNaN(value) ? (value / 43).toFixed(2) : '0';
})

const isValid = ref(false);

watch(input, (newValue) => {
  const numberValue = newValue
    .split('')
    .filter(char => !isNaN(char) && char !== ' ')
    .join('');
  input.value = numberValue;

  if (numberValue === '' || isNaN(parseFloat(numberValue)) || parseFloat(numberValue) > maxValue) {
    isValid.value = false;
  } else {
    isValid.value = true;
  }
});

const copies = ref(0);

const increment = () => {
  copies.value++;
};

const decrement = () => {
  if (copies.value > 0) {
    copies.value--;
  }
};

const artworkName = ref('');
const description = ref('');
const errors = ref({
  artworkName: '',
  description: ''
});

const validateForm = () => {
  errors.value.artworkName = '';
  errors.value.description = '';

  if (!artworkName.value.trim()) {
    errors.value.artworkName = 'Artwork name is required';
  }
  if (description.value.trim().length < 5) {
    errors.value.description = 'Description must be 5 characters';
  }

  return !errors.value.artworkName && !errors.value.description;
};

const isButtonDisabled = computed(() => {
  if (step.value === 3) {
    return !validateForm();
  }
  return false;
});
</script>

<template>
  <div v-if="store.modals.createModal" class="create-modal">
    <div class="create-modal__content">
      <div class="create-modal__close" @click="store.closeModal('createModal')"></div>

      <template v-if="step===1">
        <h2 class="create-modal__title">Creating artwork</h2>
        <p class="create-modal__step">Step 1 from 3</p>
        <p class="create-modal__task">Upload the artwork you will be selling</p>

        <div class="upload-box" @dragover.prevent @drop="handleDrop" @click="triggerFileInput">
          <input type="file" ref="fileInput" hidden @change="handleFileUpload" accept="image/png, image/jpeg, image/gif" />

          <div v-if="!image" class="upload-box__task-box">
            <p class="upload-box__task"  v-if="!image">1500x500px.</p>
            <p class="upload-box__task"  v-if="!image">JPG, PNG or GIF.</p>
            <p class="upload-box__task"  v-if="!image">100MB max size.</p>
            <p class="upload-box__task upload-box__task_descr">Drag and drop an image here, or click to browse</p>
          </div>

          <p v-if="image" class="upload-box__task upload-box__task_descr">Image was added successfully</p>

        </div>
      </template>

      <template v-if="step === 2">
        <h2 class="create-modal__title">Creating artwork</h2>
        <p class="create-modal__step">Step 2 from 3</p>

        <div class="upload-box">
          <img v-if="image" :src="imagePreview" alt="Preview" class="preview-image" />
        </div>
      </template>

      <template v-if="step === 3">
        <h2 class="create-modal__title">Creating artwork</h2>
        <p class="create-modal__step">Step 2 from 3</p>

        <form action="" class="create-form">
          <div class="create-form__input-box">
            <h3 class="create-form__title">Artwork name</h3>
            <input v-model="artworkName" type="text" class="create-form__input" />
            <p v-if="errors.artworkName" class="error-message">{{ errors.artworkName }}</p>

          </div>

          <div class="create-form__textarea-box">
            <h3 class="create-form__title">Description</h3>
            <textarea v-model="description" class="text-area"></textarea>
            <p v-if="errors.description" class="error-message">{{ errors.description }}</p>
          </div>

        </form>

        <div class="create-form__radio-box">
          <h3 class="create-form__title">Type</h3>

          <div class="radio-buttons">
            <div class="radio-button">
              <input type='radio' class="radio-button__input" id="auction" name="type">
              <label for="auction"></label>
              <span class="radio-button__input-text">Auction</span>
            </div>

            <div class="radio-button">
              <input type='radio' class="radio-button__input" id="sale" name="type">
              <label for="sale"></label>
              <span class="radio-button__input-text">Sale</span>
            </div>

          </div>
        </div>
        <div class="create-order">
          <div class="copies">
            <h3 class="order__title">Min.sum</h3>

            <div class="copies__box">
              <div @click="decrement" class="copies__minus">
                <BaseSvg  id="minus" class="copies__svg copies__svg-min"/>
              </div>
              <p class="copies__number">{{copies}}</p>
              <div @click="increment" class="copies__plus">
                <BaseSvg id="plus" class="copies__svg copies__svg-plus"/>
              </div>
            </div>
          </div>
          <div class="order">

            <h3 class="order__title">Min.sum</h3>

            <div class="order__box">

              <form action="" class="order__form" >

                <input type="text" class="order__form-input" v-model="input"/>
<!--                <span class="error" v-if="!isValid && input.value !== ''">Enter only number not exceeding 1,000,000</span>-->
              </form>
              <p class="order__price">({{price}}$)</p>
            </div>
          </div>
        </div>

      </template>

      <div class="create-modal__button">
        <UIButton
          @click="nextStep"
          :disabled="isButtonDisabled"
        >{{ step === 3 ? 'Finish creating' : 'Next step' }}</UIButton>
      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">

@import "@/assets/scss/style";

.create-modal {
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

  &__step{
    font-weight: 600;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 20px;
    text-align: center;
    display: block;
  }

  &__task {
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 30px;
  }

  &__button {
    width: 157px;
    height: 40px;
    margin: 0 auto;
  }
}

.upload-box {
  border: 1px dashed #c4c4c4;
  border-radius: 16px;
  position: relative;
  width: 599px;
  height: 360px;
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  justify-content: center;

  &__task-box{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__task{
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);

    &_descr {
      margin-top: 30px;
    }
  }

}

.preview-image {
  max-width: 100%;
  height: 100%;
  border-radius: 16px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;

}

.create-form{
  width: 100%;
  margin-bottom: 24px;

  &__input-box{
    margin-bottom: 24px;
  }

  &__input{
    border: none;
    width: 100%;
    border-radius: 8px;
    background: #1d2228;
    padding: 0 10px;
    color: $whiteColor;
    height: 40px;
  }

  &__title {
    font-weight: 600;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 8px;
  }

  &__textarea-box{
    height: 120px;
    margin-bottom: 50px;

    .text-area{
      border: none;
      height: 100%;
      width: 100%;
      border-radius: 8px;
      background: #1d2228;
      padding: 10px;
      color: #fff;
      resize: none;
    }

    &__input-box{
      margin-bottom: 24px;
    }

  }
}

.radio-buttons{
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.radio-button{
  position: relative;
  height: 30px;
  display: flex;
  align-items: center;
  width: 100px;
  gap: 10px;

  &__input {
    opacity: 0;
    margin: 0;
    width: 20px;
    height: 20px;
    position: absolute;

  }
}

.radio-button__input + label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #000;
  border: 1px solid #8743ff;
  cursor: pointer;
  position: relative;
  //box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
}

.radio-button__input:checked + label {
  background: linear-gradient(270deg, #8743ff, #4136f1);
  background: #000;
  //box-shadow: 0 0 5px rgba(131, 67, 255, 0.6);

}

.radio-button__input:checked + label::before {
  content: '';
  position: absolute;
  left: 3px;
  top: 3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(270deg, #825cc9, #1c11ce);
}

.radio-button__input-text{
  font-weight: 600;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
}

.radio-button__input:checked ~ .radio-button__input-text {
  color: $whiteColor;
}

.order {
  &__title {
    font-weight: 600;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 8px;
  }

  &__box {
    display: flex;
    align-items: center;
    margin-bottom: 31px;
    gap: 10px;
    width: 600px;

    @include media-breakpoint-down(xs) {
      display: block;
      margin-bottom: 20px;
    }
  }

  &__form {
    margin-right: 10px;
    position: relative;
    @include media-breakpoint-down(xs) {
      margin-bottom: 20px;
    }

    &:before {
      content: 'TASTE';
      position: absolute;
      right: 13px;
      top: 10px;
      color: $whiteColor;
    }

    .error {
      position: absolute;
      color: $whiteColor;
      width: 100%;
      bottom: -60px;
      left: 0;
    }
  }

  &__form-input {
    background: #1d2228;
    border-radius: 8px;
    color: $whiteColor;
    width: 176px;
    height: 40px;
    border: none;
    padding: 0 70px 0 16px;
    font-weight: 600;
    line-height: 19px;

    @include media-breakpoint-down(xs) {
      width: 100%;
    }

    &:focus {
      border: none;
      outline: none;
    }
  }

  &__price {
    font-weight: 600;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
  }

}

.create-order {
  display: flex;
  align-items: center;
  gap: 30px;
}

.copies {
  margin-top:-22px;

  &__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__svg-min {
    width: 17px;
    height: 17px;
  }

  &__svg-plus {
    width: 17px;
    height: 44px;
  }
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.copies__box {
  display: flex;
  gap: 10px;
  align-items: center;
}

</style>
