<template>
  <async-popup ref="inputPopup" ignoreKeys>
    <template #header> Данные пользователя </template>
    <template #default>
      <user-input @submit="handleSubmit"></user-input
    ></template>
    <template #button><div></div></template>
  </async-popup>
  <async-popup ref="purposePopup" ignoreKeys>
    <template #header> Желаемый вес </template>
    <template #default>
      <purpose-input @submit="handleSubmit"></purpose-input
    ></template>
    <template #button><div></div></template>
  </async-popup>
</template>

<script setup>
import UserInput from "../components/UserInput.vue";
import PurposeInput from "../components/PurposeInput.vue";
import AsyncPopup from "../components/AsyncPopup.vue";

import { ref, onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import router from "@/router";

onMounted(() => {
  openInputPopup();
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
    router.push({ name: "home" });
  }
};

const store = useStore();

const handleSubmit = (userObject) => {
  inputPopup.value.close();
  purposePopup.value.close();

  store.dispatch(`userDataModule/setUserData`, userObject);
};
</script>

<style></style>
