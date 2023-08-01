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
    let json = { 
      [props.colors[0].name]: {}
    }
    props.colors.forEach(color => {
      json[color.name][color.id] = {
        'value': color.hex,
        'type': 'color'
    }});
    return JSON.stringify(json, null, 2)
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