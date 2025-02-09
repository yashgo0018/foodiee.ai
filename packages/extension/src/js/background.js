// Listen for web requests to check auth state
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    // Check if user is authenticated
    chrome.storage.local.get(["authToken"], function (result) {
      if (!result.authToken) {
        // If not authenticated, redirect to login
        chrome.action.setPopup({ popup: "src/html/login.html" });
      } else {
        // If authenticated, show main popup
        chrome.action.setPopup({ popup: "src/html/popup.html" });
      }
    });
  },
  { urls: ["<all_urls>"] }
);

// Listen for auth state changes from the website
chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.type === "LOGIN_SUCCESS") {
    chrome.storage.local.set({
      authToken: request.token,
      userEmail: request.email,
    });
    // Update popup to main view
    chrome.action.setPopup({ popup: "src/html/popup.html" }, () => {
      chrome.action.openPopup();
    });
  } else if (request.type === "LOGOUT") {
    chrome.storage.local.remove(["authToken", "userEmail"]);
    // Update popup to login view
    chrome.action.setPopup({ popup: "src/html/login.html" });
  }
});
