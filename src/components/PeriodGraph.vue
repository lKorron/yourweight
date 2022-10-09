<template>
  <div>graph</div>
  <Line
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
import { computed, defineProps } from "vue";
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
    default: 400,
  },
  height: {
    type: Number,
    default: 400,
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

const chartData = {
  labels: ["January", "February", "March"],
  datasets: [{ data: [40, 20, 12] }, { data: [15, 15, 15] }],
};

const chartOptions = {
  responsive: true,
};

const store = useStore();

const periodMap = computed(() => store.getters["periodDataModule/getPeriod"]);

console.log(periodMap);
</script>

<style lang="scss" scoped></style>
