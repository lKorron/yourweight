<template>
  <div class="main-panel">
    <h2 class="main-panel__header">Показатели на сегодня</h2>
    <div class="main-panel__body">
      <div class="main-panel__numerical">
        <div class="main-panel__weight">
          <h3>Текущий вес</h3>
          <div>{{ userData.weight }}65</div>
        </div>
        <div class="main-panel__target-weight">
          <h3>Целевой вес</h3>
          <div>{{ userData.targetWeight }}70</div>
        </div>
      </div>
      <div class="main-panel__progress">
        <circle-progress
          :percent="40"
          :fill-color="'#31fe1d'"
          show-percent
          :transition="200"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import { defineProps, toRefs } from "vue";

const props = defineProps({
  userData: Object,
});

const { userData } = toRefs(props);
</script>

<style lang="scss">
@import "../styles/_mixins.scss";
.main-panel {
  @include setPlane(800px);

  &__header {
    text-decoration: underline;
  }

  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 40px;
  }

  &__progress {
    display: flex;
    justify-content: space-around;

    .current-counter {
      font-size: 30px;
      font-weight: bold;

      &::after {
        content: "%";
      }
    }
  }
}
</style>
