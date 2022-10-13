<template>
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

    <button
      v-if="!preview"
      class="card__delete-button button"
      @click="openDeletePopup(date)"
    >
      <img src="../assets/delete.png" alt="delete button" />
    </button>

    <router-link
      v-if="!preview"
      class="image-link card__link"
      :to="{ name: 'date', params: { date: convertDate(date) } }"
    >
      <img src="../assets/editing.png" alt="edit"
    /></router-link>
  </div>
  <div v-if="!preview" class="add-card">
    <button class="add-card__button button" @click="onAdd">
      <img src="../assets/plus.png" alt="add button" />
    </button>
  </div>
  <async-popup dark-background ref="datePopup">
    <template #header> Введите дату </template>
    <template #default> <date-input></date-input> </template>
    <template #button> <div></div> </template>
  </async-popup>
  <async-popup dark-background ref="deletePopup">
    <template #header> Удалить выбранный день? </template>
    <template #default>Данные за {{ chosenDate }} будут удалены</template>
    <template #button>
      <div class="button-group">
        <button @click="onDelete" class="button">Удалить</button>
        <button @click="closeDeletePopup" class="button">Отмена</button>
      </div>
    </template>
  </async-popup>
</template>

<script setup>
import AsyncPopup from "./AsyncPopup.vue";
import EatedList from "./EatedList.vue";
import { defineProps, computed, toRefs, ref } from "vue";
import { useStore } from "vuex";
import DateInput from "./DateInput.vue";

const props = defineProps({
  cardsCount: {
    type: [String, Number],
    required: false,
  },
  preview: {
    type: Boolean,
    required: false,
  },
  today: {
    type: Boolean,
    required: false,
  },
});

const { cardsCount, today } = toRefs(props);

const datePopup = ref(null);
const deletePopup = ref(null);
const chosenDate = ref("");

const store = useStore();

const commonCalories = computed(
  () => store.getters["caloriesModule/getCommonCalories"]
);

const targetCalories = computed(
  () => store.getters["caloriesModule/getTargetCalories"]
);

const periodDays = computed(() => {
  if (cardsCount.value) {
    return store.getters["periodDataModule/getPartialPeriod"](cardsCount.value);
  }

  if (today.value) {
    return store.getters["periodDataModule/getTodayData"];
  }

  return store.getters["periodDataModule/getPeriod"];
});

const onAdd = () => {
  datePopup.value.open();
};

const onDelete = () => {
  closeDeletePopup();
  store.dispatch("periodDataModule/deleteDay", chosenDate.value);
};

const closeDeletePopup = () => {
  deletePopup.value.close();
};

const openDeletePopup = (date) => {
  deletePopup.value.open();
  chosenDate.value = date;
};

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
</script>

<style lang="scss" scoped>
@import "../styles/classes";
@import "../styles/mixins";

.image-link {
  @include sizeImgContainer(20px);
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

  &__delete-button {
    @include sizeImgContainer(20px);
    position: absolute;
    background: none;
    border: none;
    top: -5px;
    left: -5px;
  }

  &__link {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}

.add-card {
  border: 1px dashed rgba($color: #000, $alpha: 0.4);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 109px;

  &__button {
    @include sizeImgContainer(60px);
    border: none;
    background: none;
    padding: 0;
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

.button-group {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  max-width: 220px;
}
</style>
