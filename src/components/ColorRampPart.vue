<template>
  <div class="color" :style="{ backgroundColor: color.hex}">
    <div class="wrapper" :style="{color: getForegroundColor}">
      <div class="id">{{ color.id }}</div>
      <div class="hex">{{ color.hex }}</div>
      <div class="token">{{ color.token }}</div>
    </div>
    <div class="spacer"></div>
    <div class="contrast-wrapper">
      
      <div class="contrast light foreground" :style="[color.contrastLight < maxAllowedContrast ? 'opacity: .3': '']">
        <font-awesome-icon v-if="color.contrastLight >= maxAllowedContrast" :style="{ color: lightCheckColor }" class="icon" icon="fa-solid fa-check" />
        <font-awesome-icon v-else class="icon icon-fail" icon="fa-solid fa-xmark" />
        <div class="rating" :style="{ color: lightCheckColor }">{{ color.contrastLight }}</div>
      </div>
      
      <div class="contrast dark foreground" :style="[color.contrastDark < maxAllowedContrast ? 'opacity: .3': '']">
        <font-awesome-icon v-if="color.contrastDark >= maxAllowedContrast" :style="{ color: darkCheckColor}" class="icon" icon="fa-solid fa-check" />
        <font-awesome-icon v-else class="icon icon-fail" icon="fa-solid fa-xmark" />
        <div class="rating" :style="{ color: darkCheckColor }">{{ color.contrastDark }}</div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const maxAllowedContrast = 4.5
const props = defineProps({
  color: Object,
  lightCheckColor: String,
  darkCheckColor: String
})

const getForegroundColor = computed(() => {
  return props.color.contrastLight >= props.color.contrastDark ? props.lightCheckColor : props.darkCheckColor
})

</script>

<style lang="scss" scoped>
.icon-fail {
  color: red;
}
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
  justify-content: left;
  border-radius: 3px;
  padding: 2px 6px;
  width: 56px;

  &.foreground {
    border: 1px solid rgba(white, 10%);
  }

  .rating {
    font-size: 10px;
    line-height: 2;
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