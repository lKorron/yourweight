<template>
  <food-search @food-chosen="onFoodChosen"></food-search>
  <div class="food-present">
    <h3 class="food-present__food-name">{{ name }}</h3>
    <div class="food-present__add add">
      <input class="add__input" type="text" value="1" />
      <div class="add__serving-unit">
        {{ servingUnit }}
      </div>
      <div class="add__calories">({{ calories }} ккал)</div>
      <button type="button">+</button>
    </div>
  </div>
</template>

<script setup>
import FoodSearch from "./FoodSearch.vue";

import { inject, ref } from "vue";

const api = inject("api");
const loadApi = inject("load");

const name = ref("Название блюда");
const calories = ref("-");
const servingUnit = ref("порция");

const onFoodChosen = (foodName) => {
  loadApi(() => {
    api.nutritionix.nutriens(foodName).then((response) => {
      console.log(response);
      const { nf_calories, serving_unit } = response.data.foods[0];

      name.value = foodName;
      calories.value = nf_calories;
      servingUnit.value = serving_unit;
    });
  });
};
</script>

<style lang="scss" scoped>
.add {
  display: flex;

  :not(:last-child) {
    margin-right: 10px;
  }

  &__input {
    width: 18px;
  }
}
</style>
