(function() {
  var sel = "h1, h2, h3, h4, h5, h6"
  document
    .querySelectorAll(sel)
    .forEach(function(elem) {
      var link = document.createElement("a")
      link.href = "#" + elem.id
      link.className = "header-link"
      var txt = document.createTextNode("¶")
      link.appendChild(txt)
      elem.appendChild(link)
    })
}())
