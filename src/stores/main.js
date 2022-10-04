import { defineStore } from 'pinia'
import { calcAPCA } from 'apca-w3';
import chroma from "chroma-js";
import _range from "lodash-es/_baseRange";
import ColorSpaces from '../enums/colorSpaces';


function calculateStepValue(min, max, points) {
    return (max - min) / points
}

// https://github.com/gka/palettes/blob/master/src/PalettePreview.svelte
function getShades(colorSpace, minPercentage, maxPercentage, color, numColors) {
    let chromaColor = chroma(color)
    let lightness = null
    let colors = null

    switch (colorSpace) {
        case ColorSpaces.HSL:
            chromaColor = chromaColor.hsl();
            lightness = chromaColor[2]
            break;

        case ColorSpaces.LAB:
            chromaColor = chromaColor.lab();
            lightness = chromaColor[0]
            break;
    }

    const min = (lightness / 100) * minPercentage;
    const max = (lightness / 100) * maxPercentage;
    const step = calculateStepValue(min, max, numColors)
    const range = _range(min, max, step)

    switch (colorSpace) {
        case ColorSpaces.HSL:
            colors = range.map(l => chroma.hsl([chromaColor[0], chromaColor[1], l])).reverse()
            break;

        case ColorSpaces.LAB:
            colors = range.map(l => chroma.lab([l, chromaColor[1], chromaColor[2]])).reverse()
            break;
    }

    return chroma.scale(colors)
        .correctLightness(true)
        .colors(numColors)
}

function getTints(colorSpace, minPercentage, maxPercentage, color, numColors) {
    let chromaColor = chroma(color)
    let lightness = null
    let colors = null
    let scale = 100

    switch (colorSpace) {
        case ColorSpaces.HSL:
            chromaColor = chromaColor.hsl();
            lightness = chromaColor[2]
            scale = 1
            break;

        case ColorSpaces.LAB:
            chromaColor = chromaColor.lab();
            lightness = chromaColor[0]
            break;
    }


    const min = lightness + ((scale - lightness) / 100 * minPercentage)
    const max = lightness + ((scale - lightness) / 100 * maxPercentage)

    const step = (max - min) / numColors
    let range = []
    let previewsStep = 0

    for (let i = 0; i <= numColors; i++ ) {
        range.push(min + previewsStep)
        previewsStep = previewsStep + step
    }

    switch (colorSpace) {
        case ColorSpaces.HSL:
            colors = range.map(l => chroma.hsl([chromaColor[0], chromaColor[1], l])).reverse()
            break;

        case ColorSpaces.LAB:
            colors = range.map(l => chroma.lab([l, chromaColor[1], chromaColor[2]])).reverse()
            break;
    }

    return chroma.scale(colors)
        .correctLightness(true)
        .colors(numColors)
}

function calculateShadeRamp(colorSpace, baseColor, minShadeFactor, maxShadeFactor, totalShades) {
    const result = []
    const colors = getShades(colorSpace, minShadeFactor, maxShadeFactor, baseColor, totalShades)
    
    colors.forEach((color, index) => {
        result[index] = { hex: color }
    })
    return result.reverse()
}

function calculateTintRamp(colorSpace, baseColor, minTintFactor, maxTintFactor, totalTints) {
    const result = []
    const colors = getTints(colorSpace, minTintFactor, maxTintFactor, baseColor, totalTints)
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
            name: "Purple",
            baseColor: "#730ff8",
            lightCheckColor: "#ffffff",
            darkCheckColor: "#000000",
            countShades: 5,
            countTints: 4,
            shadesColorSpace: "hsl",
            tintsColorSpace: "hsl",
            minShadeFactor: 43,
            maxShadeFactor: 96,
            minTintFactor: 58,
            maxTintFactor: 90,
            maxTintFactorScale: 200
        },
        colors: []
    }),
    actions: {
        getColorInfos(ramp) {
            let totalColorCount = ramp.length
            ramp.forEach ((color) => {
                color.id = totalColorCount * 100
                color.token = `Color.${this.settings.name}.${color.id}`
                color.lightness = chroma(color.hex).hsl()[2] * 100
                color.saturation = chroma(color.hex).hsl()[1] * 100
                color.contrastLightForeground = Math.abs(Math.round(calcAPCA(this.settings.lightCheckColor, color.hex)))
                color.contrastDarkForeground = Math.round(calcAPCA(this.settings.darkCheckColor, color.hex))
                color.contrastLightBackground = Math.round(calcAPCA(color.hex, this.settings.lightCheckColor))
                color.contrastDarkBackground = Math.abs(Math.round(calcAPCA(color.hex, this.settings.darkCheckColor)))
                totalColorCount--
            });
            return ramp
        },
        calculateRamp() {

            if(this.settings.tintsColorSpace == ColorSpaces.HSL) {
                this.settings.maxTintFactorScale = 100
            } else {
                this.settings.maxTintFactorScale = 200
            }

            const shades = calculateShadeRamp(this.settings.shadesColorSpace, this.settings.baseColor, this.settings.minShadeFactor, this.settings.maxShadeFactor, this.settings.countShades)
            const base = shades.concat(generateBaseColorInfo(this.settings.baseColor))
            const tints = calculateTintRamp(this.settings.tintsColorSpace, this.settings.baseColor, this.settings.minTintFactor, this.settings.maxTintFactor, this.settings.countTints)
            
            this.colors = this.getColorInfos(base.concat(tints))
        }
    },
})