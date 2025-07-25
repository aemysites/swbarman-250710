/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get first .hero.block, or fallback to element
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element;

  // Drill into possible nested divs to find content root
  let contentRoot = heroBlock;
  while (contentRoot.children.length === 1 && contentRoot.children[0].tagName === 'DIV') {
    contentRoot = contentRoot.children[0];
  }

  // Find the first <p> that contains a picture/img as background image
  let heroImg = null;
  let imgPara = null;
  for (const node of Array.from(contentRoot.children)) {
    if (
      node.tagName === 'P' &&
      (node.querySelector('picture') || node.querySelector('img'))
    ) {
      heroImg = node.querySelector('picture') || node.querySelector('img');
      imgPara = node;
      break;
    }
  }

  // Gather the content after the image (headings, subheading, CTA, etc.)
  let textContent = [];
  let foundImg = false;
  for (const node of Array.from(contentRoot.children)) {
    if (node === imgPara) {
      foundImg = true;
      continue;
    }
    if (!foundImg) continue;
    // Only include elements that have text or are headings (skip empty <p>)
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      (node.textContent.trim() || node.tagName.match(/^H\d/))
    ) {
      textContent.push(node);
    }
  }

  // If no text content found and no image, try including all children (e.g. in edge cases)
  if (!heroImg && textContent.length === 0) {
    textContent = Array.from(contentRoot.children).filter(
      (node) => node.nodeType === Node.ELEMENT_NODE && node.textContent.trim()
    );
  }

  // Build table as per the guidelines
  const cells = [
    ['Hero'],
    [heroImg ? heroImg : ''],
    [textContent.length ? textContent : ''],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
