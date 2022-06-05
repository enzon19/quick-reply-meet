const nextBtn = document.getElementById('nextBtn');
const previousBtn = document.getElementById('previousBtn');
let listOfSets = [];
let slideIndex = 1;
let setsOfMessages, setsOfMessagesLocale;

nextBtn.addEventListener('click', () => changeSlides(slideIndex += 1));
previousBtn.addEventListener('click', () => changeSlides(slideIndex -= 1));

(async () => {
  setsOfMessages = await (await fetch(chrome.runtime.getURL('/data/setsOfMessages.json'))).json();
  setsOfMessagesLocale = setsOfMessages[chrome.i18n.getMessage('@@locale')];

  changeSlides(slideIndex);
  generateSets();
})();

function changeSlides(n) {
  const slides = document.getElementsByClassName("slides");
  if (n > slides.length) {
    slideIndex = slides.length;
    window.location.href = 'https://meet.google.com';
  }

  if (n <= 1) {
    previousBtn.disabled = true;
  } else if (n == slides.length) {
    previousBtn.remove();
    document.getElementById('nextBtnText').innerText = chrome.i18n.getMessage('startUsing');
  } else {
    previousBtn.disabled = false;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  
  slides[slideIndex - 1].style.display = 'block';
}

async function setSet() {
  if (this.classList.contains('setSelected')) {
    listOfSets = listOfSets.filter((e) => !setsOfMessagesLocale[this.id].includes(e));
    this.classList.remove('setSelected');
  } else {
    listOfSets = [...listOfSets, ...setsOfMessagesLocale[this.id]];
    this.classList.add('setSelected');
  }

  chrome.storage.sync.set({'messageList': listOfSets});
}

async function generateSets() {
  let setViewAll = '';
  let displayMessages = '';
  let classMessageE = 'messageButton';

  for (let i = 0; i < setsOfMessagesLocale.length; i++) {
    setViewAll += `<div class="mui-panel step selectSet" id="${i}">
    <h4>${chrome.i18n.getMessage(`set${i}Title`)}</h4>
    <div class="displayButtons">`;
    displayMessages = '';
    
    for (let j = 0; j < setsOfMessagesLocale[i].length; j++) {
      classMessageE = 'messageButton';
      if (!(j % 3) || j == setsOfMessagesLocale[i].length - 1 && (setsOfMessagesLocale[i].length - 1) % 3 == 1) classMessageE += ' fullSize';
      displayMessages += `<div class="${classMessageE}">${setsOfMessagesLocale[i][j]}</div>`;
    }
    setViewAll += displayMessages + '</div></div>';
  }

  document.getElementById('showSets').innerHTML = setViewAll;
  Array.from(document.getElementsByClassName('selectSet')).forEach((e) => e.addEventListener('click', setSet))
}