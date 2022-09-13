import { defineStore } from 'pinia'
const tinycolor = require("tinycolor2");

function calculateColorTint(hex, tintFactor) {
    const color = tinycolor(hex).toRgb()
    const red = color.r + ((255 - color.r) * tintFactor)
    const green = color.g + ((255 - color.g) * tintFactor)
    const blue = color.b + ((255 - color.b) * tintFactor)
    console.log(tintFactor)
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
    const spacing = (max - min) / (points - 1)
    return Number(spacing.toFixed(3));
}

function getTokenName(id, name) {
    return `color-${name}-${id}`
}

function calculateShadeRamp(name, baseColor, totalColors, minShadeFactor, maxShadeFactor, totalShades) {
    const result = []
    let previewsId = (totalColors * 100) + 100;
    const shadeFactorStep = calculateStepValue(minShadeFactor, maxShadeFactor, totalShades)

    for (let i = totalShades - 1; i >= 0; i--) {
        let newId = previewsId - 100
        result[i] = {
            id: newId,
            hex: calculateColorShade(baseColor, minShadeFactor),
            token: getTokenName(newId, name)
        }
        previewsId = newId
        minShadeFactor = shadeFactorStep + minShadeFactor
    }
    return result.reverse()
}

function calculateTintRamp(name, baseColor, totalColors, minTintFactor, maxTintFactor, totalTints) {
    const result = []
    const tintFactorStep = calculateStepValue(minTintFactor, maxTintFactor, totalTints)
    let currentStep = maxTintFactor
    for (let i = 0; i < totalTints; i++) {
        let newId = (i+1) * 100
        result[i] = {
            id: newId,
            hex: calculateColorTint(baseColor, currentStep),
            token: getTokenName(newId, name)
        }
        currentStep = currentStep - tintFactorStep
    }
    return result.reverse()
}

function generateBaseColorInfo(id, name, baseColor) {
    return {
        id,
        hex: baseColor,
        token: getTokenName(id, name)
    }
}

export const useMainStore = defineStore('main', {
    state: () => ({
        settings: {
            name: "Red",
            baseColor: "#e60012",
            lightCheckColor: "#f4f4f4",
            darkCheckColor: "#141414",
            countShades: 5,
            countTints: 4,
            minShadeFactor: 2.0,
            maxShadeFactor: 8.0,
            minTintFactor: 3.0,
            maxTintFactor: 8.0
        },
        colors: []
    }),
    getters: {
        totalColors: (state) => state.settings.countShades + state.settings.countTints + 1,
    },
    actions: {
        calculateRamp() {
            const shades = calculateShadeRamp(this.settings.name, this.settings.baseColor, this.totalColors, this.settings.minShadeFactor/10, this.settings.maxShadeFactor/10, this.settings.countShades)
            const base = shades.concat(generateBaseColorInfo(shades.at(-1).id - 100, this.settings.name, this.settings.baseColor))
            const tints = calculateTintRamp(this.settings.name, this.settings.baseColor, this.totalColors, this.settings.minTintFactor/10, this.settings.maxTintFactor/10, this.settings.countTints)
            this.colors = base.concat(tints)
        },
    },
})