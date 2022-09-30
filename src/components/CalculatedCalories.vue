<template>
  <div class="calculated-calories">
    <div class="calculated-calories__column column">
      <div class="column__text">
        Чтобы оставаться в той же форме, вам нужно употреблять:
      </div>
      <div class="column__value value_normal">{{ bmr(weight) }} ккал</div>
    </div>
    <div class="calculated-calories__column column">
      <div class="column__text">
        Чтобы приблизиться к целевому весу, вам нужно употреблять:
      </div>
      <div class="column__value value_purpose">
        {{ bmr(targetWeight) }} ккал
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, toRefs } from "vue";
import { useStore } from "vuex";

const store = useStore();

console.log(store.state.caloriesModule);

const props = defineProps({
  height: Number,
  weight: Number,
  age: Number,
  targetWeight: Number,
  coeff: Number,
  sex: String,
});

const { height, weight, age, targetWeight, coeff, sex } = toRefs(props);

const bmr = (weight) => {
  if (Object.values(props).includes(null)) {
    return "-";
  }

  if (sex.value === "male") {
    const result =
      (66.5 + 13.75 * weight + 5.003 * height.value - 6.775 * age.value) *
      coeff.value;

    const roundedResult = Math.round(result);
    store.dispatch("caloriesModule/setCalories");
    return roundedResult;
  }

  if (sex.value === "female") {
    const result =
      (655.1 + 9.563 * weight + 1.85 * height.value - 4.676 * age.value) *
      coeff.value;
    return Math.round(result);
  }

  throw new Error("sex value is undefind");
};
</script>

<style lang="scss" scoped>
.calculated-calories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px;

  &__column {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  .column {
    &__value {
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .value_normal {
      background-color: yellow;
    }

    .value_purpose {
      background-color: cyan;
    }
  }
}
</style>
