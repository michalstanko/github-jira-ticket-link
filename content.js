const JIRA_BASE_URL = 'https://jira.ferratum.com/jira/browse/';

function linkifyTickets() {
  // Find all pull request title elements
  const prTitleElements = document.querySelectorAll('.js-issue-title');
  
  prTitleElements.forEach(titleElem => {
    // Find 'NPT-' references using a regex
    const regex = /(NPT[\- ]\d+)/gi;
    const text = titleElem.textContent;
    const updatedText = text.replace(regex, (match) => {
      const ticketPathPart = match.toUpperCase().replace(' ', '-');
      const style = 'color: #FB9116; background: #022BB8; text-decoration: underline; padding: 2px 14px; border-radius: 8px; color: white;';
      return `<a href="${JIRA_BASE_URL}${ticketPathPart}" target="_blank" style="${style}">${match}</a>`;
    });

    if (text !== updatedText) {
      titleElem.innerHTML = updatedText;
    }
  });
}

function onUrlChanged() {
  if (window.location.pathname.includes('/pull/')) {
    linkifyTickets();
  }
}

let _prevUrl = '';
function checkUrlChange() {
  if (window.location.href !== _prevUrl) {
    onUrlChanged();
    _prevUrl = window.location.href;
  }
}

function init() {
  setInterval(checkUrlChange, 1500);
  checkUrlChange();
}

init();
