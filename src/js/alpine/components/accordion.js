export default () => ({
  activeAccordion: '',

  initialize(data) {
    if (typeof data === 'array') this.data = data;

    if (typeof data === 'string') this.data = this.parseHTMLToStructuredData(data);
  },

  // Manage active accordion
  setActiveAccordion(id) {
    this.activeAccordion = this.activeAccordion == id ? '' : id;
  },

  // Parse HTML string to structured data
  parseHTMLToStructuredData(htmlString) {
    // Create an element to conveniently manipulate and traverse the provided HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const output = [];

    // Use querySelectorAll to find all <h1> elements
    const headers = Array.from(doc.querySelectorAll('h1'));

    headers.forEach((header, index) => {
      // Define an object to store the current title and content
      const section = {
        title: header.textContent.trim(),
        content: '',
      };

      // Initialize a variable to keep track of the current node for iteration
      let currentNode = header.nextElementSibling;

      // While a next element exists and it is not another <h1>, concatenate its outerHTML to the content string
      while (currentNode && currentNode.tagName !== 'H1') {
        section.content += currentNode.outerHTML;
        currentNode = currentNode.nextElementSibling;
      }

      // Push the section object to the output array
      output.push(section);
    });

    return output;
  },
});
