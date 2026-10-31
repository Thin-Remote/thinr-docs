// Enlarges the SVG diagrams (figure.tdocs-diagram: PillarsDiagram.vue,
// QuickStartJourney.vue): a magnifier button on each one, and a click on the
// diagram, open it in a modal dialog as wide as the window. The button only
// exists with JavaScript.

const ZOOM_ICON =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg>';
const CLOSE_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';

let dialog;

function getDialog() {
  if (dialog) return dialog;
  dialog = document.createElement('dialog');
  dialog.className = 'tdocs-diagram-dialog';
  dialog.setAttribute('aria-label', 'Diagram');
  dialog.innerHTML =
    `<button type="button" class="tdocs-diagram-close" aria-label="Close">${CLOSE_ICON}</button>` +
    '<div class="tdocs-diagram-svg"></div><p class="tdocs-diagram-dialog-caption"></p>';
  dialog.querySelector('.tdocs-diagram-close').addEventListener('click', () => dialog.close());
  // A click on the backdrop, outside the content, closes it
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('tdocs-diagram-open');
    dialog.querySelector('.tdocs-diagram-svg').innerHTML = '';
  });
  document.body.appendChild(dialog);
  return dialog;
}

function open(figure) {
  const svg = figure.querySelector('.tdocs-diagram-svg svg');
  if (!svg) return;
  const d = getDialog();
  d.querySelector('.tdocs-diagram-svg').appendChild(svg.cloneNode(true));
  d.querySelector('.tdocs-diagram-dialog-caption').textContent = figure.querySelector('figcaption')?.textContent ?? '';
  document.documentElement.classList.add('tdocs-diagram-open');
  d.showModal();
}

/** Adds the magnifier button to the diagrams of the page that lack it. */
export function addDiagramButtons() {
  for (const figure of document.querySelectorAll('figure.tdocs-diagram')) {
    if (figure.querySelector('.tdocs-diagram-zoom')) continue;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tdocs-diagram-zoom';
    button.setAttribute('aria-label', 'Enlarge diagram');
    button.title = 'Enlarge';
    button.innerHTML = ZOOM_ICON;
    figure.appendChild(button);
  }
}

/** One listener for every page: the button or the diagram open the dialog. */
export function listenDiagramClicks() {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target?.closest) return;
    const trigger = target.closest('figure.tdocs-diagram .tdocs-diagram-zoom, figure.tdocs-diagram .tdocs-diagram-svg');
    if (!trigger) return;
    // Links inside a diagram keep working
    if (target.closest('a')) return;
    const figure = trigger.closest('figure.tdocs-diagram');
    if (figure) open(figure);
  });
}
