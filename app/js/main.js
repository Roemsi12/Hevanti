/* Hevanti — demo-interactie.
   Alles draait client-side; er is nog geen backend. */

(function () {
  "use strict";

  var kalmeAnimatie = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Vloerplanken tekenen ---------- */
  // Acht planken met wisselende versprongen naden, zodat het niet als een raster oogt.
  (function bouwVloer() {
    var vloer = document.getElementById("vloerBeeld");
    if (!vloer) return;

    for (var i = 0; i < 8; i++) {
      var plank = document.createElement("div");
      plank.className = "vloer__plank";
      plank.style.top = i * 12.5 + "%";
      plank.style.filter = "brightness(" + (0.82 + ((i * 37) % 30) / 100) + ")";
      plank.style.backgroundPosition = ((i * 43) % 100) + "% 50%";
      vloer.insertBefore(plank, vloer.firstChild);
    }
  })();

  /* ---------- Mobiel menu ---------- */
  (function menu() {
    var schakelaar = document.querySelector(".nav-schakelaar");
    var nav = document.getElementById("hoofdnav");
    if (!schakelaar || !nav) return;

    function zet(open) {
      schakelaar.setAttribute("aria-expanded", String(open));
      schakelaar.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
      nav.dataset.open = open ? "ja" : "nee";
    }

    schakelaar.addEventListener("click", function () {
      zet(schakelaar.getAttribute("aria-expanded") !== "true");
    });

    // Na een klik op een link het menu weer dichtdoen.
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) zet(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && schakelaar.getAttribute("aria-expanded") === "true") {
        zet(false);
        schakelaar.focus();
      }
    });

    // Terug naar desktop: reset de status zodat de nav niet verborgen blijft.
    window.matchMedia("(min-width: 761px)").addEventListener("change", function (e) {
      if (e.matches) zet(false);
    });
  })();

  /* ---------- Schaduw onder de sticky kop ---------- */
  (function kopSchaduw() {
    var kop = document.getElementById("kop");
    if (!kop) return;

    function bijwerken() {
      kop.dataset.geplakt = window.scrollY > 8 ? "ja" : "nee";
    }
    bijwerken();
    window.addEventListener("scroll", bijwerken, { passive: true });
  })();

  /* ---------- Onthullen bij scrollen ---------- */
  (function onthullen() {
    var elementen = document.querySelectorAll(".onthul");
    if (!elementen.length) return;

    if (kalmeAnimatie || !("IntersectionObserver" in window)) {
      elementen.forEach(function (el) { el.dataset.zichtbaar = "ja"; });
      return;
    }

    var waarnemer = new IntersectionObserver(function (items) {
      items.forEach(function (item) {
        if (!item.isIntersecting) return;
        item.target.dataset.zichtbaar = "ja";
        waarnemer.unobserve(item.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.1 });

    elementen.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      waarnemer.observe(el);
    });
  })();

  /* ---------- Actieve sectie in het menu ---------- */
  (function actieveLink() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
    var secties = links
      .map(function (link) { return document.querySelector(link.getAttribute("href")); })
      .filter(Boolean);
    if (!secties.length || !("IntersectionObserver" in window)) return;

    var waarnemer = new IntersectionObserver(function (items) {
      items.forEach(function (item) {
        var link = links.find(function (l) { return l.getAttribute("href") === "#" + item.target.id; });
        if (!link) return;
        if (item.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    secties.forEach(function (s) { waarnemer.observe(s); });
  })();

  /* ---------- Offerteformulier (demo) ---------- */
  (function formulier() {
    var form = document.getElementById("offerteFormulier");
    var melding = document.getElementById("formulierMelding");
    if (!form || !melding) return;

    var emailPatroon = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var telefoonPatroon = /^[0-9 +()-]{8,}$/;

    function vak(veldEl) {
      return veldEl.closest("[data-veld]");
    }

    function markeer(veldEl, fout) {
      var houder = vak(veldEl);
      if (houder) houder.dataset.fout = fout ? "ja" : "nee";
      return !fout;
    }

    function controleer() {
      var naam = form.naam;
      var email = form.email;
      var telefoon = form.telefoon;
      var vloer = form.vloer;
      var oppervlak = form.oppervlak;

      var resultaten = [
        markeer(naam, naam.value.trim().length < 2),
        markeer(email, !emailPatroon.test(email.value.trim())),
        markeer(telefoon, telefoon.value.trim() !== "" && !telefoonPatroon.test(telefoon.value.trim())),
        markeer(vloer, vloer.value === ""),
        markeer(oppervlak, oppervlak.value !== "" && (Number(oppervlak.value) < 1 || Number(oppervlak.value) > 2000))
      ];

      return resultaten.every(Boolean);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      melding.dataset.zichtbaar = "nee";

      if (!controleer()) {
        var eersteFout = form.querySelector('[data-fout="ja"] input, [data-fout="ja"] select');
        if (eersteFout) eersteFout.focus();
        return;
      }

      var naam = form.naam.value.trim().split(" ")[0];
      melding.textContent =
        "Bedankt " + naam + "! Dit is een demo, dus er is niets verstuurd. " +
        "In de echte site komt hier een bevestiging en gaat de aanvraag naar de planning.";
      melding.dataset.zichtbaar = "ja";
      form.reset();
      form.querySelectorAll("[data-veld]").forEach(function (v) { v.dataset.fout = "nee"; });
    });

    // Fouten verdwijnen zodra iemand het veld herstelt.
    form.addEventListener("input", function (e) {
      var houder = e.target.closest("[data-veld]");
      if (houder && houder.dataset.fout === "ja") controleer();
    });
  })();

  /* ---------- Jaartal in de voettekst ---------- */
  (function jaartal() {
    var el = document.getElementById("jaartal");
    if (el) el.textContent = new Date().getFullYear();
  })();
})();
