<template>
  <div class="container">
    <div class="grid-wrapper">
      <div class="grid">
        <div 
            v-for="color in colors" :key="color.id"
            :style="{ 
              backgroundColor: color.hex, 
              top: color.lightness + '%',
              left: getSaturationPosition(color.saturation)
            }"
            class="test" ></div>
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
import { useMainStore } from '@/stores/main'
import { ref } from "vue";

const mainStore = useMainStore()
const colors = ref(mainStore.colors)

function getSaturationPosition(saturation) {
  return `calc(${saturation}% - 8px)`
}

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
  height: 16px;
  width: 16px;
  border-radius: 8px;
}
.grid {
  position: relative;
  width: $grid-width;
  height: $grid-width;
  background-size: $grid-box-size $grid-box-size;
  background-image:
      linear-gradient(to right, #282828 1px, transparent 1px),
      linear-gradient(to bottom, #282828 1px, transparent 1px);
  &-wrapper {
    display: flex;

  }
}
</style>