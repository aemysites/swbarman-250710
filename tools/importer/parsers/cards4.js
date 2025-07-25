/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards block (could be .cards-wrapper or .cards.block)
  let cardsBlock = element;
  if (cardsBlock.classList.contains('cards-wrapper')) {
    const inner = cardsBlock.querySelector('.cards.block');
    if (inner) cardsBlock = inner;
  }

  // Find <ul> with cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Table header
  const rows = [['Cards']];

  lis.forEach(li => {
    // IMAGE/ICON CELL
    let imageCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Prefer <picture>, else <img>
      const pic = imgDiv.querySelector('picture');
      if (pic) {
        imageCell = pic;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // TEXT CONTENT CELL
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = null;
    if (bodyDiv) {
      // Gather all <p>, <strong>, etc. as they are (reference, not clone)
      // This will preserve bold, heading etc.
      const contentEls = Array.from(bodyDiv.childNodes).filter(node =>
        node.nodeType === Node.ELEMENT_NODE
      );
      if (contentEls.length === 1) {
        textCell = contentEls[0];
      } else if (contentEls.length > 1) {
        textCell = contentEls;
      } else {
        // fallback - bodyDiv may have text only
        textCell = bodyDiv.textContent || '';
      }
    } else {
      textCell = '';
    }

    rows.push([
      imageCell,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  cardsBlock.replaceWith(table);
}
