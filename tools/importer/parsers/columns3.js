/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Columns (columns3)'];

  // 2. Gather direct children and identify content columns
  const children = Array.from(element.querySelectorAll(':scope > *'));

  // Get the three main columns (icons + headings)
  const featureCols = children.filter(el => el.classList.contains('col-md-4'));
  // There should be three of these

  // Next, find the col-md-6s that have content
  const contentCols = children.filter(el => el.classList.contains('col-md-6') && el.textContent.trim() !== '');
  // There should be two of these, each a paragraph

  // Build the table rows
  const rows = [];

  // First content row: three features side by side
  if (featureCols.length === 3) {
    rows.push(featureCols);
  } else if (featureCols.length > 0) {
    // Fallback: include whatever is there
    rows.push(featureCols);
  }

  // Next content rows: for each content col-md-6, create a row of three cells, with content in the center cell
  contentCols.forEach(col => {
    rows.push(['', col, '']);
  });

  // Assemble cells for createTable
  const cells = [headerRow, ...rows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
