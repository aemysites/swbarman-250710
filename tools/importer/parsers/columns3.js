/* global WebImporter */
export default function parse(element, { document }) {
  // Get the actual columns block (may be wrapped)
  let columnsBlock = element;
  if (columnsBlock.classList.contains('columns-wrapper')) {
    const maybe = columnsBlock.querySelector('.columns.block');
    if (maybe) columnsBlock = maybe;
  }
  // Find direct row <div>s
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  // For each row, get its column divs
  const dataRows = rowDivs.map(rowDiv => Array.from(rowDiv.querySelectorAll(':scope > div')));
  // Compose cells: header row (one column, per example); then all data rows
  const cells = [['Columns'], ...dataRows];
  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
