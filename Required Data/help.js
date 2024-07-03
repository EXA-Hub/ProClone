// Select all elements matching the container class
let containers = document.querySelectorAll(".command-card__container");

// Initialize an empty array to store results
let results = [];

// Loop through each container element
containers.forEach((container) => {
  // Find the <h5> element inside each container
  let h5Element = container.querySelector("h5.command-card__header__title");

  h5Element.click();
  // Extract text content from the <h5> element
  if (h5Element) {
    let text = h5Element.textContent.trim();
    results.push({ text });
  }
});

// Output the results array as JSON
console.log(JSON.stringify(results));
