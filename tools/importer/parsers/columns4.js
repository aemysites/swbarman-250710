/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block name
  const headerRow = ['Columns (columns4)'];

  // Get all immediate children columns (divs)
  const colDivs = Array.from(element.querySelectorAll(':scope > div'));

  // According to the HTML, first three are col-md-4 (top row), next two are col-md-6 (bottom row).
  // Need to output a 4-column table, so pad with empty cells.

  // Top row: indexes 0-2, pad for 4th column
  const row1 = [colDivs[0], colDivs[1], colDivs[2], ''];
  // Bottom row: indexes 3-4, pad two trailing columns
  const row2 = [colDivs[3], colDivs[4], '', ''];

  // Create the columns block table
  const cells = [
    headerRow,
    row1,
    row2
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
