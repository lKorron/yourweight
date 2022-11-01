<template>
  <div class="today-progress">
    <h3 class="today-progress__header">Прогресс поддержания веса</h3>
    <div class="today-progress__values">
      {{ todayCalories }}/{{ commonCalories }} ккал
    </div>
    <ProgressBar
      class="progress-bar"
      :bgcolor="'red'"
      :completed="commonPercentage"
    ></ProgressBar>
    <h3 class="today-progress__header">Прогресс изменения веса</h3>
    <div class="today-progress__values">
      {{ todayCalories }}/{{ targetCalories }} ккал
    </div>
    <ProgressBar
      class="progress-bar"
      :bgcolor="'darkcyan'"
      :completed="targetPercentage"
    ></ProgressBar>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, toRefs } from "vue";
import { useStore } from "vuex";

import ProgressBar from "./ProgressBar.vue";

const props = defineProps({
  todayCalories: {
    type: Number,
    required: true,
  },
});

const { todayCalories } = toRefs(props);

const store = useStore();

const commonCalories = computed(
  () => store.getters["caloriesModule/getCommonCalories"]
);
const targetCalories = computed(
  () => store.getters["caloriesModule/getTargetCalories"]
);

const commonPercentage = computed(() => {
  let result = Math.round((todayCalories.value / commonCalories.value) * 100);
  if (result > 100) {
    result = 100;
  }

  return result;
});

const targetPercentage = computed(() => {
  let result = Math.round((todayCalories.value / targetCalories.value) * 100);
  if (result > 100) {
    result = 100;
  }

  return result;
});
</script>

<style lang="scss">
@import "../styles/variables";

.today-progress {
  margin-bottom: 30px;
  .progress-bar {
    margin: 0 auto;
    width: 400px;

    &:not(:last-of-type) {
      margin-bottom: 10px;
    }

    @media (max-width: $md3) {
      max-width: 100%;
    }
  }

  &__values {
    margin-bottom: 10px;
  }
}
</style>
