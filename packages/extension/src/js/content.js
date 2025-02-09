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

  if (request.action === "scrollToItem") {
    const element = document.querySelector(`[data-testid="${request.testId}"]`);
    if (element) {
      // Scroll the element into view
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      // Add highlight effect
      const originalBackground = element.style.backgroundColor;
      element.style.backgroundColor = "#fff3e0"; // Soft orange highlight
      element.style.transition = "background-color 0.5s";

      // Remove highlight after 2 seconds
      setTimeout(() => {
        element.style.backgroundColor = originalBackground;
      }, 2000);
    }
  }

  return true;
});

// Log when content script is loaded
console.log("Uber Eats Menu Scraper content script loaded");

// Add CSS for highlight animation
const style = document.createElement("style");
style.textContent = `
  @keyframes highlightFade {
    from { background-color: #fff3e0; }
    to { background-color: transparent; }
  }
`;
document.head.appendChild(style);
