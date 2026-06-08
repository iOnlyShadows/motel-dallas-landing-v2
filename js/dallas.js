/* ============================================================
   MOTEL DALLAS — interactions
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- HERO load ---- */
  var hero = document.querySelector(".hero");
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { if (hero) hero.classList.add("ready"); });
  });

  /* ---- NAV scroll state ---- */
  var nav = document.getElementById("nav");
  var waFloat = document.getElementById("waFloat");
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("scrolled", y > 40);
    if (waFloat) waFloat.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- MOBILE MENU ---- */
  var burger = document.getElementById("navBurger");
  var navMenu = document.getElementById("navMenu");
  function setMenu(open) {
    if (!burger || !navMenu) return;
    burger.classList.toggle("open", open);
    navMenu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    navMenu.setAttribute("aria-hidden", open ? "false" : "true");
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("modal-open", open);
  }
  if (burger && navMenu) {
    burger.addEventListener("click", function () {
      setMenu(!navMenu.classList.contains("open"));
    });
    navMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("open")) setMenu(false);
    });
  }

  /* ---- HERO parallax ---- */
  var heroBg = document.getElementById("heroBg");
  if (heroBg && !reduceMotion) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.pageYOffset || 0;
        if (y < window.innerHeight * 1.2) {
          heroBg.style.transform = "translateY(" + (y * 0.32) + "px) scale(" + (1 + y * 0.00012) + ")";
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---- REVEAL on scroll ---- */
  var revealEls = document.querySelectorAll("[data-reveal],[data-clip]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- SUITE MODAL ---- */
  var modal = document.getElementById("modal");
  var mPlate = document.getElementById("mPlate");
  var mCat = document.getElementById("mCat");
  var mName = document.getElementById("mName");
  var mDesc = document.getElementById("mDesc");
  var mFeats = document.getElementById("mFeats");
  var mP2 = document.getElementById("mP2");
  var mPadd = document.getElementById("mPadd");
  var mPday = document.getElementById("mPday");
  var mWa = document.getElementById("mWa");
  var lastFocus = null;

  function openSuite(card) {
    if (!modal) return;
    var name = card.querySelector(".suite-name").textContent.trim();
    var detail = card.querySelector(".suite-detail").textContent.trim();
    var plate = card.getAttribute("data-plate") || "plate--suite";

    mPlate.className = "plate " + (plate === "plate" ? "" : plate);
    var img = card.getAttribute("data-img");
    mPlate.innerHTML =
      (img ? '<div class="plate-photo" style="--img:url(\'' + img + '\')"></div>' : '') +
      '<div class="glint"></div>';
    mCat.textContent = card.getAttribute("data-cat") || "";
    mName.textContent = name;
    mDesc.textContent = detail;

    mFeats.innerHTML = "";
    card.querySelectorAll(".suite-feats .feat").forEach(function (f) {
      var s = document.createElement("span");
      s.className = "feat";
      s.textContent = f.textContent;
      mFeats.appendChild(s);
    });

    mP2.textContent = card.getAttribute("data-p2") || "";
    mPadd.textContent = card.getAttribute("data-padd") || "";
    mPday.textContent = card.getAttribute("data-pday") || "";

    var msg = encodeURIComponent("Olá! Gostaria de reservar a Suíte " + name + " no Motel Dallas.");
    mWa.setAttribute("href", "https://wa.me/5545991479166?text=" + msg);

    lastFocus = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll(".suite").forEach(function (card) {
    card.addEventListener("click", function () { openSuite(card); });
  });
  if (modal) {
    modal.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) closeModal();
  });

  /* ---- Smooth anchor offset for fixed nav ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      var top = t.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
})();
