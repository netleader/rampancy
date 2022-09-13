<template>
  <div class="container">
    
    <div class="grid-wrapper">
      <div class="grid">
        <div class="test"></div>
      </div>
      <div class="right">
        <div>0</div>
        <div>Lightness</div>
        <div>100</div>
      </div>
    </div>
    <div class="bottom">
      <div>0</div>
      <div>Saturation</div>
      <div>100</div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

$grid-width: 351px;
$grid-box-size: 35px;

.container {

}
.bottom {
  width: $grid-width;
  user-select: none;
  font-size: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
}
.right {
  user-select: none;
  font-size: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 4px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
.test {
  position: absolute;
  height: 20px;
  width: 20px;
  background: red;
}
.grid {
  position: relative;
  width: $grid-width;
  height: $grid-width;
  background-size: $grid-box-size $grid-box-size;
  background-image:
      linear-gradient(to right, #3a3a3a 1px, transparent 1px),
      linear-gradient(to bottom, #3a3a3a 1px, transparent 1px);
  &-wrapper {
    display: flex;

  }
}
</style>