<template>
  <div class="color" :style="{ backgroundColor: color.hex}">
    <div class="wrapper" :style="{color: getForegroundColor}">
      <div class="id">{{ color.id }}</div>
      <div class="hex">{{ color.hex }}</div>
      <div class="token">{{ color.token }}</div>
    </div>
    <div class="spacer"></div>
    <div class="contrast-wrapper">
      
      <div class="contrast light foreground" :style="[lightLuminanceContrast <= maxAllowedLc ? 'opacity: .3': '']">
        <font-awesome-icon v-if="lightLuminanceContrast >= maxAllowedLc" :style="{ color: lightCheckColor }" class="icon" icon="fa-solid fa-check" />
        <font-awesome-icon v-else class="icon icon-fail" icon="fa-solid fa-xmark" />
        <div class="rating" :style="{ color: lightCheckColor }">{{ lightLuminanceContrast }}</div>
      </div>
      
      <div class="contrast dark foreground" :style="[darkLuminanceContrast <= maxAllowedLc ? 'opacity: .3': '']">
        <font-awesome-icon v-if="darkLuminanceContrast >= maxAllowedLc" :style="{ color: darkCheckColor}" class="icon" icon="fa-solid fa-check" />
        <font-awesome-icon v-else class="icon icon-fail" icon="fa-solid fa-xmark" />
        <div class="rating" :style="{ color: darkCheckColor }">{{ darkLuminanceContrast }}</div>
      </div>

      <div class="contrast light" :style="[lightBackgroundLuminanceContrast <= maxAllowedLc ? 'opacity: .3' : '', {backgroundColor: lightCheckColor}]">
        <font-awesome-icon v-if="lightBackgroundLuminanceContrast >= maxAllowedLc" :style="{ color: color.hex }" class="icon" icon="fa-solid fa-check" />
        <font-awesome-icon v-else class="icon icon-fail" icon="fa-solid fa-xmark" />
        <div class="rating" :style="{ color: color.hex }">{{ lightBackgroundLuminanceContrast }}</div>
      </div>

      <div class="contrast dark" :style="[darkBackgroundLuminanceContrast <= maxAllowedLc ? 'opacity: .3' : '', {backgroundColor: darkCheckColor}]">
        <font-awesome-icon v-if="darkBackgroundLuminanceContrast >= maxAllowedLc" :style="{ color: color.hex }" class="icon" icon="fa-solid fa-check" />
        <font-awesome-icon v-else class="icon icon-fail" icon="fa-solid fa-xmark" />
        <div class="rating" :style="{ color: color.hex }">{{ darkBackgroundLuminanceContrast }}</div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { calcAPCA } from 'apca-w3';

const maxAllowedLc = 59
const props = defineProps({
  color: Object,
  lightCheckColor: String,
  darkCheckColor: String
})

const lightLuminanceContrast = computed(() => {
  const lc = Math.round(calcAPCA(props.lightCheckColor, props.color.hex))
  return Math.abs(lc)
})
const lightBackgroundLuminanceContrast = computed(() => {
  return Math.round(calcAPCA(props.color.hex, props.lightCheckColor))
})

const darkLuminanceContrast = computed(() => {
  return Math.round(calcAPCA(props.darkCheckColor, props.color.hex))
})

const darkBackgroundLuminanceContrast = computed(() => {
  const lc =  Math.round(calcAPCA(props.color.hex, props.darkCheckColor))
  return Math.abs(lc)
})

const getForegroundColor = computed(() => {
  return lightLuminanceContrast.value >= maxAllowedLc ? props.lightCheckColor : props.darkCheckColor
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
  padding: 2px 8px;
  width: 55px;
  height: 22px;

  &.foreground {
    border: 1px solid rgba(white, 10%);
  }

  .rating {
    font-size: 1rem;
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