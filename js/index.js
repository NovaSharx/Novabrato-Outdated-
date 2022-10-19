const noteLibrary = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab']

const noteFormats = {
    flatFormat: ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'],
    sharpFormat: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
}

const firstString = document.getElementById('first-string')
const secondString = document.getElementById('second-string')
const thirdString = document.getElementById('third-string')
const forthString = document.getElementById('forth-string')
const fifthString = document.getElementById('fifth-string')
const sixthString = document.getElementById('sixth-string')

const stringArray = [sixthString, fifthString, forthString, thirdString, secondString, firstString]

const guitarSettingsButton = document.getElementById('guitar-settings-button')
const guitarSettingsPanel = document.getElementById('guitar-settings-panel')

const guitarTunings = document.getElementById('guitar-tunings')
const tuningStandard = ['E', 'A', 'D', 'G', 'B', 'E']
const tuningDropD = ['D', 'A', 'D', 'G', 'B', 'E']

window.onload = changeTuning(tuningStandard)

guitarTunings.addEventListener('change', (event) => {
    if (event.target.value === 'custom') { return } // Bug catch till custom option has functionality

    let tuning

    switch (event.target.value) {
        case 'standard':
            tuning = tuningStandard
            break;
        case 'drop-d':
            tuning = tuningDropD
            break;
    }

    changeTuning(tuning)
})

function tuneString(string, note) {
    string.innerHTML = ""

    noteIndex = noteLibrary.indexOf(note)

    for (let iteration = 0; iteration < 25; iteration++) {
        let index = (iteration + noteIndex) % noteLibrary.length

        createNoteButton(string, noteLibrary[index])
    }
}

function createNoteButton(string, note) {
    let fretElement = document.createElement('div')
    fretElement.setAttribute('class', 'fret')

    let noteElement = document.createElement('div')
    noteElement.setAttribute('class', `note ${note.toLowerCase()}-note`)
    // Indentify Incidentals
    if (note.length > 1) {
        noteElement.setAttribute('class', noteElement.getAttribute('class') + ' incidental')
    }
    noteElement.innerHTML = note

    fretElement.append(noteElement)
    string.append(fretElement)
}

guitarSettingsButton.addEventListener('click', () => {
    if (guitarSettingsPanel.style.width != '') {
        guitarSettingsPanel.style.pointerEvents = 'none'
        guitarSettingsPanel.style.width = ''
        guitarSettingsPanel.style.opacity = '0%'
    }
    else {
        guitarSettingsPanel.style.pointerEvents = 'all'
        guitarSettingsPanel.style.width = '1200px' //'1714px'
        guitarSettingsPanel.style.opacity = '100%'
    }
})

function changeTuning(tuning) {
    stringArray.forEach((string, index) => {
        tuneString(string, tuning[index])
    })
}