// Add any interactive functionality here
document.addEventListener("DOMContentLoaded", function () {
  console.log("Popup loaded!");

  const scrapeButton = document.getElementById("scrapeButton");
  const filterButton = document.getElementById("filterButton");
  const menuList = document.getElementById("menuList");

  let scrapedItems = []; // Store scraped items for filtering

  scrapeButton.addEventListener("click", async () => {
    // Get the current active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab.url.includes("ubereats.com")) {
      menuList.innerHTML = "<p>Scraping menu items...</p>";

      // Send message to content script
      chrome.tabs.sendMessage(
        tab.id,
        { action: "getMenuItems" },
        (response) => {
          if (response && response.menuItems) {
            console.log(response.menuItems);
            scrapedItems = response.menuItems; // Store the items
            displayMenuItems(response.menuItems);
          }
        }
      );
    } else {
      menuList.innerHTML =
        "<p>Please navigate to an Uber Eats store page first.</p>";
    }
  });

  filterButton.addEventListener("click", async () => {
    if (scrapedItems.length === 0) {
      menuList.innerHTML = "<p>Please scrape menu items first.</p>";
      return;
    }

    menuList.innerHTML = "<p>Processing menu items...</p>";

    try {
      // Get user preferences from storage
      const preferences = await chrome.storage.sync.get([
        "language",
        "allergies",
        "dietaryPreference",
      ]);

      // Format items for API
      const formattedItems = scrapedItems.map((item, index) => ({
        id: `item_${index}`,
        originalName: item.name,
      }));

      // Call the API
      const response = await fetch(
        "http://localhost:3002/api/process-user-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: formattedItems,
            language: preferences.language || "English",
            allergies: preferences.allergies || [],
            dietaryPreference: preferences.dietaryPreference || "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process menu items");
      }

      const result = await response.json();
      displayProcessedItems(result.items, scrapedItems);
    } catch (error) {
      console.error("Error processing items:", error);
      menuList.innerHTML =
        "<p>Error processing menu items. Please try again.</p>";
    }
  });

  function displayMenuItems(items) {
    menuList.innerHTML = "";

    if (items.length === 0) {
      menuList.innerHTML = "<p>No menu items found.</p>";
      return;
    }

    items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "menu-item";
      // Add cursor pointer and click handler
      itemElement.style.cursor = "pointer";
      itemElement.onclick = () => scrollToItem(item.testId); // testId is from the scraped data

      itemElement.innerHTML = `
        <h3>${item.name}</h3>
        <p class="price">${item.price}</p>
        ${item.description ? `<p>${item.description}</p>` : ""}
      `;
      menuList.appendChild(itemElement);
    });
  }

  function displayProcessedItems(processedItems, originalItems) {
    menuList.innerHTML = "";

    processedItems.forEach((processedItem) => {
      const originalItem = originalItems.find(
        (item, index) => `item_${index}` === processedItem.id
      );

      if (!originalItem) return;

      const itemElement = document.createElement("div");
      itemElement.className = "menu-item";
      // Add cursor pointer and click handler
      itemElement.style.cursor = "pointer";
      itemElement.onclick = () => scrollToItem(originalItem.testId);

      if (!processedItem.isSuitable) {
        itemElement.classList.add("unsuitable");
      }

      itemElement.innerHTML = `
        <h3>${processedItem.translatedName || processedItem.originalName}</h3>
        <p class="price">${originalItem.price}</p>
        ${originalItem.description ? `<p>${originalItem.description}</p>` : ""}
        ${
          processedItem.isTranslated
            ? `<p class="translation-note">Original: ${processedItem.originalName}</p>`
            : ""
        }
        ${
          !processedItem.isSuitable
            ? `<p class="warning">⚠️ This item may not match your preferences</p>`
            : ""
        }
      `;
      menuList.appendChild(itemElement);
    });
  }

  // Add this new function to handle scrolling
  async function scrollToItem(testId) {
    // Get the current active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // Send message to content script to scroll to the item
    chrome.tabs.sendMessage(tab.id, {
      action: "scrollToItem",
      testId: testId,
    });
  }
});
