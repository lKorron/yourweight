<template>
  <div class="not-found">
    <div class="not-found__image">
      <img src="../assets/not-found.png" alt="not found" />
      <h2 class="not-found__header">Страница не найдена</h2>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";

.not-found {
  &__image {
    margin: 0 auto;
    @include sizeImgContainer(400px);
  }

  &__header {
  }
}
</style>
