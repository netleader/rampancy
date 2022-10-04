<template>
  <form @submit.prevent="requestCalculation">
    <div class="section-wrapper">
      <div class="section-title">Generic</div>
      <div class="row">
        <label for="inputName" class="col-form-label">Name</label>
        <div class="form-input-col">
          <input
              v-model="settings.name" v-on:input="requestCalculation"
              type="text" class="form-control" id="inputName" spellcheck="false" autocomplete="off">
        </div>
      </div>
    </div>
    
    <div class="section-wrapper">
      <div class="section-title">Colors</div>
      <div class="row">
        <label for="inputBaseColor" class="col-form-label">Base Color</label>
        <div class="form-input-col">
          <input v-model="settings.baseColor" v-on:change="requestCalculation"
              type="color" class="color-preview">
          <input
              v-model="settings.baseColor" v-on:change="requestCalculation"
              type="text" class="form-control" id="inputBaseColor" maxlength="7" spellcheck="false" autocomplete="off">
        </div>
      </div>
      <div class="row">
        <label for="inputForegroundLightColor" class="col-form-label">Light Check Color</label>
        <div class="form-input-col">
          <input v-model="settings.lightCheckColor" v-on:change="requestCalculation"
                 type="color" class="color-preview">
          <input 
              v-model="settings.lightCheckColor" v-on:change="requestCalculation"
              type="text" class="form-control" id="inputForegroundLightColor" maxlength="7" spellcheck="false" autocomplete="off">
        </div>
      </div>
      <div class="row">
        <label for="inputForegroundDarkColor" class="col-form-label">Dark Check Color</label>
        <div class="form-input-col">
          <input v-model="settings.darkCheckColor" v-on:change="requestCalculation"
                 type="color" class="color-preview">
          <input 
              v-model="settings.darkCheckColor" v-on:change="requestCalculation"
              type="text" class="form-control" id="inputForegroundDarkColor" maxlength="7" spellcheck="false" autocomplete="off">
        </div>
      </div>
    </div>
    
    <div class="section-wrapper">

      <div class="row">
        <div class="section-title title-col">Shades</div>
        <div class="form-input-col">

          <div class="form-check form-check-inline">
            <input v-model="settings.shadesColorSpace" value="lab"
             class="form-check-input" type="radio" name="shadesColorSpace" id="shadesColorSpaceLAB">
            <label class="form-check-label" for="shadesColorSpaceLAB">LAB</label>
          </div>

          <div class="form-check form-check-inline">
            <input  v-model="settings.shadesColorSpace" value="hsl"
              class="form-check-input" type="radio" name="shadesColorSpace" id="shadesColorSpaceHSL">
            <label class="form-check-label" for="shadesColorSpaceHSL">HSL</label>
          </div>

        </div>
      </div>

      <div class="row">
        <label for="inputAmountTints" class="col-form-label">Count</label>
        <div class="form-input-col">
          <input
              v-model="settings.countShades" v-on:input="requestCalculation"
              type="range" min="3" max="9" step="1" class="slider" id="inputAmountTints">
          <div class="slider-value">{{ settings.countShades }}</div>
        </div>
      </div>
      <div class="row">
        <label for="inputMinShadeFactor" class="col-form-label">Min.</label>
        <div class="form-input-col">
          <input
              v-model="settings.minShadeFactor" v-on:input="requestCalculation"
              type="range" min="0" max="100" step="1" class="slider" id="inputMinShadeFactor">
          <div class="slider-value">{{ settings.minShadeFactor }}</div>
        </div>
      </div>
      <div class="row">
        <label for="inputMaxShadeFactor" class="col-form-label">Max.</label>
        <div class="form-input-col">
          <input
              v-model="settings.maxShadeFactor" v-on:input="requestCalculation"
              type="range" :min="Number(settings.minShadeFactor) + 1" max="100" step="1" class="slider" id="inputMaxShadeFactor"> 
          <div class="slider-value">{{ settings.maxShadeFactor }}</div>
        </div>
      </div>
    </div>

    <div class="section-wrapper">

      <div class="row">
        <div class="section-title title-col">Tints</div>
        <div class="form-input-col">

          <div class="form-check form-check-inline">
            <input v-model="settings.tintsColorSpace" value="lab"
              class="form-check-input" type="radio" name="tintsColorSpace" id="tintsColorSpaceLAB">
            <label class="form-check-label" for="tintsColorSpaceLAB">LAB</label>
          </div>

          <div class="form-check form-check-inline">
            <input v-model="settings.tintsColorSpace" value="hsl"
              class="form-check-input" type="radio" name="tintsColorSpace" id="tintsColorSpaceHSL">
            <label class="form-check-label" for="tintsColorSpaceHSL">HSL</label>
          </div>

        </div>
      </div>

      <div class="row">
        <label for="inputAmountTints" class="col-form-label">Count</label>
        <div class="form-input-col">
          <input
              v-model="settings.countTints" v-on:input="requestCalculation"
              type="range" min="3" max="9" step="1" class="slider" id="inputAmountTints">
          <div class="slider-value">{{ settings.countTints }}</div>
        </div>
      </div>

      <div class="row">
        <label for="inputMinTintFactor" class="col-form-label">Min.</label>
        <div class="form-input-col">
          <input
              v-model="settings.minTintFactor" v-on:input="requestCalculation"
              type="range" min="0" max="100" step="1" class="slider" id="inputMinTintFactor">
          <div class="slider-value">{{ settings.minTintFactor }}</div>
        </div>
      </div>

      <div class="row">
        <label for="inputMaxTintFactor" class="col-form-label">Max.</label>
        <div class="form-input-col">
          <input
              v-model="settings.maxTintFactor" v-on:input="requestCalculation"
              type="range" min="0" :max="settings.maxTintFactorScale" step="1" class="slider" id="inputMaxTintFactor">
          <div class="slider-value">{{ settings.maxTintFactor }}</div>
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

function requestCalculation() {
  emit('onCalculate')
}
</script>

<style lang="scss" scoped>
$border-color: #3a3a3a;

input[type="color"] {
  cursor: pointer;
  -webkit-appearance: none;
  width: 36px;
  height: 100%;
  padding: 0;
  outline: 0;
  border-bottom: 1px solid $border-color;
  border-top: 1px solid $border-color;
  border-left: 1px solid $border-color;
  border-right: none;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
}
.form-check {
  display: flex;
  &-inline {
    margin-right: 1rem;
  }
  & > .form-check-label {
    margin-left: 8px;
  }
}

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
}
.title-col {
  width: 50%;
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
  align-items: center;
  width: 50%;
}
.color-preview {
  width: 36px;
  height: 100%;
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

$slider-size: 12px;

.slider {
  -webkit-appearance: none;
  width: 80%;
  height: 4px;
  border-radius: 4px;
  background: $border-color;
  outline: none;
  opacity: 1;
  -webkit-transition: .2s;
  transition: opacity .2s;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
  }
  &::-webkit-slider-thumb,
  &::-webkit-slider-thumb {
    width: $slider-size;
    height: $slider-size;
    border-radius: 50%;
    background: #ccc;
    cursor: pointer;
  }
  &-value {
    display: flex;
    justify-content: right;
    width: 20%;
  }
}
</style>