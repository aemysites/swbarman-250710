/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get all child divs in order
  const children = Array.from(element.children);

  // 2. Get content for first row (three columns with icon+heading)
  // These are the .col-md-4 elements in order
  const columnsRow = children
    .filter(div => div.classList.contains('col-md-4'));

  // 3. Find all .col-md-6 blocks for subsequent rows (centered paragraph rows)
  // These are the multi-column rows (full width), so one per row
  const contentRows = children.filter(div => div.classList.contains('col-md-6'));

  // 4. Build the table rows
  // Header row as specified
  const headerRow = ['Columns (columns6)'];
  // Columns row as array of existing elements
  const tableRows = [headerRow, columnsRow];

  // Each .col-md-6 paragraph is its own row, as a single column
  contentRows.forEach(col6 => {
    tableRows.push([col6]);
  });

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
