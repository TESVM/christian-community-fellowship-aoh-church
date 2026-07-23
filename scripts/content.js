/*
 * Progressive-enhancement content hydration.
 *
 * Reads content/site.json (edited through the Decap CMS admin at /admin/) and
 * overlays it onto the page. The HTML already contains real, current content,
 * so if this file is missing or JavaScript is disabled the page still works —
 * the JSON simply overrides matching fields when present.
 *
 * Hooks used in index.html:
 *   data-content="a.b.c"            -> sets element.textContent
 *   data-content-attr="href:a.b.c"  -> sets an attribute (comma-separate multiple)
 *   data-content-list="key"         -> renders an array of {date,title,body} cards
 *   data-content-bg="a.b.c"         -> sets the --hero-image CSS var (background)
 */
(function () {
  "use strict";

  function getPath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && typeof acc === "object" ? acc[key] : undefined;
    }, obj);
  }

  function applyText(data) {
    document.querySelectorAll("[data-content]").forEach(function (el) {
      var value = getPath(data, el.getAttribute("data-content"));
      if (typeof value === "string" && value.trim() !== "") {
        el.textContent = value;
      }
    });
  }

  function applyAttrs(data) {
    document.querySelectorAll("[data-content-attr]").forEach(function (el) {
      el.getAttribute("data-content-attr")
        .split(",")
        .forEach(function (pair) {
          var parts = pair.split(":");
          if (parts.length < 2) return;
          var attr = parts[0].trim();
          var value = getPath(data, parts.slice(1).join(":").trim());
          if (typeof value === "string" && value.trim() !== "") {
            el.setAttribute(attr, value);
          }
        });
    });
  }

  function applyLists(data) {
    document.querySelectorAll("[data-content-list]").forEach(function (container) {
      var items = getPath(data, container.getAttribute("data-content-list"));
      if (!Array.isArray(items) || items.length === 0) return; // keep static fallback
      container.textContent = "";
      items.forEach(function (item) {
        var card = document.createElement("article");
        card.className = "event-card";

        if (item.date) {
          var date = document.createElement("p");
          date.className = "event-date";
          date.textContent = item.date;
          card.appendChild(date);
        }
        var title = document.createElement("h3");
        title.textContent = item.title || "";
        card.appendChild(title);

        if (item.body) {
          var body = document.createElement("p");
          body.textContent = item.body;
          card.appendChild(body);
        }
        container.appendChild(card);
      });
    });
  }

  function applyBackgrounds(data) {
    document.querySelectorAll("[data-content-bg]").forEach(function (el) {
      var value = getPath(data, el.getAttribute("data-content-bg"));
      if (typeof value !== "string" || value.trim() === "") return;
      // Decap may store an absolute "/images/..." path; strip the leading slash
      // so it stays relative to the site (this project is served from a subpath).
      var path = value.replace(/^\//, "");
      el.style.setProperty("--hero-image", 'url("' + path + '")');
    });
  }

  fetch("content/site.json", { cache: "no-cache" })
    .then(function (res) {
      if (!res.ok) throw new Error("content unavailable");
      return res.json();
    })
    .then(function (data) {
      if (!data || typeof data !== "object") return;
      applyText(data);
      applyAttrs(data);
      applyLists(data);
      applyBackgrounds(data);
    })
    .catch(function () {
      /* No content file yet — the static HTML content stands as-is. */
    });
})();
