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

function calculateShadeRamp(name, baseColor, totalColors, minShadeFactor, totalShades) {
    const result = []
    let previewsId = (totalColors * 100) + 100;
    const shadeFactorStep = calculateStepValue(minShadeFactor, .8, totalShades)

    for (let i = totalShades-1; i >= 0; i--) {
        let newId = previewsId - 100
        result[i] = {
            id: newId,
            hex: calculateColorShade(baseColor, minShadeFactor),
            token: "color-" + name + "-" + newId
        }
        previewsId = newId
        minShadeFactor = shadeFactorStep + minShadeFactor
    }
    return result.reverse()
}

function calculateTintRamp(name, baseColor, totalColors, minTintFactor, maxTintFactor, totalTints) {
    const result = []
    let x = 0.75

    const tintFactorStep = calculateStepValue(minTintFactor, maxTintFactor, totalTints)
    
    for (let i = 0; i < totalTints; i++) {
        let newId = (i+1) * 100
        result[i] = {
            id: newId,
            hex: calculateColorTint(baseColor, tintFactorStep),
            token: "color-" + name + "-" + newId
        }
        x = x - ((8 / totalTints) / 10)
    }
    return result.reverse()
}

function generateBaseColorInfo(id, name, baseColor) {
    return {
        id,
        hex: baseColor,
        token: "color-" + name + "-" + id
    }
}

export const useMainStore = defineStore('main', {
    state: () => ({
        settings: {
            name: "Red",
            baseColor: "#e60012",
            lightCheckColor: "#f4f4f4",
            darkCheckColor: "#202020",
            countShades: 5,
            countTints: 4
        },
        colors: []
    }),
    getters: {
        totalColors: (state) => state.settings.countShades + state.settings.countTints + 1,
    },
    actions: {
        calculateRamp() {
            const shades = calculateShadeRamp(this.settings.name, this.settings.baseColor, this.totalColors, .2, this.settings.countShades)
            const base = shades.concat(generateBaseColorInfo(shades.at(-1).id - 100, this.settings.name, this.settings.baseColor))
            const tints = calculateTintRamp(this.settings.name, this.settings.baseColor, this.totalColors, .2, 1, this.settings.countTints)
            this.colors = base.concat(tints)
        },
    },
})