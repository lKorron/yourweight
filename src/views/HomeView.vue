<template>
  <async-popup ref="inputPopup" ignoreKeys>
    <template #header> Данные пользователя </template>
    <template #default>
      <user-input @submit="handleSubmit"></user-input
    ></template>
    <template #button> <div></div></template>
  </async-popup>
  <async-popup ref="purposePopup" ignoreKeys>
    <template #header> Желаемый вес </template>
    <template #default>
      <purpose-input @submit="handleSubmit"></purpose-input
    ></template>
    <template #button> <div></div></template>
  </async-popup>

  <content-panel v-if="isDataAvailable">
    <template #header>Общий прогресс</template>
    <template #default
      ><current-state
        :weight="userData.weight"
        :targetWeight="userData.targetWeight"
      ></current-state
    ></template>
  </content-panel>

  <content-panel v-if="isDataAvailable">
    <template #header>Расчет калорий</template>
    <template #default
      ><calculated-calories
        :height="userData.height"
        :weight="userData.weight"
        :age="userData.age"
        :targetWeight="userData.targetWeight"
        :coeff="userData.coeff"
        :sex="userData.sex"
      ></calculated-calories
    ></template>
  </content-panel>

  <content-panel v-if="isDataAvailable">
    <template #header>Что я сегодня съел?</template>
    <template #default>
      <router-link class="plus-link" to="eatedToday">
        <img src="../assets/plus.png" alt="plus"
      /></router-link>
    </template>
  </content-panel>
</template>

<script setup>
import UserInput from "../components/UserInput.vue";
import PurposeInput from "../components/PurposeInput.vue";
import AsyncPopup from "../components/AsyncPopup.vue";
import ContentPanel from "../components/ContentPanel.vue";
import CurrentState from "../components/CurrentState.vue";
import CalculatedCalories from "../components/CalculatedCalories.vue";
import EatedToday from "../components/EatedToday.vue";

import { ref, onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";

onMounted(() => {
  openInputPopup();
});

// Data
let userData = reactive({
  height: null,
  weight: null,
  sex: null,
  targetWeight: null,
});

const isDataAvailable = computed(() => {
  let result = true;

  Object.entries(userData).forEach(([, value]) => {
    if (value === null) {
      result = false;
    }
  });

  return result;
});

// Popups
const inputPopup = ref(null);
const purposePopup = ref(null);

const openInputPopup = async () => {
  const popupResult = await inputPopup.value.open();

  if (popupResult) {
    openPurposePopup();
  }
};

const openPurposePopup = async () => {
  const popupResult = await purposePopup.value.open();

  if (popupResult) {
    //code
  }
};

const store = useStore();

const handleSubmit = (userObject) => {
  inputPopup.value.close();
  purposePopup.value.close();

  Object.entries(userObject).forEach(([key, value]) => {
    userData[key] = value;
  });

  store.dispatch(`userDataModule/setUserData`, userObject);
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
.plus-link {
  display: block;
  @include sizeImgContainer($size: 80px);
  margin: 0 auto;
  transition: transform 0.25s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
