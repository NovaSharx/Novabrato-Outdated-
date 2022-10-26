class GuitarKeyManager {
    constructor() {
        this.currentMode = ['mode']
        this.triads = []
    }

    getTriads() {
        this.triads = currentMode.map((note, index) => {
            let newArray = []
            let currentIndex = index
            for (let i = 0; i < 3; i++) {
                newArray.push(currentMode[currentIndex])
                currentIndex = (currentIndex + 2) % currentMode.length
            }
            return (newArray)
        })
        
        this.updateTriads()
    }

    updateTriads() {
        this.triads.forEach((triad, index) => {
            triadsArray[index].innerHTML= `<div>${triad[0]} min/maj:&nbsp;</div><span>${triad[0]} - ${triad[1]} - ${triad[2]}</span>`
        })
    }

}