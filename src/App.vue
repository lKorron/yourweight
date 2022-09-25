<template>
  <h1>yourweight</h1>
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
    <template #header>Текущий прогресс</template>
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
</template>

<script setup>
import UserInput from "./components/UserInput.vue";
import PurposeInput from "./components/PurposeInput.vue";
import AsyncPopup from "./components/AsyncPopup.vue";
import ContentPanel from "./components/ContentPanel.vue";
import CurrentState from "./components/CurrentState.vue";
import CalculatedCalories from "./components/CalculatedCalories.vue";
import { ref, onMounted, reactive, computed } from "vue";

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

const handleSubmit = (userObject) => {
  inputPopup.value.close();
  purposePopup.value.close();

  Object.entries(userObject).forEach(([key, value]) => {
    userData[key] = value;
  });

  console.log(userData);
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  $bg-size: 370px;
  background-color: #fff;
  background-image: url("./assets/background.jpeg");
  background-repeat: repeat;
  background-size: $bg-size;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

button {
  cursor: pointer;
}
</style>
