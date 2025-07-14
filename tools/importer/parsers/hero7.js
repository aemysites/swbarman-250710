/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match the block name 'Hero'
  const headerRow = ['Hero'];

  // Background image row. None present, so empty string.
  const bgRow = [''];

  // Find the section with all the content
  const contentWrapper = element.querySelector('.col-lg-12.text-center');
  const contentElements = [];
  if (contentWrapper) {
    // Collect all of its children in order
    for (const child of Array.from(contentWrapper.children)) {
      contentElements.push(child);
    }
  }
  // If for some reason, contentElements is empty, provide an empty string for resilience
  const contentRow = [contentElements.length ? contentElements : ['']];

  // Compose table: only one table per the example
  const cells = [headerRow, bgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
