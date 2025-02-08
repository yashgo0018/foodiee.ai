// Add any interactive functionality here
document.addEventListener("DOMContentLoaded", function () {
  console.log("Popup loaded!");

  const scrapeButton = document.getElementById("scrapeButton");
  const menuList = document.getElementById("menuList");

  scrapeButton.addEventListener("click", async () => {
    // Get the current active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab.url.includes("ubereats.com")) {
      menuList.innerHTML = "<p>I am here.</p>";

      // Send message to content script
      chrome.tabs.sendMessage(
        tab.id,
        { action: "getMenuItems" },
        (response) => {
          if (response && response.menuItems) {
            console.log(response.menuItems);
            displayMenuItems(response.menuItems);
          }
        }
      );
    } else {
      menuList.innerHTML =
        "<p>Please navigate to an Uber Eats store page first.</p>";
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
      itemElement.innerHTML = `
        <h3>${item.name}</h3>
        <p class="price">${item.price}</p>
        ${item.description ? `<p>${item.description}</p>` : ""}
      `;
      menuList.appendChild(itemElement);
    });
  }
});
