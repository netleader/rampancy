<template>
    <div class="container">
        {{ JSON.stringify(props.colors, null, 2) }}
    </div>
</template>
  
<script setup>
  import { defineProps, ref } from "vue";
  import { useMainStore } from '@/stores/main'

  const mainStore = useMainStore()
  const settings = ref(mainStore.settings)
  
  const props = defineProps({
    colors: Object
  })
  
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