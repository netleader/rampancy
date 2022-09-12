<template>
  <form @submit.prevent="onSubmit">
    <div class="section-wrapper">
      <div class="section-title">Generic</div>
  
      <div class="row">
        <label for="inputName" class="col-form-label">Name</label>
        <div class="form-input-col">
          <input v-model="settings.name" type="text" class="form-control" id="inputName" spellcheck="false" autocomplete="off">
        </div>
      </div>
  
    </div>
    
    <div class="section-wrapper">
      <div class="section-title">Colors</div>
      
      <div class="row">
        <label for="inputBaseColor" class="col-form-label">Base Color</label>
        <div class="form-input-col">
          <div class="color-preview" :style="{ backgroundColor: settings.baseColor }"></div>
          <input v-model="settings.baseColor" type="text" class="form-control" id="inputBaseColor" maxlength="7" spellcheck="false" autocomplete="off">
        </div>
      </div>
  
      <div class="row">
        <label for="inputForegroundLightColor" class="col-form-label">Light Check Color</label>
        <div class="form-input-col">
          <div class="color-preview" :style="{ backgroundColor: settings.lightCheckColor }"></div>
          <input v-model="settings.lightCheckColor" type="text" class="form-control" id="inputForegroundLightColor" maxlength="7" spellcheck="false" autocomplete="off">
        </div>
      </div>
  
      <div class="row">
        <label for="inputForegroundDarkColor" class="col-form-label">Dark Check Color</label>
        <div class="form-input-col">
          <div class="color-preview" :style="{ backgroundColor: settings.darkCheckColor }"></div>
          <input v-model="settings.darkCheckColor" type="text" class="form-control" id="inputForegroundDarkColor" maxlength="7" spellcheck="false" autocomplete="off">
        </div>
      </div>
      
    </div>
    <div class="section-wrapper">
      <div class="section-title">Amount</div>
  
      <div class="row">
        <label for="inputAmountShades" class="col-form-label">Shades</label>
        <div class="form-input-col">
          <input v-model="settings.countShades" type="number" class="form-control" id="inputAmountShades" maxlength="2" min="2" max="7" spellcheck="false" autocomplete="off">
        </div>
      </div>
      
      <div class="row">
        <label for="inputAmountTints" class="col-form-label">Tints</label>
        <div class="form-input-col">
          <input v-model="settings.countTints" type="number" class="form-control" id="inputAmountTints" maxlength="2" min="2" max="6" spellcheck="false" autocomplete="off">
        </div>
      </div>
      
    </div>
    <button type="submit" class="btn btn-primary">Calculate</button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()
const settings = ref(mainStore.settings)
const emit = defineEmits(['onCalculate'])

function onSubmit() {
  emit('onCalculate')
}
</script>

<style lang="scss" scoped>
$border-color: #3a3a3a;

.btn {
  border: none;
  border-radius: 2px;
  padding: 8px 20px;
  width: 100%;
  &-primary {
    color: white;
    background-color: #222;
    &:hover {
      background-color: #333;
      cursor: pointer;
    }
  }
}
.section-wrapper {
  width: 100%;
  margin-bottom: 20px;
}
.section-title {
  color: #e7e7e7;
  font-family: Rajdhani, sans-serif;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 300;
  margin-bottom: 8px;
}
.row {
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
}
.col-form-label {
  color: #666;
  margin-bottom: 0;
  font-size: inherit;
  line-height: 1.5;
  padding-top: calc(.375rem + 1px);
  padding-bottom: calc(.375rem + 1px);
  width: 50%;
  
}
.form-input-col {
  display: flex;
  flex-direction: row;
  width: 50%;
}
.color-preview {
  width: 36px;
  border-bottom: 1px solid $border-color;
  border-top: 1px solid $border-color;
  border-left: 1px solid $border-color;
}
.form-control {
  font-size: 1rem;
  display: block;
  width: 100%;
  line-height: 1.5;
  padding: .375rem .75rem;
  text-transform: lowercase;

  color: #ccc;
  background-color: transparent;
  background-clip: padding-box;
  border: 1px solid $border-color;
  appearance: none;
  border-radius: 0;
  &:focus {
    border-color: lighten($border-color, 20%);
    outline: none ;
  }
}
</style>