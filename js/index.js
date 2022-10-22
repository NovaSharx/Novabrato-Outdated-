window.onload = loadGuitarNotes(tuningList.standard)

ctrlPanelRoot.addEventListener('change', () => {
    if (!ctrlPanelMode.value) { return }

    updateCurrentMode()
    loadGuitarNotes(tuningList[guitarTunings.value])
})

ctrlPanelMode.addEventListener('change', () => {
    if (!ctrlPanelRoot.value) { return }

    updateCurrentMode()
    loadGuitarNotes(tuningList[guitarTunings.value])
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