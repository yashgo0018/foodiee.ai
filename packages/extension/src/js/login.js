document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");

  loginButton?.addEventListener("click", () => {
    // Open login page in a new tab
    chrome.tabs.create({
      url: "http://localhost:3002/login?source=extension",
    });

    // Listen for messages from the website
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "LOGIN_SUCCESS") {
        // Store the auth token
        chrome.storage.local.set(
          {
            authToken: message.token,
            userEmail: message.email,
          },
          () => {
            // Redirect to main popup
            window.location.href = "popup.html";
          }
        );
      }
    });
  });
});
