<template>
  <HeaderPane />
  <div id="column-wrapper">
    <div class="column settings">
      <SettingsPane />
    </div>
    <div class="column preview">preview</div>
    <div class="column curve">curve</div>
  </div>
</template>

<script>
import HeaderPane from "./components/HeaderPane"
import SettingsPane from "./components/SettingsPane"

export default {
  name: 'App',
  components: {
    HeaderPane,
    SettingsPane
  }
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
  align-items: center;
  justify-content: center;
  color: white;
  background: #080808;
  font: 1em/1.375 FiraCode,arial,sans-serif;
  margin: 0;
}
html, body {
  height: 100%;
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
  background: #121212;
  border-radius: 4px;
  width: 1200px;
  height: 600px;
}
#column-wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 12px;
}
.column {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 20px;
  &.settings {
    max-width: 300px;
  }
}
</style>