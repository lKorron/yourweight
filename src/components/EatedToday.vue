<template>
  <food-search @food-chosen="onFoodChosen"></food-search>
  <div v-if="isPresentAppear" class="food-present">
    <h3 class="food-present__food-name">{{ name }}</h3>
    <div class="food-present__image">
      <img :src="imageUrl" alt="food image" />
    </div>
    <div class="food-present__body">
      <Form @submit="onSubmit" class="food-present__add add">
        <Field
          v-model.trim="servingCount"
          class="add__input"
          name="text"
          type="text"
          rules="number"
        />
        <div class="add__serving-unit">
          {{ servingUnit }}
        </div>
        <div class="add__calories">({{ allCalories }} ккал)</div>
        <button>+</button>
      </Form>
    </div>
  </div>
  <today-progress :todayCalories="caloriesToday"></today-progress>
  <eated-list :foodList="foodList" @delete-item="onDeleteItem"></eated-list>
</template>

<script setup>
import FoodSearch from "./FoodSearch.vue";
import TodayProgress from "./TodayProgress.vue";
import EatedList from "./EatedList.vue";

import { inject, ref, computed, watch } from "vue";
import { Form, Field } from "vee-validate";

const api = inject("api");
const loadApi = inject("load");

const name = ref("Название блюда");
const imageUrl = ref("");
const servingUnit = ref("порция");

const calories = ref("-");
const servingCount = ref(1);

const isPresentAppear = computed(() => {
  if (calories.value != "-") {
    return true;
  }
  return false;
});

const allCalories = computed(() => {
  const result = calories.value * parseInt(servingCount.value);

  if (isNaN(result) || result < 0) {
    return "-";
  }

  return result;
});

const foodList = ref([]);

const caloriesToday = computed(() => {
  let result = 0;

  foodList.value.forEach((item) => {
    result += item.calories;
  });

  return result;
});

const onSubmit = () => {
  const foodListItem = {
    servingCount: servingCount.value,
    servingUnit: servingUnit.value,
    imageUrl: imageUrl.value,
    name: name.value,
    calories: allCalories.value,
  };

  foodList.value.forEach((item) => {
    if (item.name === foodListItem.name) {
      // do logic
    }
  });

  foodList.value.push(foodListItem);
};

const onDeleteItem = (name) => {
  foodList.value = foodList.value.filter((el) => el.name !== name);
};

const onFoodChosen = (foodName, photoUrl) => {
  loadApi(() => {
    api.nutritionix.nutriens(foodName).then((response) => {
      const { nf_calories, serving_unit } = response.data.foods[0];

      name.value = foodName;
      imageUrl.value = photoUrl;
      calories.value = Math.round(nf_calories);
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
    min-height: 100px;
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
