<template>
  <div class="not-found">
    <div class="not-found__image">
      <img src="../assets/not-found.png" alt="not found" />
      <h2 class="not-found__header">Страница не найдена</h2>
      <router-link :to="{ name: 'home' }">На главную</router-link>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/variables";

.not-found {
  &__image {
    margin: 0 auto;
    @include sizeImgContainer(400px);
  }

  &__header {
    font-size: 35px;
  }
}
</style>
