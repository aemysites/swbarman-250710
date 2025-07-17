/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero'];

  // 2. Background image placeholder
  const bgRow = [''];

  // 3. Content row: Collect all block-level content from the hero inner wrapper.
  // Look for the innermost container if present, else fallback to element itself
  let contentParent = element.querySelector('.intro-text') || element;

  // Collect all child nodes that are elements or non-empty text nodes
  const content = [];
  for (const node of contentParent.childNodes) {
    if (node.nodeType === 1) { // element node
      content.push(node);
    } else if (node.nodeType === 3 && node.textContent.trim()) { // text node
      // Wrap any stray text in a <div> for structure
      const div = document.createElement('div');
      div.textContent = node.textContent.trim();
      content.push(div);
    }
  }

  // If nothing meaningful found, use empty string
  const contentRow = [content.length > 0 ? content : ['']];

  // Compose the table
  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];

  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
