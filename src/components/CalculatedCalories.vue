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
import { defineProps, computed, ref, toRefs, onMounted } from "vue";
import { useStore } from "vuex";

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
    return bmrByCoeff(weight, 66.4, 13.75, 5.003, 6.775);
  }

  if (sex.value === "female") {
    return bmrByCoeff(weight, 655.1, 9.563, 1.85, 4.676);
  }

  throw new Error("sex value is undefind");
};

const store = useStore();

const bmrByCoeff = (weight, a, b, c, d) => {
  const result =
    (a + b * weight + c * height.value - d * age.value) * coeff.value;
  const roundedResult = Math.round(result);
  return roundedResult;
};

const loadWeightToStorage = (action, weight) => {
  if (typeof weight === "number") {
    store.dispatch(`caloriesModule/${action}`, weight);
  }
};

loadWeightToStorage("setCommonCalories", bmr(weight.value));
loadWeightToStorage("setTargetCalories", bmr(targetWeight.value));
</script>

<style lang="scss" scoped>
@import "../styles/variables";
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__value {
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .value_normal {
      background-color: $normalWeightColor;
    }

    .value_purpose {
      background-color: $purposeWeigthColor;
    }
  }
}
</style>
