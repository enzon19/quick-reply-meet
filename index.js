'use strict';
let settings = chrome.storage.sync.get(['ButtonsRoundness', 'CheckMeetStarts', 'WaitToAppend', 'buttonsPosition', 'leftClickAction', 'rightClickAction', 'messageList']);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const chat = document.getElementsByTagName('textarea')[0].parentNode;
  if (chat && request == 'update') addShortcutsToChat(chat, true);
  sendResponse(true);
});

(async () => {
  settings = await settings;
  let waitButton = setInterval(() => {
    // Aguardando a reunião começar para pegar o elemento do chat - Waiting the meeting starts to get the chat
    const chatButton = document.evaluate('//i[contains(., "chat")]', document).iterateNext();
    if (chatButton) {
      getChat(chatButton);
    }
  }, settings.CheckMeetStarts);

  function getChat(chatButton) {
    // Pegando o chat - Getting the chat
    clearInterval(waitButton);
    chatButton.parentNode.click();
    setTimeout(() => {
      addShortcutsToChat(document.getElementsByTagName('textarea')[0].parentNode, true);
    }, settings.WaitToAppend);
  }
})();

function prepareMessage(chat, e, send, action) {
  const sendButton = document.evaluate('//i[contains(., "send")]', document).iterateNext().parentNode;
  if (action == 'delete') {
    chat.value = e?.childNodes[0].alt || e.innerText; 
  } else {
    chat.value += e?.childNodes[0].alt || e.innerText; 
  }

  sendButton.removeAttribute('disabled');
  if (send) sendButton.click();
}

async function addShortcutsToChat(chat, refresh) {
  if (refresh) { 
    document.getElementsByClassName('QRM-displayButtons')[0]?.remove();
    settings = await chrome.storage.sync.get(['ButtonsRoundness', 'CheckMeetStarts', 'WaitToAppend', 'buttonsPosition', 'leftClickAction', 'rightClickAction', 'messageList']);
  }

  const fullChat = chat.parentNode.parentNode.parentNode;
  const positionProperties = {
    'afterend': {
      'position': 'afterend',
      'fixNoScroll': 'paddingTop',
      'displayPadding': '0px 0px 15px 0px'
    },
    'beforebegin': {
      'position': 'beforebegin',
      'fixNoScroll': 'paddingBottom',
      'displayPadding': '15px 0px'
    }
  }[settings.buttonsPosition.value];

  // Criando estilo - Creating style
  fullChat.insertAdjacentHTML('beforebegin', `<style>.QRM-messageButton {
    letter-spacing: .025em; 
    font-family: Roboto, Arial, sans-serif; 
    font-size: .75rem; 
    font-weight: 400; 
    line-height: 1rem; 
    background: #f1f3f4; 
    border-radius: ${settings.ButtonsRoundness}px; 
    padding: 12px;
  } .QRM-displayButtons {
    display:inline-grid;
    column-gap: 15px; 
    grid-auto-flow: column; 
    text-align: center;
    overflow:auto; 
    white-space:nowrap; 
    margin: 0px 15px; 
    padding: ${positionProperties.displayPadding};
  } .QRM-messageButton:hover {
    background-color: #e6e6e6;
    cursor: pointer;
  } </style>`);

  // Pegando a lista - Getting the list
  let buttonsList = '';
  let messagesList = settings.messageList;
  for (let message of messagesList) {
    buttonsList += `<div class='QRM-messageButton'>${message}</div>`
  }

  // Adicionando botões - Appending buttons
  fullChat.insertAdjacentHTML(positionProperties.position, `<div class='QRM-displayButtons'>${buttonsList}</div>`);
  const leftClickAction = settings.leftClickAction;//{'send': true, 'action': 'delete'};
  const rightClickAction = settings.rightClickAction;//{'send': false, 'action': 'add'};
  Array.from(document.querySelectorAll('.QRM-messageButton')).forEach((e) => {
    e.addEventListener('click', () => prepareMessage(chat, e, leftClickAction.send, leftClickAction.action));
    e.addEventListener('contextmenu', s => {
      s.preventDefault(); 
      prepareMessage(chat, e, rightClickAction.send, rightClickAction.action); 
      return false;
    });
  });
  const displayButtons = document.getElementsByClassName('QRM-displayButtons')[0];
  if (!(displayButtons.scrollWidth > displayButtons.clientWidth)) displayButtons.style[positionProperties.fixNoScroll] = '0px';
}