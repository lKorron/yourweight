<template>
  <content-panel>
    <template #header>Общий прогресс</template>
    <template #default
      ><current-state
        :weight="userData.weight"
        :targetWeight="userData.targetWeight"
      ></current-state
    ></template>
  </content-panel>

  <content-panel>
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

  <content-panel>
    <template #header>Что я сегодня съел?</template>
    <template #default>
      <router-link class="plus-link" to="eatedToday">
        <img src="../assets/plus.png" alt="plus"
      /></router-link>
    </template>
  </content-panel>
</template>

<script setup>
import ContentPanel from "../components/ContentPanel.vue";
import CurrentState from "../components/CurrentState.vue";
import CalculatedCalories from "../components/CalculatedCalories.vue";
import EatedToday from "../components/EatedToday.vue";

import { ref, onMounted, reactive, computed } from "vue";

import { useStore } from "vuex";

const store = useStore();
const userData = store.getters["userDataModule/getUserData"];
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
