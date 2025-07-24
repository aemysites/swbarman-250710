/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block (could be nested)
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element;

  // Find the innermost content container (usually div > div > div...)
  let contentDiv = heroBlock;
  while (
    contentDiv &&
    contentDiv.children.length === 1 &&
    (contentDiv.children[0].tagName === 'DIV' || contentDiv.children[0].tagName === 'SECTION')
  ) {
    contentDiv = contentDiv.children[0];
  }

  // Find and reference the first <picture> or <img>, prioritizing <picture>
  let imageEl = contentDiv.querySelector('picture');
  if (!imageEl) imageEl = contentDiv.querySelector('img');
  // If the image is inside a <p>, use the <p> as the element
  if (imageEl && imageEl.parentElement.tagName === 'P') imageEl = imageEl.parentElement;

  // Gather the text elements (excluding image/picture)
  // We want: all direct children of contentDiv except the image element
  const textNodes = [];
  Array.from(contentDiv.children).forEach((child) => {
    if (child !== imageEl) {
      // If the child is an empty <p>, skip
      if (!(child.tagName === 'P' && child.textContent.trim() === '')) {
        textNodes.push(child);
      }
    }
  });

  // Construct the cells as per table structure (1 column, 3 rows)
  const cells = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [textNodes.length ? textNodes : '']
  ];

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
