<script setup></script>

<template>
  <section class="promo">
    <div class="container">
      <div class="promo__inner">
        <div class="promo__info info">
          <div class="info__user">
            <picture>
              <source srcset="../../../assets/images/users/user-0.webp" type="image/webp" />
              <img
                class="info__user-img"
                src="../../../assets/images/users/user-0.jpg"
                alt="logo"
              />
            </picture>

            <div class="info__user-info">
              <p class="info__user-name">User Name</p>
              <p class="info__user-nick">@username</p>
            </div>
          </div>
        </div>

        <div class="promo__slider">
          <img class="promo__slider-img" src="../../../assets/images/nft/2/default.jpg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/base/base';
@import '@/assets/scss/base/reset';
@import '@/assets/scss/style';
@import '@/assets/scss/base/colors';

.promo {
  margin-top: 96px;

  &__inner {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__info {
    display: flex;
    gap: 12px;
  }

  .info {
    &__user {
      display: flex;
      gap: 12px;
    }

    &__user-img {
      border-radius: 12px;
      width: 49px;
      height: 49px;
      box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.15);
    }

    &__user-info {
      display: flex;
      flex-direction: column;
    }

    &__user-name {
      font-weight: 700;
      font-size: 18px;
      color: $whiteColor;
    }

    &__user-nick {
      font-weight: 500;
      font-size: 14px;
      background: linear-gradient(270deg, #8743ff 0%, #d8c2ff 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  &__slider-img {
    width: 519px;
    height: 519px;
    object-fit: cover;
  }
}
</style>
