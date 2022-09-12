<template>
  <div class="color" :style="{ backgroundColor: color.hex}">
    <div class="wrapper">
      <div class="id">{{ color.id }}</div>
      <div class="hex">{{ color.hex }}</div>
      <div class="token">{{ color.token }}</div>
    </div>
    <div class="spacer"></div>
    <div class="contrast-wrapper">
      <div class="contrast light foreground">
        <font-awesome-icon class="icon" icon="fa-solid fa-check" />
        <div class="rating">100</div>
      </div>
      <div class="contrast dark foreground">
        <font-awesome-icon class="icon" icon="fa-solid fa-check" />
        <div class="rating">100</div>
      </div>
      <div class="contrast light background">
        <font-awesome-icon class="icon" icon="fa-solid fa-xmark" />
        <div class="rating">100</div>
      </div>
      <div class="contrast dark background">
        <font-awesome-icon class="icon" icon="fa-solid fa-check" />
        <div class="rating">100</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, onMounted} from 'vue'

defineProps({
  color: Object
})

onMounted(() => {
  console.log("tinycolor")
})

</script>

<style lang="scss" scoped>
.spacer {
  display: flex;
  flex-grow: 1;
}
.color {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 20px;
  background-color: #42b983;
  &:first-of-type {
    border-radius: 4px 4px 0 0;
  }
  &:last-of-type {
    border-radius: 0 0 4px 4px;
  }
}
.contrast-wrapper {
  user-select: none;
  display: flex;
}
.contrast {
  display: flex;
  align-items: center;
  border-radius: 3px;
  padding: 2px 6px;

  &.foreground {
    border: 1px solid rgba(white, 33%);
  }

  & > .icon {
    margin-right: 4px;
  }
  &.light.foreground > .rating {
    color: white;
  }
  &.dark.foreground > .rating {
    color: black;
  }
  &.light.background {
    color: black;
    background-color: white;
  }
  &.dark.background {
    color: white;
    background-color: #000;
  }
}
.contrast:not(:last-of-type) {
  margin-right: 8px;
}
.wrapper {
  margin-right: 12px;
  & > .id {
    user-select: none;
    font-size: 18px;
  }
  & > .hex, & > .token {
    font-size: 10px;
    text-transform: lowercase;
    line-height: 1.1;
    opacity: 0.6;
  }
}
</style>