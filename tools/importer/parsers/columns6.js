/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Extract the icon+heading columns
  const iconCols = children.filter(div => div.classList.contains('col-md-4'));
  // Extract the text content columns (centered col-md-6)
  const textCols = children.filter(div => div.classList.contains('col-md-6'));

  // The header row must be a single cell (not three)
  const headerRow = ['Columns (columns6)'];

  // The iconCols row is the first content row (three columns)
  const iconsRow = iconCols;

  // The text rows must match the number of columns (3), with text in the center
  // and empty strings for left and right
  const textRows = textCols.map(tc => ['', tc, '']);

  // Compose the table: one header row, then icons row, then text rows
  const cells = [
    headerRow,
    iconsRow,
    ...textRows
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
