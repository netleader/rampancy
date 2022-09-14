import {defineStore} from 'pinia'
import chroma from "chroma-js";
import _range from "lodash-es/_baseRange";

const tinycolor = require("tinycolor2");

function calculateColorTint(hex, tintFactor) {
    const color = tinycolor(hex).toRgb()
    const red = color.r + ((255 - color.r) * tintFactor)
    const green = color.g + ((255 - color.g) * tintFactor)
    const blue = color.b + ((255 - color.b) * tintFactor)
    return tinycolor({r: red, g: green, b: blue}).toHexString()
}

function calculateColorShade(hex, shadeFactor) {
    const color = tinycolor(hex).toRgb()
    const red = color.r * shadeFactor
    const green = color.g * shadeFactor
    const blue = color.b * shadeFactor
    return tinycolor({r: red, g: green, b: blue}).toHexString()
}

function calculateStepValue(min, max, points) {
    return (max - min) / points
}

// https://github.com/gka/palettes/blob/master/src/PalettePreview.svelte


function autoGradient(minPercentage, maxPercentage, color, numColors) {
    const lab = chroma(color).lab();
    
    let min = (lab[0] / 100) * minPercentage;
    let max = (lab[0] / 100) * maxPercentage;
    
    const step = calculateStepValue(min, max*1.1, numColors)
    let range = _range(min, max, step)

    console.log(range, step)

    const colors = range.map(l => chroma.lab([l, lab[1], lab[2]])).reverse()

    return chroma.scale(colors)
        .correctLightness(true)
        .colors(numColors)
}

function calculateShadeRamp(name, baseColor, totalColors, minShadeFactor, maxShadeFactor, totalShades) {
    const result = []
    const colors = autoGradient(minShadeFactor, maxShadeFactor, baseColor, totalShades)
    
    colors.forEach((color, index) => {
        result[index] = { hex: color }
    })
    return result.reverse()
}

function calculateTintRamp(name, baseColor, totalColors, minTintFactor, maxTintFactor, totalTints) {
    const result = []
    const tintFactorStep = calculateStepValue(minTintFactor, maxTintFactor, totalTints)
    let currentStep = maxTintFactor
    for (let i = 0; i < totalTints; i++) {
        result[i] = { hex: calculateColorTint(baseColor, currentStep) }
        currentStep = currentStep - tintFactorStep
    }
    return result.reverse()
}

function generateBaseColorInfo(baseColor) {
    return {
        hex: baseColor
    }
}

export const useMainStore = defineStore('main', {
    state: () => ({
        settings: {
            name: "blue",
            baseColor: "#1272b3",
            lightCheckColor: "#f4f4f4",
            darkCheckColor: "#141414",
            countShades: 5,
            countTints: 4,
            minShadeFactor: 10,
            maxShadeFactor: 90,
            minTintFactor: 2,
            maxTintFactor: 8
        },
        colors: []
    }),
    getters: {
        totalColors: (state) => state.settings.countShades + state.settings.countTints + 1,
        maxContrast: (state) => {
            const contrast = tinycolor.readability(state.settings.lightCheckColor, state.settings.darkCheckColor)
            return Math.round(contrast)
        }
    },
    actions: {
        ratioToPercentage(value) {
            return (1 / value) * 100
        },
        getColorInfos(ramp) {
            let totalColorCount = ramp.length
            ramp.forEach ((color) => {
                color.id = totalColorCount * 100
                color.token = `color-${this.settings.name}-${color.id}`

                color.lightness = tinycolor(color.hex).toHsl().l * 100
                color.saturation = tinycolor(color.hex).toHsl().s * 100
                
                color.contrastLight = Number(tinycolor.readability(color.hex, this.settings.lightCheckColor)).toFixed(1)
                color.contrastDark = Number(tinycolor.readability(color.hex, this.settings.darkCheckColor)).toFixed(1)
                
                totalColorCount--
            });
            return ramp
        },
        calculateRamp() {
            const shades = calculateShadeRamp(this.settings.name, this.settings.baseColor, this.totalColors, this.settings.minShadeFactor, this.settings.maxShadeFactor, this.settings.countShades)
            const base = shades.concat(generateBaseColorInfo(this.settings.baseColor))
            const tints = calculateTintRamp(this.settings.name, this.settings.baseColor, this.totalColors, this.settings.minTintFactor/10, this.settings.maxTintFactor/10, this.settings.countTints)
            
            this.colors = this.getColorInfos(base.concat(tints))
        }
    },
})