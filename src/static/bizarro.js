for (const button of document.querySelectorAll("[data-bizarro]")) {
  button.addEventListener("click", function () {
    button.dataset.bizarro = button.dataset.bizarro === "on" ? "off" : "on";
  });
}

export {};
