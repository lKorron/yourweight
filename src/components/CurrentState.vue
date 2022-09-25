<template>
  <div class="current-state">
    <div class="current-state__body">
      <div class="current-state__numerical">
        <div class="current-state__weight">
          <h3>Текущий вес</h3>
          <div>{{ userData.weight }} кг</div>
        </div>
        <div class="current-state__target-weight">
          <h3>Целевой вес</h3>
          <div>{{ userData.targetWeight }} кг</div>
        </div>
      </div>
      <div class="current-state__progress">
        <circle-progress
          :percent="complitionPercent"
          :fill-color="'#31fe1d'"
          :transition="200"
          show-percent
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import { defineProps, computed, ref } from "vue";

const props = defineProps({
  userData: Object,
});

const weight = ref(props.userData.weight);
const targetWeight = ref(props.userData.targetWeight);

//const { weigth, targetWeight } = userData;

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

.current-state {
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
