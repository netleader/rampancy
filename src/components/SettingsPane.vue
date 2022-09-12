<template>
  <div class="settings-wrapper">
    <div class="title">
      <div class="logo">Rampart</div>
      <div class="version-wrapper">
        <div class="block-start"></div>
        <div class="version">0.1.0 Beta</div>
        <div class="block"></div>
      </div>
    </div>
    <div>settings</div>
  </div>
</template>

<script>
export default {
  name: "SettingsPane"
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0 20px;
  user-select: none;
}
  .logo {
    color: #ee3500;
    font: 36px Rajdhani, arial,sans-serif;
    font-weight: lighter;
    text-transform: uppercase;
    line-height: 1;
  }
  .version-wrapper {
    display: flex;
    flex-direction: row;
  }
.block-start {
  display: flex;
  flex-grow: 1;
  background-color: #383838;
  margin: -4px 4px 4px 2px;
  max-width: 12px;
}
  .block {
    display: flex;
    flex-grow: 1;
    background-color: #383838;
    margin-top: -4px;
    margin-bottom: 4px;
    margin-left: 4px;
  }
  .version {
    text-transform: uppercase;
    font-size: 10px;
    color: #404040;
    margin-top: -6px;
  }
  .settings-wrapper {
    display: flex;
    border-bottom: 1px solid #202020;
    padding: 12px;
  }
</style>