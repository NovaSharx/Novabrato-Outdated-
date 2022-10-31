// GLOBALVARIABLES

const guitarKeyManager = new GuitarKeyManager()

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

const ctrlPanelRoot = document.getElementById('root')
const ctrlPanelMode = document.getElementById('mode')
const ctrlPanelNoteLabel = document.getElementById('note-label')

const triadsTitle = document.getElementById('triads-title')
const triadsButtonArray = Array.from(document.getElementsByClassName('triad'))

const modeFormulas = {
    'ionian': [1, 1, 0, 1, 1, 1, 0],
    'aeolian': [1, 0, 1, 1, 0, 1, 1],
    'major-pentatonic': [1, 1, 2, 1, 2],
    'minor-pentatonic': [2, 1, 1, 2, 1]
}

const chordCycle = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'minor dim']

const circleOfFifthsMaj = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb/F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']
const circleOfFifthsMin = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'Ebm', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm']

const guitarSettingsButton = document.getElementById('guitar-settings-button')
const guitarSettingsPanel = document.getElementById('guitar-settings-panel')

const guitarTunings = document.getElementById('guitar-tunings')
const tuningList = {
    'standard': ['E', 'A', 'D', 'G', 'B', 'E'],
    'drop-d': ['D', 'A', 'D', 'G', 'B', 'E'],
    'drop-c': ['C', 'G', 'C', 'F', 'A', 'D']
}

// FUNCTIONS

function loadGuitarNotes(tuning) {
    stringArray.forEach((string, index) => {
        loadString(string, tuning[index])
    })
}

function loadString(string, note) {
    string.innerHTML = ""

    let noteIndex = noteLibrary.indexOf(note)

    for (let iteration = 0; iteration < 25; iteration++) {
        let index = (iteration + noteIndex) % noteLibrary.length

        createNoteButton(string, noteLibrary[index])
    }
}

function createNoteButton(string, note) {
    let fretElement = document.createElement('div')
    fretElement.setAttribute('class', 'fret')

    let noteElement = document.createElement('div')
    noteElement.setAttribute('data-note', `${note}`)
    noteElement.setAttribute('class', `note ${note.toLowerCase()}-note`)

    // Indentify Incidentals
    if (note.length > 1) {
        noteElement.setAttribute('class', noteElement.getAttribute('class') + ' incidental')
    }

    if (ctrlPanelRoot.value && ctrlPanelMode.value) {

        // Filter notes of the current scale
        filterScaleNotes(noteElement, note)
    }

    noteElement.innerHTML = note

    noteElement.addEventListener('mouseenter', () => {
        let similarNotes = document.getElementsByClassName(`${note.toLowerCase()}-note`)

        for (const currentNote of similarNotes) {
            currentNote.setAttribute('class', currentNote.getAttribute('class') + ' hovered-note')
        }
    })

    noteElement.addEventListener('mouseout', () => {
        let similarNotes = document.getElementsByClassName(`${note.toLowerCase()}-note`)
        for (const currentNote of similarNotes) {
            currentNote.setAttribute('class', currentNote.getAttribute('class').replace(' hovered-note',''))
        }
    })

    fretElement.append(noteElement)
    string.append(fretElement)
}

function filterScaleNotes(noteElement, note) {
    if (guitarKeyManager.currentMode.includes(note)) {
        noteElement.setAttribute('class', noteElement.getAttribute('class') + ' active-note')
    }
    else {
        noteElement.setAttribute('class', noteElement.getAttribute('class') + ' disabled-note')
    }
}