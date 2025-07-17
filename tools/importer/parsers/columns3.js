/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Columns (columns3)'];

  // 2. Get all direct children divs
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // 3. Get the first three columns for the icon + heading
  // Only keep those that have .fa-stack and an h4.service-heading
  const columnEls = [];
  for (let i = 0; i < children.length && columnEls.length < 3; i++) {
    const col = children[i];
    if (col.querySelector('.fa-stack') && col.querySelector('.service-heading')) {
      columnEls.push(col);
    }
  }

  // 4. Get the two .col-md-6 divs with <p> inside (for the paragraphs below)
  const textRows = [];
  children.forEach(div => {
    if (div.classList.contains('col-md-6')) {
      const para = div.querySelector('p');
      if (para) {
        textRows.push([div]); // each goes in its own row, single cell
      }
    }
  });

  // 5. Compose cells: header, the columns, then the full-width text rows
  const cells = [
    headerRow,
    columnEls,
    ...textRows
  ];

  // 6. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
