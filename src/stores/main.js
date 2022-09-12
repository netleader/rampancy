import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({ 
        name: "Red",
        baseColor: "",
        lightCheckColor: "#f4f4f4",
        darkCheckColor: "#202020",
        countShades: 5,
        countTints: 4
    }),
    actions: {
        increment() {
            this.count++
        },
    },
})