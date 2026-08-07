/* BuildScope - motion layer.
   Mechanical only: linear travel, hard settle, no elasticity.
   All scroll work goes through IntersectionObserver. No scroll listeners. */

(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var SNAP = "cubic-bezier(0.2, 0, 0, 1)";

  /* ---- 0. Word masks ---------------------------------------------------- */
  /* Display headlines split into per-word clip boxes before the reveal
     observer registers, so the .in class drives the word cascade. */

  document.querySelectorAll('[data-rv="split"]').forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach(function (word, i) {
      var outer = document.createElement("span");
      outer.className = "w";
      var inner = document.createElement("span");
      inner.className = "wi";
      inner.style.transitionDelay = (i * 45) + "ms";
      inner.textContent = word;
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  });

  /* ---- 1. Scroll reveals ------------------------------------------------ */

  var revealables = document.querySelectorAll("[data-rv]");

  if (reduce.matches) {
    revealables.forEach(function (el) { el.classList.add("in"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---- 2. Count-ups ----------------------------------------------------- */

  function runCount(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.dec || "0", 10);
    var usd = el.dataset.fmt === "usd";

    function render(value, settled) {
      if (usd) {
        el.textContent = "$" + Math.round(value).toLocaleString("en-US");
      } else {
        el.textContent = (settled ? target : value).toFixed(decimals);
      }
    }

    if (reduce.matches) {
      render(target, true);
      return;
    }

    var duration = usd ? 1100 : 900;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / duration, 1);
      // Damped settle, no overshoot.
      var eased = 1 - Math.pow(1 - p, 3);
      render(target * eased, false);
      if (p < 1) requestAnimationFrame(frame);
      else render(target, true);
    }

    requestAnimationFrame(frame);
  }

  var counters = document.querySelectorAll("[data-count]");
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      runCount(entry.target);
      countObserver.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach(function (el) { countObserver.observe(el); });

  /* ---- 3. Process rail: steps light in sequence ------------------------- */
  /* Communicates that the loop runs in order, one stage feeding the next. */

  var steps = document.querySelectorAll("[data-step]");
  if (steps.length) {
    var stepObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var index = Array.prototype.indexOf.call(steps, el);
        var delay = reduce.matches ? 0 : index * 110;
        window.setTimeout(function () { el.classList.add("lit"); }, delay);
        stepObserver.unobserve(el);
      });
    }, { threshold: 0.4 });

    steps.forEach(function (el) { stepObserver.observe(el); });
  }

  /* ---- 4. Plan sheet: one scan pass, then the detections land ----------- */

  var sheet = document.querySelector("[data-sheetfig]");
  if (sheet) {
    var sheetObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sheet.classList.add("lit");
        sheetObserver.unobserve(sheet);

        var scan = sheet.querySelector("[data-scan]");
        if (scan && !reduce.matches && scan.animate) {
          scan.animate(
            [
              { transform: "translateX(0)", opacity: 0 },
              { opacity: 0.75, offset: 0.08 },
              { opacity: 0.75, offset: 0.88 },
              { transform: "translateX(1021px)", opacity: 0 }
            ],
            { duration: 1400, easing: "linear", fill: "forwards" }
          );
        } else if (scan) {
          scan.style.opacity = "0";
        }
      });
    }, { threshold: 0.3 });

    sheetObserver.observe(sheet);
  }

  /* ---- 5. Nav hairline on departure from the hero ----------------------- */

  var nav = document.getElementById("nav");
  var sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:80px;pointer-events:none";
  document.body.prepend(sentinel);

  new IntersectionObserver(function (entries) {
    nav.classList.toggle("stuck", !entries[0].isIntersecting);
  }, { threshold: 0 }).observe(sentinel);

  /* ---- 6. Sheet rail: mark the sheet currently in view ------------------ */

  var sheets = document.querySelectorAll("[data-sheet]");
  var ticks = document.querySelectorAll(".sheetrail .tick");

  if (sheets.length && ticks.length) {
    var visible = new Set();

    var railObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.dataset.sheet;
        if (entry.isIntersecting) visible.add(id);
        else visible.delete(id);
      });

      // Topmost visible section wins, so the rail never flickers between two.
      var current = null;
      sheets.forEach(function (section) {
        if (current === null && visible.has(section.dataset.sheet)) {
          current = section.dataset.sheet;
        }
      });

      ticks.forEach(function (tick) {
        tick.classList.toggle("on", tick.dataset.rail === current);
      });
    }, { rootMargin: "-45% 0px -45% 0px" });

    sheets.forEach(function (section) { railObserver.observe(section); });
    document.querySelector(".sheetrail").style.pointerEvents = "auto";
  }

  /* ---- 7. Directional button fill ---------------------------------------- */
  /* The hover fill enters from whichever side the cursor arrived on. */

  if (window.matchMedia("(hover: hover)").matches && !reduce.matches) {
    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.addEventListener("pointerenter", function (event) {
        var rect = btn.getBoundingClientRect();
        btn.classList.toggle("from-r", event.clientX - rect.left > rect.width / 2);
      });
    });
  }

  /* ---- 8. Mobile menu ---------------------------------------------------- */

  var menuBtn = document.getElementById("menu-btn");
  var mobileNav = document.getElementById("mobilenav");

  if (menuBtn && mobileNav) {
    mobileNav.hidden = false; /* CSS visibility takes over from here */

    function setMenu(open) {
      document.body.classList.toggle("menu-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "Close" : "Menu";
    }

    menuBtn.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("menu-open"));
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  /* ---- 9. Request form -------------------------------------------------- */

  var form = document.querySelector(".signup");
  if (form) {
    var input = form.querySelector("#email");
    var message = form.querySelector("#form-msg");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var value = input.value.trim();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

      if (!valid) {
        message.dataset.state = "error";
        message.textContent = "Enter a valid work email";
        input.focus();
        return;
      }

      message.dataset.state = "ok";
      message.textContent = "Received. We will be in touch.";
      input.value = "";
      input.disabled = true;
    });

    input.addEventListener("input", function () {
      if (message.textContent) {
        message.textContent = "";
        delete message.dataset.state;
      }
    });
  }
})();

