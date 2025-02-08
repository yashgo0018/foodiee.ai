// Function to extract menu items
function extractMenuItems() {
  const menuItems = [];
  console.log("Starting to extract menu items");

  // Find all elements with data-testid starting with "store-item"
  const items = Array.from(
    document.querySelectorAll('[data-testid^="store-item"]')
  );
  console.log(`Found ${items.length} store items`);

  items.forEach((item, index) => {
    // Log the current item's data-testid for debugging
    const testId = item.getAttribute("data-testid");

    const [nameElement, priceElement] = item.querySelectorAll(
      '[data-testid="rich-text"]'
    );

    if (nameElement) {
      const menuItem = {
        name: nameElement.textContent.trim(),
        price: priceElement ? priceElement.textContent.trim() : "N/A",
        testId: testId, // Include testId for debugging
      };
      console.log("Extracted item:", menuItem);
      menuItems.push(menuItem);
    } else {
      console.log(`No name element found for item ${index + 1}`);
    }
  });

  console.log(`Total menu items extracted: ${menuItems.length}`);
  return menuItems;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in content script:", request);

  if (request.action === "getMenuItems") {
    console.log("Starting menu item extraction");
    const menuItems = extractMenuItems();
    console.log("Sending response back to popup:", menuItems);
    sendResponse({ menuItems: menuItems });
  }

  // Return true to indicate we will send a response asynchronously
  return true;
});

// Log when content script is loaded
console.log("Uber Eats Menu Scraper content script loaded");
