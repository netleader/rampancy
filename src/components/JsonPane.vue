<template>
    <div class="container">
        {{ createJson() }}
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  const props = defineProps({
    colors: Object
  })

function createJson() {
    let output = []
    props.colors.forEach((color,index) => {
        output[index] = {
            "id": color.id,
            "hex": color.hex,
            "token": color.token,
            "contrastLightForeground": color.contrastLightForeground,
            "contrastDarkForeground": color.contrastDarkForeground,
            "contrastLightBackground": color.contrastLightBackground,
            "contrastDarkBackground": color.contrastDarkBackground,
        }
    });
  return JSON.stringify(output, null, 2)
}
  
  </script>
  
  <style lang="scss" scoped>

  .container {
    margin-top: 40px;
    white-space: pre;
    width: 351px;
    min-height: 300px;
    max-height: 400px;
    overflow-y: scroll;
    border: 1px solid #282828;
    padding: 8px;
  }
  </style>