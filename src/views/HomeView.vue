<template>
  <content-panel class="main-progress">
    <template #header>Общий прогресс</template>
    <template #default
      ><current-state
        :weight="userData.weight"
        :targetWeight="userData.targetWeight"
      ></current-state>
      <router-link to="weight" class="main-progress__link button"
        ><img src="../assets/weight-scale.png" alt="weight-scale"
      /></router-link>
    </template>
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

  <div class="double-group">
    <content-panel>
      <template #header>Что я сегодня съел?</template>
      <template #default>
        <router-link class="image-link" to="eatedToday">
          <img src="../assets/plus.png" alt="plus"
        /></router-link>
      </template>
    </content-panel>
    <content-panel>
      <template #header>Прогресс по датам</template>
      <template #default>
        <router-link class="image-link" to="period">
          <img src="../assets/calendar.png" alt="plus"
        /></router-link>
      </template>
    </content-panel>
  </div>
</template>

<script setup>
import ContentPanel from "../components/ContentPanel.vue";
import CurrentState from "../components/CurrentState.vue";
import CalculatedCalories from "../components/CalculatedCalories.vue";
import EatedToday from "../components/EatedToday.vue";

import { useStore } from "vuex";

const store = useStore();
const userData = store.getters["userDataModule/getUserData"];
</script>

<style lang="scss" scoped>
@import "../styles/mixins";

.double-group {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  .content-panel {
    width: 100%;
  }
}

.image-link {
  display: block;
  @include sizeImgContainer($size: 80px);
  margin: 0 auto;
  transition: transform 0.25s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
}

.main-progress {
  position: relative;

  &__link {
    display: block;
    @include sizeImgContainer($size: 35px);
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
  }
}
</style>
