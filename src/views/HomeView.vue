<template>
  <content-panel class="main-progress">
    <template #header>Общий прогресс</template>
    <template #default
      ><current-state
        :weight="userData.weight"
        :targetWeight="userData.targetWeight"
      ></current-state>
      <router-link to="about" class="main-progress__about-link button">
        <img src="../assets/about.png" alt="about" />
      </router-link>
      <div class="main-progress__link-group">
        <button @click="onReset" class="main-progress__reset-button button">
          <img src="../assets/reset.png" alt="reset" />
        </button>
        <router-link to="weight" class="main-progress__weight-link button"
          ><img src="../assets/weight-scale.png" alt="weight-scale"
        /></router-link>
      </div>
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
        <router-link class="link" to="eatedToday">
          <div v-if="todayData" class="preview preview_today">
            <period-cards today preview></period-cards>
          </div>
          <div v-else class="link__image image-link">
            <img src="../assets/plus.png" alt="plus" />
          </div>
        </router-link>
      </template>
    </content-panel>
    <content-panel class="progress-panel">
      <template #header>
        <div class="progress-panel__header">Прогресс по датам</div>
      </template>
      <template #default>
        <router-link class="link" to="period">
          <div v-if="isPreviewAvailable" class="preview preview_period">
            <period-cards cards-count="3" preview></period-cards>
          </div>
          <div v-else class="link__image image-link">
            <img src="../assets/calendar.png" alt="plus" />
          </div>
        </router-link>
      </template>
    </content-panel>
  </div>

  <content-panel>
    <template #header>График</template>
    <template #default><period-graph></period-graph></template>
  </content-panel>

  <async-popup ref="resetPopup" dark-background>
    <template #header>Сброс данных</template>
    <template #default><reset-data></reset-data></template>
    <template #button><div></div></template>
  </async-popup>
</template>

<script setup>
import ContentPanel from "../components/ContentPanel.vue";
import CurrentState from "../components/CurrentState.vue";
import CalculatedCalories from "../components/CalculatedCalories.vue";
import EatedToday from "../components/EatedToday.vue";

import { useStore } from "vuex";
import { ref, computed } from "vue";
import PeriodGraph from "@/components/PeriodGraph.vue";
import PeriodCards from "@/components/PeriodCards.vue";
import AsyncPopup from "@/components/AsyncPopup.vue";
import ResetData from "@/components/ResetData.vue";

const resetPopup = ref(null);

const store = useStore();
const userData = computed(() => store.getters["userDataModule/getUserData"]);
const periodData = computed(() => store.getters["periodDataModule/getPeriod"]);
const todayData = computed(
  () => store.getters["periodDataModule/getTodayData"]
);
const isPreviewAvailable = computed(() => periodData.value.size > 0);

const onReset = () => {
  resetPopup.value.open();
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/classes";
@import "../styles/variables";
.double-group {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  .content-panel {
    width: 100%;
  }

  @media (max-width: $md1) {
    display: block;
  }
}

.main-progress {
  position: relative;

  &__link-group {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;

    > :not(:last-child) {
      margin-right: 10px;
    }
  }

  &__about-link,
  &__weight-link,
  &__reset-button {
    display: block;
    @include sizeImgContainer($size: 35px);
    background: none;
    border: none;
    padding: 0;
  }

  &__about-link {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
  }

  @media (max-width: $md3) {
    padding: 10px;
    padding-top: 25px;
  }
}

.preview {
  transition: transform 0.25s;
  &:hover {
    transform: scale(1.03);
  }

  &_today {
    margin: 0 auto;
    max-width: 170px;
  }

  &_period {
    display: grid;
    grid-template-columns: repeat(3, 170px);
    gap: 10px;

    @media (max-width: $md2) {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      row-gap: 50px;
      padding: 20px;
    }
  }
}

.link {
  display: inline-block;
  color: inherit;
  text-decoration: none;
}

.progress-panel {
  &__header {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>
