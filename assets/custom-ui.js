const THEME_KEY = "pon-score-theme";

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = selectedTheme;
  document.documentElement.style.colorScheme = selectedTheme;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor?.setAttribute("content", selectedTheme === "dark" ? "#0d120f" : "#f6f8ef");

  try {
    localStorage.setItem(THEME_KEY, selectedTheme);
  } catch {}

  document.querySelectorAll(".theme-option").forEach((button) => {
    const isSelected = button.dataset.themeValue === selectedTheme;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function hideRemovedActions() {
  document.querySelectorAll(".utility-actions button").forEach((button) => {
    if (button.textContent.trim().startsWith("音声")) {
      button.hidden = true;
      button.tabIndex = -1;
      button.setAttribute("aria-hidden", "true");
    }
  });

  const bottomBar = document.querySelector(".bottom-bar");
  if (bottomBar) {
    bottomBar.hidden = true;
    bottomBar.setAttribute("aria-hidden", "true");
  }
}

function markCurrentSet() {
  const rows = [...document.querySelectorAll(".game-history .game-result")];
  rows.forEach((row) => {
    row.classList.remove("is-current");
    row.removeAttribute("aria-current");
  });

  const currentRow = rows.at(-1);
  if (currentRow) {
    currentRow.classList.add("is-current");
    currentRow.setAttribute("aria-current", "step");
  }
}

function resetPlayerPanelScroll() {
  document.querySelectorAll(".player-panel").forEach((panel) => {
    if (panel.scrollTop !== 0) panel.scrollTop = 0;
  });
}

function makeThemeButton(theme, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-option";
  button.dataset.themeValue = theme;
  button.textContent = label;
  button.addEventListener("click", () => applyTheme(theme));
  return button;
}

function injectDisplaySettings() {
  const setupCard = document.querySelector(".setup-card");
  if (!setupCard || setupCard.querySelector(".display-settings")) return;

  const fieldset = document.createElement("fieldset");
  fieldset.className = "display-settings";

  const legend = document.createElement("legend");
  legend.textContent = "表示と操作";
  fieldset.append(legend);

  const themeLabel = document.createElement("span");
  themeLabel.className = "display-setting-label";
  themeLabel.textContent = "画面テーマ";
  fieldset.append(themeLabel);

  const themeChoice = document.createElement("div");
  themeChoice.className = "theme-choice";
  themeChoice.setAttribute("role", "group");
  themeChoice.setAttribute("aria-label", "画面テーマ");
  themeChoice.append(
    makeThemeButton("light", "ライトモード"),
    makeThemeButton("dark", "ダークモード"),
  );
  fieldset.append(themeChoice);

  const swapButton = document.createElement("button");
  swapButton.type = "button";
  swapButton.className = "swap-sides-button";
  swapButton.disabled = !setupCard.querySelector(".close-button");
  swapButton.setAttribute("aria-label", "左右の選手表示を訂正する");

  const swapTitle = document.createElement("strong");
  swapTitle.textContent = "左右の表示を訂正";
  const swapStatus = document.createElement("small");

  const updateSwapStatus = () => {
    const names = [...document.querySelectorAll(".player-heading h2")].map((heading) =>
      heading.textContent.trim(),
    );
    swapStatus.textContent = swapButton.disabled
      ? "試合開始後に使用できます"
      : `現在: ${names[0] ?? "左"} ／ ${names[1] ?? "右"}`;
  };

  updateSwapStatus();
  swapButton.append(swapTitle, swapStatus);
  swapButton.addEventListener("click", () => {
    const originalButton = [...document.querySelectorAll(".bottom-actions button")].find(
      (button) => button.textContent.trim() === "左右を訂正",
    );
    originalButton?.click();
    requestAnimationFrame(updateSwapStatus);
  });
  fieldset.append(swapButton);

  const setupNote = setupCard.querySelector(".setup-note");
  if (setupNote) setupNote.before(fieldset);
  else setupCard.append(fieldset);

  applyTheme(getStoredTheme());
}

function enhanceUi() {
  hideRemovedActions();
  markCurrentSet();
  resetPlayerPanelScroll();
  injectDisplaySettings();
}

applyTheme(getStoredTheme());
enhanceUi();

const root = document.getElementById("root");
if (root) {
  new MutationObserver(enhanceUi).observe(root, {
    childList: true,
    subtree: true,
  });
}
