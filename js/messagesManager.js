let messageList = [];

// Function for new message button
document.getElementById('addMessage').addEventListener('click', () => createDialog(`<h2>${chrome.i18n.getMessage('titleAdd')}</h2>
<div class="mui-textfield mui-textfield--float-label">
  <textarea required id="messageContent" maxlength="500"></textarea>
  <label>${chrome.i18n.getMessage('messageContent')}</label>
</div>
<div class="mui-textfield mui-textfield--float-label">
  <input required id="messageIndex" type="number" min="1" max="${messageList.length + 1}" value="${messageList.length + 1}">
  <label>${chrome.i18n.getMessage('messageIndex')}</label>
</div>
<br>
<button class="mui-btn mui-btn--primary" id="saveChanges">${chrome.i18n.getMessage('saveChanges')}</button>
<button class="mui-btn mui-btn--flat" id="closeDialog">${chrome.i18n.getMessage('cancelChanges')}</button>`, 'addMessage', messageList.length + 1));
// Display list of messages
updateList();

async function updateList() {
  messageList = (await chrome.storage.sync.get(['messageList'])).messageList;
  let showMessages = '';
  
  for (let message of messageList) {
    showMessages += `<div class="messageDisplay">
    <span class="messageText">${limitLength(message, 40)}</span>
    <span class="material-icons">delete</span>
    <span class="material-icons">edit</span>
  </div>`
  }
  if (!showMessages) showMessages = '<img src="/assets/images/general/empty.png">';
  document.getElementById('showMessages').innerHTML = showMessages;

  const messageDisplay = document.querySelectorAll('.messageDisplay > .material-icons');
  Array.from(messageDisplay).forEach(e => e.addEventListener('click', buttonAction));
}

function buttonAction(e) {
  e = e.target || e;
  const button = e.innerText;
  const actualIndex = Math.floor(Array.from(document.querySelectorAll('.messageDisplay > .material-icons')).indexOf(e) / 2);
  const actualContent = messageList[actualIndex];

  const dialogBoxes = {
    'edit' : `<h2>${chrome.i18n.getMessage('titleEdit')}</h2>
  <div class="mui-textfield mui-textfield--float-label">
    <textarea required id="messageContent" maxlength="500">${actualContent}</textarea>
    <label>${chrome.i18n.getMessage('messageContent')}</label>
  </div>
  <div class="mui-textfield mui-textfield--float-label">
    <input required id="messageIndex" type="number" min="1" max="${messageList.length}" value="${actualIndex + 1}">
    <label>${chrome.i18n.getMessage('messageIndex')}</label>
  </div>
  <br>
  <button class="mui-btn mui-btn--primary" id="saveChanges">${chrome.i18n.getMessage('saveChanges')}</button>
  <button class="mui-btn mui-btn--flat" id="closeDialog">${chrome.i18n.getMessage('cancelChanges')}</button>`,
    'delete': `<h2 style="padding-bottom: 6px;">${chrome.i18n.getMessage('titleDelete')}</h2>
    <span>${chrome.i18n.getMessage('descriptionDelete', [limitLength(actualContent, 40)])}</span>
    <br>
    <button class="mui-btn mui-btn--primary" id="saveChanges">${chrome.i18n.getMessage('yesDelete')}</button>
    <button class="mui-btn mui-btn--flat" id="closeDialog">${chrome.i18n.getMessage('noDelete')}</button>`
  };

  createDialog(dialogBoxes[button], button + 'Message', actualIndex);
}

function addMessage() {
  const newMessageIndex = parseInt(document.getElementById('messageIndex').value);
  const newMessageTextInput = document.getElementById('messageContent');
  const newMessageText = newMessageTextInput.value;

  if (newMessageText && newMessageIndex >= 1 && newMessageIndex <= messageList.length + 1) {
    messageList.splice(newMessageIndex - 1, 0, newMessageText);
    closeAndUpdate();
  } else if (!newMessageText) {
    newMessageTextInput.classList.add('mui--is-empty', 'mui--is-pristine', 'mui--is-touched')
  }
}

function editMessage(oldIndex) {
  const newIndex = parseInt(document.getElementById('messageIndex').value);
  const oldText = messageList[oldIndex];
  const newText = document.getElementById('messageContent').value;

  if (newText && newIndex >= 1 && newIndex <= messageList.length) {
    let directionFunction = 'indexOf';
    let direction = 0;
    if (oldIndex >= newIndex) {
      directionFunction = 'lastIndexOf';
      direction = -1;
    }

    messageList.splice(newIndex + direction, 0, oldText);
    messageList.splice(messageList[directionFunction](oldText), 1);

    messageList[newIndex - 1] = newText;
    closeAndUpdate();
  }
}

function deleteMessage(messageIndex) {
  messageList.splice(messageIndex, 1);
  closeAndUpdate();
}

function createDialog(contentHTML, actionFirstButton, actualIndex) {
  const dialogBox = document.createElement('div');
  dialogBox.classList.add('dialogBoxMessageManager');
  dialogBox.innerHTML = contentHTML;

  mui.overlay('on', dialogBox, {
    'static': true
  });
  document.getElementById('saveChanges').addEventListener('click', () => window[actionFirstButton](actualIndex));
  document.getElementById('closeDialog').addEventListener('click', () => mui.overlay('off'));
}

function closeAndUpdate() {
  chrome.storage.sync.set({'messageList': messageList});
  updateList();
  applySettingsAndChangesOnPage();
  mui.overlay('off');
}

function limitLength(text, limit) {
  if (text.length <= limit) {
    return text;
  } else {
    return text.substring(0, limit) + "...";
  }
}