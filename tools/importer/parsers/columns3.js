/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const columnsBlock = element.querySelector(':scope > .columns.block');
  if (!columnsBlock) return;

  // Find all direct row divs (each visual row)
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (rowDivs.length === 0) return;

  // Prepare the cells array for createTable
  let cells = [];

  // Get the number of columns by examining the first row
  const firstRowColumns = rowDivs[0].querySelectorAll(':scope > div').length;

  // Header row: single cell, remaining columns are empty so table has correct shape
  // This will result in: ['Columns', '', ''] for a 3-col layout, ['Columns', ''] for a 2-col layout, etc.
  const headerRow = ['Columns'];
  for (let i = 1; i < firstRowColumns; i++) {
    headerRow.push('');
  }
  cells.push(headerRow);

  // Now for each row, add an array of columns (each colDiv's children as content)
  rowDivs.forEach(rowDiv => {
    const colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    const rowCells = colDivs.map(colDiv => {
      // Take all non-empty children (elements or non-empty text nodes)
      const kids = Array.from(colDiv.childNodes).filter(
        n => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim())
      );
      if (kids.length === 1) return kids[0];
      if (kids.length > 1) return kids;
      return '';
    });
    cells.push(rowCells);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
