<template>
  <transition name="content" appear>
    <div class="content-panel">
      <h2 class="content-panel__header">
        <slot name="header">Заголовок</slot>
      </h2>
      <div class="content-panel__content">
        <slot
          >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
          voluptatem consequatur odio maxime, sequi iusto perspiciatis, aliquam
          beatae dicta culpa impedit ipsa dolores eveniet excepturi error illum
          neque consectetur blanditiis.</slot
        >
      </div>
    </div>
  </transition>
</template>

<script setup></script>

<style lang="scss">
@import "../styles/mixins";

.content-panel {
  @include setPlane(800px);
  margin-bottom: 30px;

  &__header {
    text-decoration: underline;
  }
}

.content-enter-active,
.content-leave-active {
  transition: transform 0.5s ease-in-out;
}

.content-enter-from,
.content-leave-to {
  transform: translateX(-100%) scale(0);
}
</style>
