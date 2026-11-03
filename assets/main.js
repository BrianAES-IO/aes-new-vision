// Aesurus Limited — site behaviour (no dependencies)

(function () {
  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Fade sections in as they scroll into view
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Cursor spotlight on cards
  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  // Lightbox for screenshots
  var box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = '<figure style="margin:0"><img alt=""><p></p></figure>';
  document.body.appendChild(box);
  function openBox(src, caption) {
    box.querySelector("img").src = src;
    box.querySelector("img").alt = caption;
    box.querySelector("p").textContent = caption;
    box.classList.add("open");
  }
  box.addEventListener("click", function () { box.classList.remove("open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") box.classList.remove("open"); });
  document.querySelectorAll("[data-zoom]").forEach(function (img) {
    img.addEventListener("click", function () { openBox(img.currentSrc || img.src, img.alt); });
  });

  // OS screenshot gallery tabs
  var gallery = document.querySelector(".gallery");
  if (gallery) {
    var tabs = gallery.querySelectorAll(".tab");
    var stageImg = gallery.querySelector(".stage img");
    var stageCap = gallery.querySelector(".stage figcaption");
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(i, true); });
      tab.addEventListener("keydown", function (e) {
        var d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (d) { e.preventDefault(); select((i + d + tabs.length) % tabs.length, true); tabs[(i + d + tabs.length) % tabs.length].focus(); }
      });
    });
    function select(i) {
      tabs.forEach(function (t, j) {
        t.setAttribute("aria-selected", i === j ? "true" : "false");
        t.tabIndex = i === j ? 0 : -1;
      });
      stageImg.src = tabs[i].dataset.src;
      stageImg.alt = tabs[i].dataset.alt;
      stageCap.textContent = tabs[i].dataset.alt;
    }
  }

  // Contact form: pre-select a service from ?service=..., then open the
  // visitor's mail app with the message filled in (static site, no backend).
  var form = document.getElementById("contact-form");
  if (form) {
    var wanted = new URLSearchParams(location.search).get("service");
    var pre = wanted && form.querySelector('input[name="service"][value="' + wanted + '"]');
    if (pre) pre.checked = true;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.reportValidity()) return;
      var f = form.elements;
      var picked = form.querySelector('input[name="service"]:checked');
      var topic = picked ? form.querySelector('label[for="' + picked.id + '"]').textContent : "General enquiry";
      var lines = ["Name: " + f.name.value, "Email: " + f.email.value];
      if (f.phone.value) lines.push("Phone: " + f.phone.value);
      if (f.company.value) lines.push("Company: " + f.company.value);
      lines.push("", f.message.value);
      location.href = "mailto:info@aesurus.io?subject=" + encodeURIComponent("Website enquiry: " + topic) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      var note = document.getElementById("form-status");
      if (note) note.textContent = "Your email app should open with the message ready to send. If it doesn't, email us at info@aesurus.io.";
    });
  }
})();
