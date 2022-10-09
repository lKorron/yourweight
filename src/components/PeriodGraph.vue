<template>
  <Line
    class="graph"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  ></Line>
</template>

<script setup>
import { computed, defineProps, reactive } from "vue";
import { useStore } from "vuex";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

const props = defineProps({
  chartId: {
    type: String,
    default: "line-chart",
  },
  datasetIdKey: {
    type: String,
    default: "label",
  },
  width: {
    type: Number,
    default: 500,
  },
  height: {
    type: Number,
    default: 500,
  },
  cssClasses: {
    default: "",
    type: String,
  },
  styles: {
    type: Object,
    default: () => {},
  },
  plugins: {
    type: Object,
    default: () => {},
  },
});

const store = useStore();

const days = computed(() => store.getters["periodDataModule/getDays"]);
const calories = computed(() => store.getters["periodDataModule/getCalories"]);

const commonCalories = computed(
  () => store.getters["caloriesModule/getCommonCalories"]
);

const targetCalories = computed(
  () => store.getters["caloriesModule/getTargetCalories"]
);

const createPointLine = (value, pointCount) => {
  const pointArray = [];
  for (let i = 0; i < pointCount; i++) {
    pointArray.push(value);
  }

  return pointArray;
};

const chartData = reactive({
  labels: days.value,
  datasets: [
    {
      label: "Калории для изменения веса",
      backgroundColor: "green",
      borderColor: "green",
      data: createPointLine(targetCalories.value, days.value.length),
    },
    {
      label: "Калории для поддержания веса",
      backgroundColor: "yellow",
      borderColor: "yellow",
      data: createPointLine(commonCalories.value, days.value.length),
    },
    {
      label: "Калории",
      backgroundColor: "rgb(72, 169, 238)",
      borderColor: "rgb(72, 169, 238)",
      data: calories.value,
    },
  ],
});

const chartOptions = {
  responsive: true,
};
</script>

<style lang="scss" scoped>
.graph {
  margin: 0 auto;
  max-width: 500px;
}
</style>
