const resetButtons = document.querySelectorAll("[data-section]");

async function resetValue (e) {
  const defaultValues = await (await fetch(chrome.runtime.getURL('/data/defaultSettings.json'))).json();
  const section = e.target.getAttribute("data-section");
  const displayElement = document.getElementById('display' + section);
  displayElement.value = defaultValues[section];
  handleInputChange(displayElement);
  saveChanges(displayElement);
}

resetButtons.forEach(button => {
  button.addEventListener('click', resetValue);
});