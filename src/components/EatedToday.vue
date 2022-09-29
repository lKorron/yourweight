<template>
  <food-search @food-chosen="onFoodChosen"></food-search>
  <div class="food-present">
    <h3 class="food-present__food-name">{{ name }}</h3>
    <div class="food-present__image">
      <img :src="imageUrl" alt="food image" />
    </div>
    <div class="food-present__body">
      <div class="food-present__add add">
        <input
          @keydown.enter="onInputKeydown"
          v-model.trim="servingCount"
          class="add__input"
          type="text"
        />
        <div class="add__serving-unit">
          {{ servingUnit }}
        </div>
        <div class="add__calories">({{ allCalories }} ккал)</div>
        <button type="button">+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import FoodSearch from "./FoodSearch.vue";

import { inject, ref, computed, watch } from "vue";

const api = inject("api");
const loadApi = inject("load");

const name = ref("Название блюда");
const imageUrl = ref("");
const servingUnit = ref("порция");

const calories = ref("-");
const servingCount = ref(1);

watch(servingCount, (value) => {
  const parsedCount = parseInt(servingCount.value);
  if (isNaN(parsedCount)) {
    setTimeout(() => {
      servingCount.value = 1;
    }, 500);
  }
});

const allCalories = computed(() => {
  //return parseInt(calories) * parseInt(servingCount);
  return 5;
});

const onFoodChosen = (foodName, photoUrl) => {
  loadApi(() => {
    api.nutritionix.nutriens(foodName).then((response) => {
      console.log(response);
      const { nf_calories, serving_unit } = response.data.foods[0];

      name.value = foodName;
      imageUrl.value = photoUrl;
      calories.value = nf_calories;
      servingUnit.value = serving_unit;
    });
  });
};
</script>

<style lang="scss" scoped>
.food-present {
  &__body {
    display: flex;
    justify-content: center;
  }

  &__image {
    margin: 0 auto;
    width: 150px;
    img {
      width: 150px;
    }
  }
}

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
