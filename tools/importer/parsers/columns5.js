/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell
  const headerRow = ['Columns (columns5)'];

  // Find all immediate children that are columns (.col-md-6)
  const columns = Array.from(element.children).filter(
    (child) => child.classList.contains('col-md-6')
  );

  // Create the table: header row is a single cell, next row has one cell PER column element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns
  ], document);

  element.replaceWith(table);
}
