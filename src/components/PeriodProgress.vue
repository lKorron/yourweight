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
      <div class="card__calories">{{ getCalories(date) }}</div>
      <router-link class="image-link card__link" to="eatedToday">
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

const periodDays = computed(() => store.getters["periodDataModule/getPeriod"]);
const getCalories = (date) =>
  store.getters["periodDataModule/getDailyCalories"](date);

onMounted(() => {});

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

  &__calories {
    border-top: 1px solid #000;
  }

  &__link {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>
