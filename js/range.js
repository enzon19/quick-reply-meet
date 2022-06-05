const rangeInputs = document.querySelectorAll('input[type="range"]');
const numberInput = document.querySelectorAll('input[type="number"]');

async function handleInputChange(e) {
  e = e.target || e;
  const section = e.id.replace(/display|slider/g, "");
  const slider = document.getElementById(`slider${section}`);
  const display = document.getElementById(`display${section}`);
  
  if (e.type == 'range') {
    display.value = slider.value;
  } else {
    slider.value = display.value;
  }

  const min = slider.min;
  const max = slider.max;
  const val = slider.value;
  
  slider.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

async function saveChanges(e) {
  e = e.target || e;
  const section = e.id.replace(/display|slider/g, "");
  const slider = document.getElementById(`slider${section}`);
  const display = document.getElementById(`display${section}`);

  if (e.getAttribute('data-previous') != e.value) {
    slider.setAttribute("data-previous", e.value);
    display.setAttribute("data-previous", e.value);
    let settings = {};
    settings[section] = e.value;
    await chrome.storage.sync.set(settings);
    applySettingsAndChangesOnPage(document.getElementById(`toWarn${section}`));
  }
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange);
  input.addEventListener('mouseup', saveChanges);
});

numberInput.forEach(input => {
  input.addEventListener('input', handleInputChange);
  input.addEventListener('focusout', saveChanges);
});