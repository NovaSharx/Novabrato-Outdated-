class GuitarKeyManager {
    constructor() {
        this.currentMode = []
        this.noteLabels = {
            notes: this.currentMode,
            degrees: ['R', '2', '3', '4', '5', '6', '7'],
            intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7']
        }
        
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
            this.noteLabels.notes.push(noteLibrary[index])

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
            chordCycleIndex = 5
        }

        triadsTitle.innerHTML = `${ctrlPanelRoot.value} ${chordCycle[chordCycleIndex].toUpperCase()} TRIADS`
        this.triads.forEach((triad, index) => {
            triadsButtonArray[index].innerHTML = `<div>${triad[0]} ${chordCycle[(index + chordCycleIndex) % chordCycle.length]}:&nbsp;</div><span>${triad[0]} - ${triad[1]} - ${triad[2]}</span>`
        })
    }

    convertNoteLabels(labelOption) {
        let label = this.noteLabels[labelOption]
        let activeNotes = Array.from(document.getElementsByClassName('active-note'))

        for (const note of activeNotes) {
            note.innerHTML = label[this.currentMode.indexOf(note.dataset.note)]
        }
    }

    spotLightTriadNotes(triad) {
        let activeNotes = document.getElementsByClassName('active-note')

        for (const note of activeNotes) {
            note.setAttribute('class', note.getAttribute('class').replace(' highlighted-triad-note',''))
            if (triad.includes(note.innerHTML)) {
                note.setAttribute('class', note.getAttribute('class') + ' highlighted-triad-note')
            }
        }
    }

}