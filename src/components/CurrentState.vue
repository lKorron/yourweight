<template>
  <div class="current-state">
    <div class="current-state__body">
      <div class="current-state__numerical">
        <div class="current-state__weight">
          <h3>Текущий вес</h3>
          <div>{{ weight }} кг</div>
        </div>
        <div class="current-state__target-weight">
          <h3>Целевой вес</h3>
          <div>{{ targetWeight }} кг</div>
        </div>
      </div>
      <div class="current-state__progress">
        <circle-progress
          :percent="complitionPercent"
          :transition="200"
          show-percent
          is-gradient
          :gradient="{
            angle: 120,
            startColor: startCircleProgressColor,
            stopColor: endCircleProgressColor,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import { defineProps, computed, toRefs } from "vue";
import {
  startCircleProgressColor,
  endCircleProgressColor,
} from "../styles/_export.module.scss";

const props = defineProps({
  weight: Number,
  targetWeight: Number,
});

const { weight, targetWeight } = toRefs(props);

const complitionPercent = computed(() => {
  if (!weight.value || !targetWeight.value) {
    return 0;
  }

  if (targetWeight.value > weight.value) {
    return Math.round((weight.value / targetWeight.value) * 100);
  } else {
    return Math.round((targetWeight.value / weight.value) * 100);
  }
});
</script>

<style lang="scss">
@import "../styles/_mixins.scss";
@import "../styles/variables";
.current-state {
  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
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

    @media (max-width: $md3) {
      transform: scale(0.8);
    }
  }
}
</style>
