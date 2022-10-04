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
      <button v-if="isBackButton" @click="onClick" class="back-button">
        <img src="../assets/back.png" alt="назад" />
      </button>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, toRef } from "vue";
import router from "@/router";

const props = defineProps({
  backButton: {
    type: Boolean,
    reqruired: false,
  },
  customRoute: {
    type: Boolean,
    reqruired: false,
  },
});

const emit = defineEmits({
  "back-button-click": null,
});

const onClick = () => {
  if (isCustomRoute.value) {
    emit("back-button-click");
    return;
  }

  router.push({ name: "home" });
};

const isBackButton = toRef(props, "backButton");
const isCustomRoute = toRef(props, "customRoute");
</script>

<style lang="scss">
@import "../styles/mixins";

.content-panel {
  @include setPlane();
  position: relative;
  margin-bottom: 30px;

  &__header {
    text-decoration: underline;
  }

  &__content {
    margin-bottom: 40px;
  }

  .back-button {
    @include sizeImgContainer($size: 28px);
    position: absolute;
    top: 10px;
    left: 10px;
    background: none;
    border: none;
    transition: transform 0.25s;

    &:hover {
      transform: scale(1.2);
    }
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
