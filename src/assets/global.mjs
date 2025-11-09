const root = document.documentElement;

// Apply theme parameters to the document
{
  const url = new URL(location.href);
  const theme = url.searchParams.get("theme");
  if (theme) {
    root.dataset.theme = theme;
  }
}

// Add date information to document
{
  const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];
  const date = new Date();
  root.dataset.year = date.getFullYear();
  root.dataset.month = date.getMonth() + 1;
  root.dataset.date = date.getDate();
  root.dataset.day = weekdays[date.getDay()];
}

// Enable JS figure image viewer
{
  root.dataset.figureViewer = "";
  const dialog = document.createElement("dialog");
  dialog.className = "figure-viewer";
  dialog.addEventListener("click", (event) => {
    dialog.close();
  });
  dialog.addEventListener("close", (event) => {
    if (history.state && history.state.type === "figure-viewer.dialog-open") {
      history.back();
    }
    dialog.close();
  });
  addEventListener("popstate", (event) => {
    if (
      event.state &&
      event.state.type === "figure-viewer.dialog-closed" &&
      dialog.open
    ) {
      dialog.close();
    }
  });
  document.body.append(dialog);

  history.replaceState({ type: "figure-viewer.dialog-closed" }, "");

  addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }
    const img = event.target.closest("img");
    const figure = img?.closest("figure");
    const anchor = img?.closest("a");
    if (!(img && figure && !anchor)) {
      return;
    }
    event.preventDefault();
    const newImg = img.cloneNode(true);
    newImg.className = "";
    dialog.textContent = "";
    dialog.append(newImg);
    history.pushState({ type: "figure-viewer.dialog-open" }, "");
    dialog.showModal();
  });
}
