/* global WebImporter */
export default function parse(element, { document }) {
  // Get all top-level columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // There are 5 column divs: distribute into a 4 column layout
  // Row 1: first 4 columns
  const row1 = columns.slice(0, 4);
  // Row 2: remaining columns, pad to 4 columns
  const row2 = columns.slice(4);
  while (row2.length < 4) row2.push('');

  // Build the table with a single-cell header row followed by 4-col rows
  const cells = [
    ['Columns (columns4)'],
    row1,
    row2
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
