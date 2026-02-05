function load(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => document.getElementById(id).innerHTML = data);
}

load("header", "/partials/header.html");
load("footer", "/partials/footer.html");
