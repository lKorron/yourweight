<template>
  <div class="period-progress">
    <div
      v-for="[date, value] in periodDays"
      :key="date"
      class="period-progress__card card"
    >
      <div class="card__data">{{ date }}</div>
      <div class="card__eated">
        <eated-list :food-list="value" preview></eated-list>
      </div>
      <div
        class="card__calories calories"
        :class="[isPurposeComplete(date) ? 'calories_green' : 'calories_red']"
      >
        {{ getCalories(date) }}/{{ targetCalories }}
      </div>

      <router-link
        class="image-link card__link"
        :to="{ name: 'date', params: { date: convertDate(date) } }"
      >
        <img src="../assets/editing.png" alt="edit"
      /></router-link>
    </div>
  </div>
</template>

<script setup>
import EatedList from "./EatedList.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const commonCalories = computed(
  () => store.getters["caloriesModule/getCommonCalories"]
);

const targetCalories = computed(
  () => store.getters["caloriesModule/getTargetCalories"]
);

const periodDays = computed(() => store.getters["periodDataModule/getPeriod"]);

const isPurposeComplete = (date) => {
  const isGaining = commonCalories.value < targetCalories.value;
  let isComplete = false;
  if (isGaining) {
    if (getCalories(date) >= targetCalories.value) {
      isComplete = true;
    }
  } else {
    if (getCalories(date) <= targetCalories.value) {
      isComplete = true;
    }
  }

  return isComplete;
};
const getCalories = (date) =>
  store.getters["periodDataModule/getDailyCalories"](date);

const convertDate = (dateString) => dateString.replaceAll("/", "-");

const foodList1 = [
  {
    servingCount: 5,
    name: "test",
    imageUrl: "https://nix-tag-images.s3.amazonaws.com/3789_thumb.jpg",
    calories: 500,
    servingUnit: 12,
  },
  {
    servingCount: 5,
    name: "test",
    imageUrl: "https://nix-tag-images.s3.amazonaws.com/3789_thumb.jpg",
  },
  {
    servingCount: 5,
    name: "test",
    imageUrl: "https://nix-tag-images.s3.amazonaws.com/3789_thumb.jpg",
  },
];
</script>

<style lang="scss" scoped>
@import "../styles/classes";
@import "../styles/mixins";

.image-link {
  @include sizeImgContainer(20px);
}

.period-progress {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #000;
  border-radius: 10px;
  position: relative;
  .eated-list {
    border: none;
    outline: 1px solid black;
  }

  &__data {
    border-bottom: 1px solid #000;
    min-height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  &__link {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}

.calories {
  border-top: 1px solid #000;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  font-weight: bold;
}

.calories_red {
  color: white;
  background-color: red;
}

.calories_green {
  color: white;
  background-color: green;
}
</style>
