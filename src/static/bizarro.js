for (const button of document.querySelectorAll("[data-bizarro]")) {
  button.addEventListener("click", function () {
    button.classList.toggle("bizarro");
  });
}

export {};
