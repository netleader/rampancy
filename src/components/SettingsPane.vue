<template>
  <div class="section-wrapper">
    <div class="section-title">Colors</div>
    
    <div class="row">
      <label for="inputBaseColor" class="col-form-label">Base Color</label>
      <div class="form-input-col">
        <div class="color-preview"></div>
        <input type="text" class="form-control" id="inputBaseColor" maxlength="7" spellcheck="false" autocomplete="off">
      </div>
    </div>

    <div class="row">
      <label for="inputForegroundLightColor" class="col-form-label">Foreground Light</label>
      <div class="form-input-col">
        <div class="color-preview"></div>
        <input type="text" class="form-control" id="inputForegroundLightColor" maxlength="7" spellcheck="false" autocomplete="off">
      </div>
    </div>

    <div class="row">
      <label for="inputForegroundDarkColor" class="col-form-label">Foreground Dark</label>
      <div class="form-input-col">
        <div class="color-preview"></div>
        <input type="text" class="form-control" id="inputForegroundDarkColor" maxlength="7" spellcheck="false" autocomplete="off">
      </div>
    </div>
    
  </div>
  <div class="section-wrapper">
    <div class="section-title">Amount</div>

    <div class="row">
      <label for="inputAmountShades" class="col-form-label">Shades</label>
      <div class="form-input-col">
        <input type="number" class="form-control" id="inputAmountShades" maxlength="2" min="2" max="7" spellcheck="false" autocomplete="off">
      </div>
    </div>
    
    <div class="row">
      <label for="inputAmountTints" class="col-form-label">Tints</label>
      <div class="form-input-col">
        <input type="number" class="form-control" id="inputAmountTints" maxlength="2" min="2" max="6" spellcheck="false" autocomplete="off">
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "SettingsPane"
}
</script>

<style lang="scss" scoped>
$border-color: #3a3a3a;

.section-wrapper {
  width: 100%;
}
.section-title {
  color: #ee3500;
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

  color: #ccc;
  background-color: transparent;
  background-clip: padding-box;
  border: 1px solid $border-color;
  appearance: none;
  border-radius: 0;
  &:focus {
    outline: none ;
  }
}
</style>