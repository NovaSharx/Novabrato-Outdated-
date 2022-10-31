window.onload = loadGuitarNotes(tuningList.standard)

ctrlPanelRoot.addEventListener('change', () => {
    if (!ctrlPanelMode.value) { return }

    if (!ctrlPanelRoot.value) {
        guitarKeyManager.currentMode = []
    }
    else {
        guitarKeyManager.updateCurrentMode()
        if (ctrlPanelMode.value === 'aeolian' || ctrlPanelMode.value === 'ionian') {
            guitarKeyManager.getTriads()
        }
    }

    loadGuitarNotes(tuningList[guitarTunings.value])
})

ctrlPanelMode.addEventListener('change', () => {
    if (!ctrlPanelRoot.value) { return }

    if (!ctrlPanelMode.value) {
        guitarKeyManager.currentMode = []
    }
    else {
        guitarKeyManager.updateCurrentMode()
        if (ctrlPanelMode.value === 'aeolian' || ctrlPanelMode.value === 'ionian') {
            guitarKeyManager.getTriads()
        }
    }

    loadGuitarNotes(tuningList[guitarTunings.value])
})

ctrlPanelNoteLabel.addEventListener('change', () => {
    if (!ctrlPanelRoot.value || !ctrlPanelMode.value) { return }

    guitarKeyManager.convertNoteLabels(ctrlPanelNoteLabel.value)
})

triadsButtonArray.forEach((triadButton, index) => {
    triadButton.addEventListener('click', () => {
        guitarKeyManager.spotLightTriadNotes(guitarKeyManager.triads[index])
    })
})

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

guitarTunings.addEventListener('change', (event) => {
    if (event.target.value === 'custom') { return } // Bug catch till custom option has functionality

    let tuning = event.target.value

    loadGuitarNotes(tuningList[tuning])
})