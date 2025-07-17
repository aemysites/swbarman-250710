/* global WebImporter */
export default function parse(element, { document }) {
  // Find the column content elements (all direct col-md-6 children)
  let columns = Array.from(element.querySelectorAll(':scope > .col-md-6'));
  // Fallback: If not found, get all direct children except the header
  if (columns.length === 0) {
    columns = Array.from(element.children).filter(child => !child.classList.contains('col-lg-12'));
  }

  // Each column cell: gather all non-empty nodes for semantic fidelity
  const columnCells = columns.map(col => {
    const content = Array.from(col.childNodes).filter(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim().length > 0;
      }
      return true;
    });
    return content.length === 1 ? content[0] : content;
  });

  // The header row must be a single cell, regardless of how many columns in the next row
  const headerRow = ['Columns (columns5)'];
  // The next row contains as many cells as there are columns
  const tableRows = [headerRow, columnCells];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
