<template>
  <HeaderPane />
  <div id="column-wrapper">
    <div class="column settings">
      <SettingsPane @onCalculate="calculateColors" />
    </div>
    <div class="column preview" v-if="isCalculated">
      <color-ramp-pane
          v-for="color in mainStore.colors" :key="color.id" 
          :color="color"
          :light-check-color="mainStore.settings.lightCheckColor"
          :dark-check-color="mainStore.settings.darkCheckColor"
      />
    </div>
    <div class="column curve" v-if="isCalculated">
      <curve-pane :colors="mainStore.colors" />
      <json-pane :colors="mainStore.colors" />
    </div>
  </div>
</template>

<script setup>
import HeaderPane from "./components/HeaderPane"
import SettingsPane from "./components/SettingsPane"
import ColorRampPane from "@/components/ColorRampPart"
import CurvePane from "@/components/CurvePane"
import JsonPane from "@/components/JsonPane";
import { useMainStore } from '@/stores/main'
import { ref } from "vue";

const mainStore = useMainStore()
const isCalculated = ref(false)

function calculateColors() {
  mainStore.calculateRamp()
  isCalculated.value = true
}
</script>

<style lang="scss">
@font-face {
  font-family: "FiraCode";
  src: url("./assets/FiraCode-VF.woff2") format("woff2 supports variations"),
  url("./assets/FiraCode-VF.woff2") format("woff2-variations");
  font-weight: 100 1000;
}
@font-face {
  font-family: "Rajdhani";
  font-style: normal;
  src: url("./assets/rajdhani-v15-latin-300.woff2") format("woff2 "),
  url("./assets/rajdhani-v15-latin-300.woff2") format("woff2");
  font-weight: 300;
}
@font-face {
  font-family: "Rajdhani";
  font-style: normal;
  src: url("./assets/rajdhani-v15-latin-600.woff2") format("woff2 "),
  url("./assets/rajdhani-v15-latin-600.woff2") format("woff2");
  font-weight: 600;
}

* {
  box-sizing: border-box;
}
html {
  font-size: 12px;
}
body {
  display: flex;
  justify-content: center;
  color: white;
  background: #000;
  font: 1em/1.375 FiraCode,arial,sans-serif;
  margin: 0;
}
button, input, optgroup, select, textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

#app {
  display: flex;
  flex-direction: column;
  background: #000;
  width: 1200px;
  height: 100vh;
}
#column-wrapper {
  display: flex;
  flex-direction: row;
  height: calc(100% - 125px);
  padding: 12px;
}
.column {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin-right: 20px;
  padding-top: 12px;
  &.settings {
    max-width: 300px;
  }
  &.preview {
    width: 440px;
    max-width: 440px;
  }
}
.column:not(:last-of-type) {
  padding-right: 20px;
  border-right: 1px solid #202020;
}
</style>