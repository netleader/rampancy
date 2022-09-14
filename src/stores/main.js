import {defineStore} from 'pinia'
import chroma from "chroma-js";
import _range from "lodash-es/_baseRange";

const tinycolor = require("tinycolor2");

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
            lightCheckColor: "#fff",
            darkCheckColor: "#000",
            countShades: 5,
            countTints: 4,
            minShadeFactor: 25,
            maxShadeFactor: 90,
            minTintFactor: 20,
            maxTintFactor: 125
        },
        colors: []
    }),
    actions: {
        getColorInfos(ramp) {
            let totalColorCount = ramp.length
            ramp.forEach ((color) => {
                color.id = totalColorCount * 100
                color.token = `color-${this.settings.name}-${color.id}`
                color.lightness = tinycolor(color.hex).toHsl().l * 100
                color.saturation = tinycolor(color.hex).toHsl().s * 100
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