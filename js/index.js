window.onload = changeTuning(tuningList.standard)

guitarTunings.addEventListener('change', (event) => {
    if (event.target.value === 'custom') { return } // Bug catch till custom option has functionality

    let tuning = event.target.value

    changeTuning(tuningList[tuning])
})