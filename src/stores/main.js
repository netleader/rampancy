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

function calculateStepValue(min, max, points) {
    return (max - min) / points
}

// https://github.com/gka/palettes/blob/master/src/PalettePreview.svelte


function autoShades(minPercentage, maxPercentage, color, numColors) {
    const lab = chroma(color).lab();
    const min = (lab[0] / 100) * minPercentage;
    const max = (lab[0] / 100) * maxPercentage;
    const step = calculateStepValue(min, max * 1.1, numColors)
    const range = _range(min, max, step)
    const colors = range.map(l => chroma.lab([l, lab[1], lab[2]])).reverse()

    return chroma.scale(colors)
        .correctLightness(true)
        .colors(numColors)
}

function autoTints(minPercentage, maxPercentage, color, numColors) {
    const lab = chroma(color).lab();
    const min = lab[0] + ((100 - lab[0]) / 100 * minPercentage)
    const max = lab[0] + ((100 - lab[0]) / 100 * maxPercentage)
    const step = (max - min) / numColors
    let range = []
    let previewsStep = 0
    for (let i = 0; i <= numColors; i++ ) {
        range.push(min + previewsStep)
        previewsStep = previewsStep + step
    }
    const colors = range.map(l => chroma.lab([l, lab[1], lab[2]])).reverse()

    return chroma.scale(colors)
        .correctLightness(true)
        .colors(numColors)
}

function calculateShadeRamp(baseColor, minShadeFactor, maxShadeFactor, totalShades) {
    const result = []
    const colors = autoShades(minShadeFactor, maxShadeFactor, baseColor, totalShades)
    
    colors.forEach((color, index) => {
        result[index] = { hex: color }
    })
    return result.reverse()
}

function calculateTintRamp(baseColor, minTintFactor, maxTintFactor, totalTints) {
    const result = []

    const colors = autoTints(minTintFactor, maxTintFactor, baseColor, totalTints)
    colors.forEach((color, index) => {
        result[index] = { hex: color }
    })

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
            name: "red",
            baseColor: "#f24822",
            lightCheckColor: "#f4f4f4",
            darkCheckColor: "#141414",
            countShades: 5,
            countTints: 4,
            minShadeFactor: 10,
            maxShadeFactor: 90,
            minTintFactor: 10,
            maxTintFactor: 80
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

                color.hue = tinycolor(color.hex).toHsl().h
                color.lightness = tinycolor(color.hex).toHsl().l * 100
                color.saturation = tinycolor(color.hex).toHsl().s * 100
                color.luminance = Math.round(chroma(color.hex).luminance() * 100)
                
                color.contrastLight = Number(tinycolor.readability(color.hex, this.settings.lightCheckColor)).toFixed(1)
                color.contrastDark = Number(tinycolor.readability(color.hex, this.settings.darkCheckColor)).toFixed(1)
                
                totalColorCount--
            });
            return ramp
        },
        calculateRamp() {
            const shades = calculateShadeRamp(this.settings.baseColor, this.settings.minShadeFactor, this.settings.maxShadeFactor, this.settings.countShades)
            const base = shades.concat(generateBaseColorInfo(this.settings.baseColor))
            const tints = calculateTintRamp(this.settings.baseColor, this.settings.minTintFactor, this.settings.maxTintFactor, this.settings.countTints)
            
            this.colors = this.getColorInfos(base.concat(tints))
        }
    },
})