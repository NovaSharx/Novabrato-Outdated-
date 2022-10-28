class GuitarKeyManager {
    constructor() {
        this.currentMode = []
        this.triads = []
    }

    updateCurrentMode() {
        this.currentMode = []
        let currentModeFormula = modeFormulas[ctrlPanelMode.value]
        let noteIndex = noteLibrary.indexOf(ctrlPanelRoot.value)
        let modeIndex = 0
        for (let iteration = 0; iteration < noteLibrary.length; iteration++, modeIndex++) {
            let index = (iteration + noteIndex) % noteLibrary.length
    
            this.currentMode.push(noteLibrary[index])
    
            iteration += currentModeFormula[modeIndex]
        }
    }

    getTriads() {
        this.triads = this.currentMode.map((note, index) => {
            let newTriadArray = []
            let currentIndex = index
            for (let i = 0; i < 3; i++) {
                newTriadArray.push(this.currentMode[currentIndex])
                currentIndex = (currentIndex + 2) % this.currentMode.length
            }
            return (newTriadArray)
        })
        
        this.updateTriads()
    }

    updateTriads() {
        let chordCycleIndex = 0
        if (ctrlPanelMode.value === 'aeolian') {
            console.log('entered')
            chordCycleIndex = 5
        }
        
        triadsTitle.innerHTML = `${ctrlPanelRoot.value} ${chordCycle[chordCycleIndex].toUpperCase()} TRIADS`
        this.triads.forEach((triad, index) => {
            triadsArray[index].innerHTML= `<div>${triad[0]} ${chordCycle[(index + chordCycleIndex) % chordCycle.length]}:&nbsp;</div><span>${triad[0]} - ${triad[1]} - ${triad[2]}</span>`
        })
    }

}