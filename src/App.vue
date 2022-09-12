<template>
  <SettingsPane />
  <div>test</div>
</template>

<script>
import SettingsPane from "./components/SettingsPane"

export default {
  name: 'App',
  components: {
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
#app {
  display: flex;
  flex-direction: column;
  background: #121212;
  border-radius: 4px;
  width: 1000px;
  height: 600px;
}
</style>