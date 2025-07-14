/* global WebImporter */
export default function parse(element, { document }) {
  // The block name must match the requested header
  const headerRow = ['Columns (columns2)'];

  // Find the main container div (holds the intro-text in this case)
  const container = element.querySelector('.container');
  // Defensive: if not found, fall back to element itself
  const content = container || element;

  // Compose the block table: always one column for this example
  const cells = [
    headerRow,
    [content]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}