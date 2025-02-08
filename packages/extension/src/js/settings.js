// Load saved settings when the page opens
document.addEventListener("DOMContentLoaded", loadSettings);

const allergyInput = document.getElementById("allergyInput");
const allergyTags = document.getElementById("allergyTags");
const dietaryPreference = document.getElementById("dietaryPreference");
const saveButton = document.getElementById("saveSettings");

let allergies = [];

// Load settings from storage
function loadSettings() {
  chrome.storage.sync.get(["allergies", "dietaryPreference"], (result) => {
    console.log("Loading settings:", result);

    if (result.allergies) {
      allergies = result.allergies;
      renderAllergyTags();
    }

    if (result.dietaryPreference) {
      dietaryPreference.value = result.dietaryPreference;
    }
  });
}

// Save settings to storage
function saveSettings() {
  const settings = {
    allergies: allergies,
    dietaryPreference: dietaryPreference.value,
  };

  chrome.storage.sync.set(settings, () => {
    console.log("Settings saved:", settings);
    // Show save confirmation
    saveButton.textContent = "Saved!";
    setTimeout(() => {
      saveButton.textContent = "Save Settings";
    }, 2000);
  });
}

// Handle adding new allergies
allergyInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && allergyInput.value.trim()) {
    const newAllergy = allergyInput.value.trim().toLowerCase();
    if (!allergies.includes(newAllergy)) {
      allergies.push(newAllergy);
      renderAllergyTags();
      allergyInput.value = "";
    }
  }
});

// Remove allergy tag
function removeAllergy(allergy) {
  allergies = allergies.filter((a) => a !== allergy);
  renderAllergyTags();
}

// Render allergy tags
function renderAllergyTags() {
  allergyTags.innerHTML = allergies
    .map(
      (allergy) => `
    <div class="allergy-tag">
      ${allergy}
      <button onclick="removeAllergy('${allergy}')">&times;</button>
    </div>
  `
    )
    .join("");
}

// Save button click handler
saveButton.addEventListener("click", saveSettings);
