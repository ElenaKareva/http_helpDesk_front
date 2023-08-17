export default class Description {
  // eslint-disable-next-line class-methods-use-this
  showDescription(mainContainer, currentTicket, ticketName, url) {
    if (mainContainer.querySelector('.modal')) return;

    const ticketDescriptionElement = ticketName.closest('.ticket-wrapper').querySelector('.ticket-description');
    if (!ticketDescriptionElement.classList.contains('hidden')) {
      ticketDescriptionElement.classList.add('hidden');
      return;
    }

    const request = `${url}/${currentTicket.dataset.id}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', request);
    document.body.style.cursor = 'wait';

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const { response } = xhr;
          document.body.style.cursor = '';
          ticketDescriptionElement.textContent = response;
          ticketDescriptionElement.classList.toggle('hidden');
        } catch (er) {
          // eslint-disable-next-line no-console
          console.error('error', er);
        }
      }
    });
    xhr.send();
  }
}
