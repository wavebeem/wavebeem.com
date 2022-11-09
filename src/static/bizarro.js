for (const button of document.querySelectorAll("[data-bizarro-button]")) {
  button.addEventListener("click", function () {
    document.documentElement.classList.toggle("bizarro");
  });
}

export {};
