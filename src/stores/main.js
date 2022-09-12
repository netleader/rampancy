import { defineStore } from 'pinia'
const tinycolor = require("tinycolor2");

function calculateTint(hex, value) {
    const color = tinycolor(hex).toRgb()
    const red = color.r + ((255 - color.r) * value)
    const green = color.g + ((255 - color.g) * value)
    const blue = color.b + ((255 - color.b) * value)
    console.log(value)

    return tinycolor({r: red, g: green, b: blue}).toHexString()
}

function calculateShade(hex, value) {
    const color = tinycolor(hex).toRgb()
    const red = color.r * value
    const green = color.g * value
    const blue = color.b * value
    return tinycolor({r: red, g: green, b: blue}).toHexString()
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
        clear() {
          this.colors = []  
        },
        calculateColors() {
            const result = []
            let previewsId = (this.totalColors * 100) + 100;
            let a = 0.2
            for (let i = this.settings.countShades-1; i >= 0; i--) {
                let newId = previewsId - 100
                result[i] = {
                    id: newId,
                    hex: calculateShade(this.settings.baseColor, a),
                    token: "color-" + this.settings.name + "-" + newId
                }
                previewsId = newId
                a = a + (8 / this.settings.countShades) / 10
            }
            const shades = result.reverse()

            previewsId = previewsId - 100
            const baseColor = {
                id: previewsId,
                hex: this.settings.baseColor,
                token: "color-" + this.settings.name + "-" + previewsId
            }
            const shadesWithBase = shades.concat(baseColor)

            let tempTints = []
            let x = 0.75
            for (let i = 0; i < this.settings.countTints; i++) {
                let newId = (i+1) * 100
                tempTints[i] = {
                    id: newId,
                    hex: calculateTint(this.settings.baseColor, x),
                    token: "color-" + this.settings.name + "-" + newId
                }
                previewsId = newId
                x = x - ((8 / this.settings.countTints) / 10)
            }
            this.colors = shadesWithBase.concat(tempTints.reverse())
        },
    },
})