const dropdownList = ["buttonsPosition", "leftClickAction", "rightClickAction"];
const rangeList = ["ButtonsRoundness", "CheckMeetStarts", "WaitToAppend"];

(async () => {
  const settings = await chrome.storage.sync.get([...dropdownList, ...rangeList]);
  dropdownList.forEach(e => {
    const optionClickedID = settings[e].elementID;
    const optionClicked = document.getElementById(optionClickedID);
    const arguments = optionClickedID.split('_');
    const dropdownNumber = parseInt(arguments[1]);
    const valueNumber = parseInt(arguments[0].match(/(\d+)/)[0]);
    const dropdownFunction = ['buttonsPosition', 'leftClickAction', 'rightClickAction'][dropdownNumber];
    const dropdownInputs = document.getElementsByClassName('dropdown__value');
    
    dropdownInputs[dropdownNumber].innerHTML = optionClicked.innerHTML.replace(/(.*?, .*?) .*/, '$1').toUpperCase();
    if ([1, 2].includes(dropdownNumber)) {
      const sectionImage = document.getElementById(dropdownFunction + 'Image');
      sectionImage.src = `assets/click/opt${valueNumber}.gif`;
      sectionImage.style.maxWidth = document.getElementById(dropdownFunction.replace('Action', 'Select')).offsetWidth + 'px';
    }
  });

  rangeList.forEach(e => {
    const display = document.getElementById(`display${e}`);
    display.value = settings[e];
    handleInputChange(display);
  });
})();

async function applySettingsAndChangesOnPage(e) {
  const actualTab = (await chrome.tabs.query({active: true, currentWindow: true}))[0];
  if (actualTab?.url.match(/https?:\/\/meet\.google\.com\//)) {
    let callbackFunction = (returnedTabs) => chrome.tabs.sendMessage(returnedTabs.id, 'update', );
    if (e?.id?.startsWith('toWarn') && !Array.from(document.getElementsByClassName('warning')).map(e => e.getAttribute('data-section')).includes(e.id.slice(6))) callbackFunction = () => e.insertAdjacentHTML('afterend', `<span data-section="${e.id.slice(6)}" class="warning">${chrome.i18n.getMessage('reloadWarning')}</span>`);
    
    callbackFunction(actualTab);
  }
}