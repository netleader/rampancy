<template>
  <div class="pane-wrapper">
    <div class="title">
      <div class="logo">rampancy</div>
      <div class="version-wrapper">
        <div class="block"></div>
        <div class="version">0.0.0 Beta</div>
        <div class="block-fixed"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderPane"
}
</script>

<style lang="scss" scoped>
.title {
  margin-right: 40px;
  margin-left: 4px;
  user-select: none;
}
  .logo {
    color: #ee3500;
    font: 36px Rajdhani, arial,sans-serif;
    font-weight: lighter;
    text-transform: uppercase;
    line-height: 1;
    & > strong {
      color: #eae3d6;
      font-weight: 300;
    }
  }
  .version-wrapper {
    display: flex;
    flex-direction: row;
  }
.block-fixed {
  display: flex;
  flex-grow: 1;
  background-color: #383838;
  margin: -4px 2px 4px 4px;
  max-width: 8px;
}
  .block {
    display: flex;
    flex-grow: 1;
    background-color: #383838;
    margin: -4px 4px 4px 2px;
  }
  .version {
    text-transform: uppercase;
    font-size: 10px;
    color: #404040;
    margin-top: -6px;
  }
  .pane-wrapper {
    display: flex;
    border-bottom: 1px solid #080808;
    padding: 12px;
  }
</style>