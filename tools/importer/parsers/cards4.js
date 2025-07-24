/* global WebImporter */
export default function parse(element, { document }) {
  // If wrapped, get the .cards.block element
  let block = element;
  if (block.classList.contains('cards-wrapper')) {
    const found = block.querySelector('.cards.block');
    if (found) block = found;
  }

  // Find the <ul> inside the block
  const ul = block.querySelector('ul');
  if (!ul) return;
  const items = Array.from(ul.children).filter(li => li.tagName === 'LI');
  const rows = [['Cards']];

  for (const li of items) {
    // Get image: use the <picture> if present, else <img>
    let imageCell = '';
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      const pic = imgDiv.querySelector('picture');
      if (pic) {
        imageCell = pic;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Get text: all <p> in .cards-card-body, in order
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use ONLY direct <p> for each block
      const ps = Array.from(bodyDiv.querySelectorAll(':scope > p'));
      if (ps.length === 1) {
        textCell = ps[0];
      } else if (ps.length > 1) {
        textCell = ps;
      } else {
        // fallback if no p: use innerText as one <p>
        if (bodyDiv.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = bodyDiv.textContent.trim();
          textCell = p;
        } else {
          textCell = '';
        }
      }
    }
    rows.push([imageCell, textCell]);
  }

  // Replace block with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
