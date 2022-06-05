const dropdownOptions = document.getElementsByClassName('mui-dropdown__menu');
const dropdownInputs = document.getElementsByClassName('dropdown__value');

Array.from(dropdownOptions).forEach(e => e.addEventListener('click', setDropdownInputValue));

async function setDropdownInputValue(e) {
  const optionClicked = e.target || e;
  const optionClickedID = optionClicked.id;
  const arguments = optionClickedID.split('_');
  const dropdownNumber = parseInt(arguments[1]);
  const valueNumber = parseInt(arguments[0].match(/(\d+)/)[0]);

  dropdownInputs[dropdownNumber].innerHTML = optionClicked.innerHTML.replace(/(.*?, .*?) .*/, '$1').toUpperCase();
  const dropdownArguments = [['beforebegin', 'afterend'], [[[true, false], ['delete', 'add']]], [[[true, false], ['delete', 'add']]]];
  const dropdownFunction = ['buttonsPosition', 'leftClickAction', 'rightClickAction'][dropdownNumber];
  let settings = {};

  // Pegar o primeiro argumento (número do dropdown) e retorna array. A partir dessa array, vai escolher um dos elementos baseado no segundo argumento (número do valor escolhido)
  if ([1, 2].includes(dropdownNumber)) {
    // Como são 4 opções e a cada duas delas uma vai ser true a outra false, então `valor / 2` arrendondado para baixo vai dar o valor para selecionar true ou false, sabendo se o um número é par ou impar vai dar delete ou add
    settings[dropdownFunction] = {'send': dropdownArguments[dropdownNumber][0][0][Math.floor(valueNumber / 2)], 'action': dropdownArguments[dropdownNumber][0][1][valueNumber % 2], 'elementID': optionClickedID};
    const sectionImage = document.getElementById(dropdownFunction + 'Image');
    sectionImage.src = `assets/click/opt${valueNumber}.gif`;
    sectionImage.style.maxWidth = document.getElementById(dropdownFunction.replace('Action', 'Select')).offsetWidth + 'px';
  } else {
    settings[dropdownFunction] = {'value': dropdownArguments[dropdownNumber][valueNumber], 'elementID': optionClickedID};
  }

  await chrome.storage.sync.set(settings);
  applySettingsAndChangesOnPage();
}