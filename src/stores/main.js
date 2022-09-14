import { defineStore } from 'pinia'
import chroma from "chroma-js";
import _range from 'lodash-es/range';
const tinycolor = require("tinycolor2");

function calculateColorTint(hex, tintFactor) {
    const color = tinycolor(hex).toRgb()
    const red = color.r + ((255 - color.r) * tintFactor)
    const green = color.g + ((255 - color.g) * tintFactor)
    const blue = color.b + ((255 - color.b) * tintFactor)
    return tinycolor({r: red, g: green, b: blue}).toHexString()
}

// function calculateColorShade(hex, shadeFactor) {
//     const color = tinycolor(hex).toRgb()
//     const red = color.r * shadeFactor
//     const green = color.g * shadeFactor
//     const blue = color.b * shadeFactor
//     return tinycolor({r: red, g: green, b: blue}).toHexString()
// }

function calculateStepValue(min, max, points) {
    const spacing = (max - min) / (points - 1)
    return Number(spacing.toFixed(3));
}
function autoGradient(color, numColors) {
    const lab = chroma(color).lab();
    
    const lRange = 100 * (0.95 - 1/numColors);
    const lStep = lRange / (numColors-1);
    let lStart = (100-lRange)*0.5;
    const range = _range(lStart, lStart+numColors*lStep, lStep);
    
    console.log(lStep)
    
    let offset = 9999;
    for (let i=0; i < numColors; i++) {
        let diff = lab[0] - range[i];
        if (Math.abs(diff) < Math.abs(offset)) {
            offset = diff;
        }
    }
    return range.map(l => chroma.lab([l + offset, lab[1], lab[2]]));
}

function calculateShadeRamp(name, baseColor, totalColors, minShadeFactor, maxShadeFactor, totalShades) {
    const result = []
    const shadeFactorStep = calculateStepValue(minShadeFactor, maxShadeFactor, totalShades)
    console.log(shadeFactorStep)
    
    const genColors = autoGradient(baseColor, totalShades)
    const stepsLeft = chroma.scale(genColors).correctLightness(true).colors(totalShades)

    for (let i = totalShades - 1; i >= 0; i--) {
        // result[i] = { hex: calculateColorShade(baseColor, minShadeFactor) }
        result[i] = { hex: stepsLeft[i] }
        minShadeFactor = shadeFactorStep + minShadeFactor
    }
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
            minShadeFactor: 1.5,
            maxShadeFactor: 7.5,
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
            const shades = calculateShadeRamp(this.settings.name, this.settings.baseColor, this.totalColors, this.settings.minShadeFactor/10, this.settings.maxShadeFactor/10, this.settings.countShades)
            const base = shades.concat(generateBaseColorInfo(this.settings.baseColor))
            const tints = calculateTintRamp(this.settings.name, this.settings.baseColor, this.totalColors, this.settings.minTintFactor/10, this.settings.maxTintFactor/10, this.settings.countTints)
            
            this.colors = this.getColorInfos(base.concat(tints))
        }
    },
})