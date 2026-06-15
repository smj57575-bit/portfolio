$(function () {

  // ---------------------------
  // Main image mobile
  // ---------------------------
  const img = document.querySelector(".main_bg_img");
  if (!img) return;

  const desktop = img.dataset.srcDesktop || img.getAttribute("src");
  const mobile = img.dataset.srcMobile;
  if (!desktop || !mobile) return;

  const mql = window.matchMedia("(max-width: 768px)");
  const apply = () => img.src = mql.matches ? mobile : desktop;

  apply();
  mql.addEventListener ? mql.addEventListener("change", apply) : mql.addListener(apply);

  // Provide a safe no-op AOS so the client snippet can run even if AOS isn't included on this page.
  window.AOS = window.AOS || { init: function () {} };

  // ---------------------------
  // AOS init
  // ---------------------------
  $(window).load(function () {
    /* 모션 */
    AOS.init({
      easing: "ease-out",
      duration: 1000,
    });
    $.each($(".donateBtn"), function (k, v) {
      let _donateUrl = $(this).attr("href"),
      _thisParaM = window.location.search;
      $(this).attr("href", _donateUrl + "&" + _thisParaM.substring(1));
    });
  });

  // ---------------------------
  // Mobile: hide floating donate button
  // ---------------------------
  (function () {
    const btn = document.querySelector("#donate_btn_mobile.btn_floating");
    const sponsor = document.querySelector(".sponsor_section");
    if (!btn || !sponsor) return;

    let ticking = false;

    function update() {
      ticking = false;
      if (!mql.matches) {
        btn.classList.remove("is-hidden");
        return;
      }

      const sponsorRect = sponsor.getBoundingClientRect();
      const btnH = btn.offsetHeight || 56;
      const hideLine = window.innerHeight - (btnH + 20);
      const shouldHide = sponsorRect.top <= hideLine;
      btn.classList.toggle("is-hidden", shouldHide);
    }

    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    mql.addEventListener ? mql.addEventListener("change", update) : mql.addListener(update);
  })();
  // ---------------------------
  // FAQ accordion
  // ---------------------------
  var D = 260;
  var $faqRoot = $(".FAQ_section");

  if ($faqRoot.length) {
    $faqRoot.find(".faq_item.is_open").each(function () {
      $(this).find(".faq_q").attr("aria-expanded", "true");
      $(this).find(".faq_a").show();
    });

    $faqRoot.on("click", ".faq_q", function () {
      var $item = $(this).closest(".faq_item");
      var $a = $item.find(".faq_a");
      var isOpen = $item.hasClass("is_open");

      $faqRoot.find(".faq_item.is_open").not($item)
        .removeClass("is_open")
        .find(".faq_q").attr("aria-expanded", "false").end()
        .find(".faq_a").stop(true, true).slideUp(D);

      $item.toggleClass("is_open", !isOpen);
      $(this).attr("aria-expanded", isOpen ? "false" : "true");
      $a.stop(true, true)[isOpen ? "slideUp" : "slideDown"](D);
    });

  }

  // ---------------------------
  // Video play (YouTube embed)
  // ---------------------------
  $(document).on("click", "#video_play", function () {
    var $btn = $(this);
    var $media = $btn.closest(".video_card_media");
    var $iframe = $media.find(".video_iframe");

    var src = ($btn.attr("data-video-src") || "").trim();
    if (!src) return;

    if ($media.hasClass("is-playing")) {
      $iframe.attr("src", "");
      $media.removeClass("is-playing");
      $btn.attr("aria-label", "영상 재생");
      return;
    }

    function getYouTubeId(url) {
      try {
        // If it's already an ID
        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

        var u = new URL(url, window.location.href);

        // youtu.be/<id>
        if (u.hostname === "youtu.be") {
          var id1 = (u.pathname || "").split("/").filter(Boolean)[0];
          if (id1) return id1;
        }

        // youtube.com/watch?v=<id>
        var v = u.searchParams.get("v");
        if (v) return v;

        // youtube.com/embed/<id> or /shorts/<id>
        var parts = (u.pathname || "").split("/").filter(Boolean);
        var embedIdx = parts.indexOf("embed");
        if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
        var shortsIdx = parts.indexOf("shorts");
        if (shortsIdx >= 0 && parts[shortsIdx + 1]) return parts[shortsIdx + 1];
      } catch (e) {}
      return "";
    }

    var id = getYouTubeId(src);
    if (!id) id = "mXb4KonokLc"; // 넣고 싶은 영상 ID로 fallback
    
    var finalSrc =
      "https://www.youtube.com/embed/" +
      id +
      "?autoplay=1&mute=1&rel=0&playsinline=1" +
      "&origin=" + encodeURIComponent(window.location.origin);


    $iframe.attr("src", finalSrc);
    $media.addClass("is-playing");
    $btn.attr("aria-label", "영상 정지");
  });
  
  // ---------------------------
  // Scroll delay stagger reveal
  // ---------------------------
  (() => {
    const opt = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
    const groups = [];
  
    const isStat = el => el?.matches?.(".about2_stats .about2_stat");
    const clearTimer = el => {
      if (el?.__revealTimer) clearTimeout(el.__revealTimer);
      if (el) el.__revealTimer = null;
    };
  
    function animateCount(el, duration = 1400) {
      if (!el) return;
  
      el.dataset.original ??= (el.textContent || "").trim();
      if (el.__raf) cancelAnimationFrame(el.__raf);
  
      const m = el.dataset.original.trim().match(/^(\d[\d,]*)\s*(.*)$/);
      if (!m) return;
  
      const target = parseInt(m[1].replace(/,/g, ""), 10);
      if (!Number.isFinite(target) || target <= 0) return;
  
      const suffix = (m[2] || "").trim();
      const format = v => `${v}${suffix}`;
  
      let start = 0;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        el.textContent = format(Math.round(target * easeOutCubic(p)));
        el.__raf = p < 1 ? requestAnimationFrame(step) : null;
      };
  
      el.textContent = format(0);
      el.__raf = requestAnimationFrame(step);
    }
  
    function resetCount(el) {
      if (!el) return;
      if (el.__raf) cancelAnimationFrame(el.__raf);
      el.__raf = null;
      if (el.dataset.original) el.textContent = el.dataset.original;
    }
  
    function setCount(statEl, on) {
      const num = statEl?.querySelector?.(".about2_stat_num");
      on ? animateCount(num) : resetCount(num);
    }
  
    function staggerReveal(selector, delay, { once = true } = {}) {
      const els = Array.from(document.querySelectorAll(selector));
      if (!els.length) return;
  
      els.forEach((el, i) => (el.dataset.idx = i));
  
      const io = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          const idx = +target.dataset.idx || 0;
  
          if (isIntersecting) {
            if (once && target.dataset.revealed === "1") return;
  
            clearTimer(target);
            target.__isIn = true;
  
            target.__revealTimer = setTimeout(() => {
              clearTimer(target);
              if (!target.__isIn) return;
  
              target.classList.add("is-visible");
              if (isStat(target)) setCount(target, true);
  
              if (once) {
                target.dataset.revealed = "1";
                io.unobserve(target);
              }
            }, idx * delay);
          } else {
            target.__isIn = false;
            clearTimer(target);
  
            if (!once) {
              target.classList.remove("is-visible");
              if (isStat(target)) setCount(target, false);
            }
          }
        });
      }, opt);
  
      els.forEach(el => io.observe(el));
      groups.push({ els, io });
    }
  
    function resetGroup({ els, io }) {
      els.forEach(el => {
        clearTimer(el);
        el.__isIn = false;
  
        el.classList.remove("is-visible");
        if (isStat(el)) setCount(el, false);
  
        delete el.dataset.revealed;
        io.observe(el);
      });
    }
  
    (() => {
      let ticking = false;
      let edge = null;
  
      const atTop = () => (window.scrollY || window.pageYOffset || 0) <= 2;
      const atBottom = () => {
        const doc = document.documentElement;
        const y = (window.scrollY || window.pageYOffset || 0);
        const vh = window.innerHeight || doc.clientHeight || 0;
        const full = Math.max(doc.scrollHeight, doc.offsetHeight, 0);
        return y + vh >= full - 2;
      };
  
      const update = () => {
        ticking = false;
        if (!groups.length) return;
  
        const top = atTop();
        const bottom = atBottom();
  
        if (top && edge !== "top") {
          edge = "top";
          groups.forEach(resetGroup);
        } else if (bottom && edge !== "bottom") {
          edge = "bottom";
          groups.forEach(resetGroup);
        } else if (!top && !bottom) {
          edge = null;
        }
      };
  
      const onScrollOrResize = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      };
  
      update();
      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      window.addEventListener("resize", onScrollOrResize);
    })();
  
    staggerReveal(".content_section .content_card", 300, { once: true });
    staggerReveal(".about2_stats .about2_stat", 400, { once: true });
    staggerReveal(".about2_graph", 500, { once: true });
  })();



 // ---------------------------
  // Snowstorm
  // ---------------------------

  class SnowStorm {
    constructor() {
      this.flakesMax = 60;
      this.flakesMaxActive = 60;
      this.animationInterval = 40;
      this.excludeMobile = true;
      this.flakeBottom = null;
      this.followMouse = true;
      this.snowColor = '#fff';
      this.snowCharacter = '&bull;';
      this.snowStick = false;
      this.targetElement = null;
      this.useMeltEffect = true;
      this.useTwinkleEffect = false;
      this.usePositionFixed = false;
      this.freezeOnBlur = true;
      this.flakeLeftOffset = 0;
      this.flakeRightOffset = 0;
      this.flakeWidth = 10;
      this.flakeHeight = 10; 
      this.vMaxX = 2.5;
      this.vMaxY = 2.5;
      this.zIndex = 100000;
      this.isIE = navigator.userAgent.match(/msie/i) !== null;
      this.isMobile = navigator.userAgent.match(/mobile/i) !== null;
      this.noFixed = this.isMobile || this.isIE && document.compatMode === 'BackCompat' || navigator.userAgent.match(/msie 6/i) !== null;
      this.screenX = null;
      this.screenY = null;
      this.scrollY = null;
      this.vRndX = null;
      this.vRndY = null; 
      this.windOffset = 1;
      this.windMultiplier = 2;
      this.flakeTypes = 6;
      this.fixedForEverything = false;
      this.opacitySupported = (() => {
        try {
          document.createElement('div').style.opacity = '0.5';
        } catch (e) {
          return false;
        }
        return true;
      })();
      this.didInit = false;
      this.docFrag = document.createDocumentFragment();
      this.timers = [];
      this.flakes = [];
      this.disabled = false;
      this.active = false;
      this.meltFrameCount = 20;
      this.meltFrames = [];
      for (let i = 0; i < this.meltFrameCount; i++) {
        this.meltFrames.push(1 - (i / this.meltFrameCount));
      }
      this.init();
    }
  
    rnd(n, min = 0) {
      return Math.random() * n + min;
    }
  
    plusMinus(n) {
      return Math.floor(this.rnd(2)) === 1 ? n * -1 : n;
    }
  
    randomizeWind() {
      this.vRndX = this.plusMinus(this.rnd(this.vMaxX, 0.2));
      this.vRndY = this.rnd(this.vMaxY, 0.2);
      this.flakes.forEach(flake => {
        if (flake.active) {
          flake.setVelocities();
        }
      });
    }
  
    scrollHandler() {
      this.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (!this.fixedForEverything && !this.flakeBottom) {
        this.flakes.forEach(flake => {
          if (flake.active === 0) {
            flake.stick();
          }
        });
      }
    }
  
    resizeHandler() {
      this.screenX = window.innerWidth - 16 - this.flakeRightOffset;
      this.screenY = this.flakeBottom || window.innerHeight;
    }
  
    freeze() {
      if (!this.disabled) {
        this.disabled = true;
        this.timers.forEach(timer => clearInterval(timer));
      }
    }
  
    resume() {
      if (this.disabled) {
        this.disabled = false;
        this.timerInit();
      }
    }
  
    toggleSnow() {
      if (!this.flakes.length) {
        this.start();
      } else {
        this.active = !this.active;
        if (this.active) {
          this.show();
          this.resume();
        } else {
          this.stop();
          this.freeze();
        }
      }
    }
  
    stop() {
      this.freeze();
      this.flakes.forEach(flake => {
        flake.element.style.display = 'none';
      });
      window.removeEventListener('scroll', this.scrollHandler);
      window.removeEventListener('resize', this.resizeHandler);
      if (this.freezeOnBlur) {
        if (this.isIE) {
          document.removeEventListener('focusout', this.freeze);
          document.removeEventListener('focusin', this.resume);
        } else {
          window.removeEventListener('blur', this.freeze);
          window.removeEventListener('focus', this.resume);
        }
      }
    }
  
    show() {
      this.flakes.forEach(flake => {
        flake.element.style.display = 'block';
      });
    }
  
    createSnow(limit, allowInactive) {
      let fragment = document.createDocumentFragment(); // Create a document fragment
      
      for (let i = 0; i < limit; i++) {
          let flake = new SnowFlake(this, parseInt(Math.random() * this.flakeTypes), undefined, undefined);
          this.flakes.push(flake);
          fragment.appendChild(flake.element); // Add to fragment instead of directly to body
          if (!allowInactive && i > this.flakesMaxActive) {
              flake.active = -1;
          }
      }
  
      document.body.appendChild(fragment); // Append the fragment to the body
  }
  
    timerInit() {
      this.timers = [setInterval(() => this.snow(), this.animationInterval)];
    }
  
    init() {
      this.randomizeWind();
      this.createSnow(this.flakesMax, false);
      window.addEventListener('resize', () => this.resizeHandler());
      window.addEventListener('scroll', () => this.scrollHandler());
      if (this.followMouse) {
        (this.isIE ? document : window).addEventListener('mousemove', e => this.mouseMove(e));
      }
      this.resizeHandler();
      this.scrollHandler();
      this.timerInit();
    }
  
    start() {
      if (!this.didInit) {
        this.didInit = true;
      }
      if (typeof this.targetElement === 'string') {
        const targetID = this.targetElement;
        this.targetElement = document.getElementById(targetID);
        if (!this.targetElement) {
          throw new Error(`Snowstorm: Unable to get targetElement "${targetID}"`);
        }
      }
      if (!this.targetElement) {
        this.targetElement = document.body;
      }
      this.usePositionFixed = this.usePositionFixed && !this.noFixed;
      this.fixedForEverything = this.usePositionFixed;
      if (this.screenX && this.screenY && !this.disabled) {
        this.init();
        this.active = true;
      }
    }
  
    mouseMove(e) {
      if (!this.followMouse) {
        return;
      }
      let x = e.clientX;
      if (x < window.innerWidth / 2) {
        this.windOffset = -this.windMultiplier + (x / (window.innerWidth / 2) * this.windMultiplier);
      } else {
        x -= window.innerWidth / 2;
        this.windOffset = (x / (window.innerWidth / 2)) * this.windMultiplier;
      }
    }
  
    snow() {
      let active = 0;
      let waiting = 0;
      this.flakes.forEach(flake => {
        if (flake.active === 1) {
          flake.move();
          active++;
        } else if (flake.active === 0) {
          waiting++;
        }
        if (flake.melting) {
          flake.melt();
        }
      });
      if (active < this.flakesMaxActive) {
        const flake = this.flakes[Math.floor(this.rnd(this.flakes.length))];
        if (flake.active === 0) {
          flake.melting = true;
        }
      }
    }
  }
  
  class SnowFlake {
    constructor(parent, type, x, y) {
      this.parent = parent;
      this.type = type;
      this.x = x || Math.floor(Math.random() * (window.innerWidth - 20));
      this.y = y !== undefined ? y : -Math.floor(Math.random() * (window.innerHeight + 12));
      this.vX = null;
      this.vY = null;
      this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8];
      this.vAmp = this.vAmpTypes[this.type];
      this.melting = false;
      this.meltFrame = 0;
      this.twinkleFrame = 0;
      this.active = 1;
      // Keep glyph size aligned with the flake box to avoid clipping.
      this.fontSize = Math.max(8, parent.flakeHeight);
      this.element = document.createElement('div');
      this.element.innerHTML = parent.snowCharacter;
      this.element.style.color = parent.snowColor;
      this.element.style.position = 'absolute';
      this.element.style.width = `${parent.flakeWidth}px`;
      this.element.style.height = `${parent.flakeHeight}px`;
      this.element.style.fontFamily = 'arial, verdana';
      this.element.style.overflow = 'visible';
      this.element.style.fontWeight = 'normal';
      this.element.style.zIndex = parent.zIndex;
      this.element.style.fontSize = `${this.fontSize}px`;
      this.element.style.lineHeight = `${parent.flakeHeight}px`;
      this.element.style.textAlign = 'center';
      //docFrag.appendChild(this.element);
      //document.body.appendChild(this.element);
      this.refresh();
      this.recycle();
    }
  
    refresh() {
      if (!isNaN(this.x) && !isNaN(this.y)) {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
      }
    }
  
    stick() {
      if (this.parent.noFixed || (this.parent.targetElement !== document.documentElement && this.parent.targetElement !== document.body)) {
        this.element.style.top = `${window.innerHeight + window.scrollY - this.parent.flakeHeight}px`;
      } else if (this.parent.flakeBottom) {
        this.element.style.top = `${this.parent.flakeBottom}px`;
      } else {
        this.element.style.display = 'none';
        this.element.style.top = 'auto';
        this.element.style.bottom = '0px';
        this.element.style.position = 'fixed';
        this.element.style.display = 'block';
      }
    }
  
    vCheck() {
      if (this.vX >= 0 && this.vX < 0.2) {
        this.vX = 0.2;
      } else if (this.vX < 0 && this.vX > -0.2) {
        this.vX = -0.2;
      }
      if (this.vY >= 0 && this.vY < 0.2) {
        this.vY = 0.2;
      }
    }
  
    move() {
      
      const vX = this.vX * this.parent.windOffset;
      this.x += vX;
      this.y += this.vY * this.vAmp;
      if (this.x >= window.innerWidth || window.innerWidth - this.x < this.parent.flakeWidth) {
        this.x = 0;
      } else if (vX < 0 && this.x < -this.parent.flakeWidth) {
        this.x = window.innerWidth - this.parent.flakeWidth - 1;
      }
      this.refresh();
      const yDiff = window.innerHeight + window.scrollY - this.y;
      if (yDiff < this.parent.flakeHeight) {
        this.active = 0;
        if (this.parent.snowStick) {
          this.stick();
        } else {
          this.recycle();
        }
      } else {
        if (this.parent.useMeltEffect && this.active && this.type < 3 && !this.melting && Math.random() > 0.998) {
          this.melting = true;
          this.melt();
        }
        if (this.parent.useTwinkleEffect) {
          if (!this.twinkleFrame) {
            if (Math.random() > 0.9) {
              this.twinkleFrame = Math.floor(Math.random() * 20);
            }
          } else {
            this.twinkleFrame--;
            this.element.style.visibility = (this.twinkleFrame && this.twinkleFrame % 2 === 0 ? 'hidden' : 'visible');
          }
        }
      }
    }
  
    animate() {
      this.move();
    }
  
    setVelocities() {
      this.vX = this.parent.vRndX + Math.random() * (this.parent.vMaxX * 0.12) + 0.1;
      this.vY = this.parent.vRndY + Math.random() * (this.parent.vMaxY * 0.12) + 0.1;
    }
  
    setOpacity(o, opacity) {
      if (!this.parent.opacitySupported) {
        return false;
      }
      o.style.opacity = opacity;
    }
  
    melt() {
      if (!this.parent.useMeltEffect || !this.melting) {
        this.recycle();
      } else {
        if (this.meltFrame < this.parent.meltFrameCount) {
          this.meltFrame++;
          this.setOpacity(this.element, this.parent.meltFrames[this.meltFrame]);
          this.element.style.fontSize = `${this.fontSize - (this.fontSize * (this.meltFrame / this.parent.meltFrameCount))}px`;
          this.element.style.lineHeight = `${this.parent.flakeHeight + 2 + (this.parent.flakeHeight * 0.75 * (this.meltFrame / this.parent.meltFrameCount))}px`;
        } else {
          this.recycle();
        }
      }
    }
  
    recycle() {
      this.element.style.display = 'none';
      this.element.style.position = 'absolute';
      this.element.style.bottom = 'auto';
      this.setVelocities();
      this.vCheck();
      this.meltFrame = 0;
      this.melting = false;
      this.setOpacity(this.element, 1);
      this.element.style.padding = '0px';
      this.element.style.margin = '0px';
      this.element.style.fontSize = `${Math.max(8, this.parent.flakeHeight)}px`;
      this.element.style.lineHeight = `${this.parent.flakeHeight}px`;
      this.element.style.textAlign = 'center';
      this.element.style.verticalAlign = 'baseline';
      this.x = Math.floor(Math.random() * (window.innerWidth - this.parent.flakeWidth - 20));
      this.y = -Math.floor(Math.random() * window.innerHeight) - this.parent.flakeHeight;
      this.refresh();
      this.element.style.display = 'block';
      this.active = 1;
    }
  }
  
 
  const snowStorm = new SnowStorm();
  snowStorm.targetElement = document.querySelector('.main_section');

 
  snowStorm.flakesMax = 35;
  snowStorm.flakesMaxActive = 25;
  snowStorm.animationInterval = 21;
  snowStorm.vMaxX = 0.8;  
  snowStorm.vMaxY = 1.2;
  snowStorm.followMouse = false; 
  snowStorm.snowColor = "rgba(255,255,255,0.75)"; 
  snowStorm.flakeWidth = 20;
  snowStorm.flakeHeight = 20;

  // Mobile: reduce density
  if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) {
    snowStorm.flakesMax = 20;
    snowStorm.flakesMaxActive = 14;
    snowStorm.animationInterval = 30; // slower on mobile
    snowStorm.vMaxY = 0.9; // fall a bit slower
  }

  // Override resize handler to limit snow to main section
  const originalResize = snowStorm.resizeHandler;
  snowStorm.resizeHandler = function() {
    const mainSection = document.querySelector('.main_section');
    if (mainSection) {
      const rect = mainSection.getBoundingClientRect();
      this.screenX = rect.width - 16 - this.flakeRightOffset;
      this.screenY = rect.height;
      this.flakeLeftOffset = rect.left;
    } else {
      originalResize.call(this);
    }
  };

  // Use original snow logic but limit flake spawning to main section
  snowStorm.createSnow = function(limit, allowInactive) {
    const mainSection = document.querySelector('.main_section');
    if (!mainSection) {
      // Fallback to original if main section not found
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < limit; i++) {
        let flake = new SnowFlake(this, parseInt(Math.random() * this.flakeTypes), undefined, undefined);
        this.flakes.push(flake);
        fragment.appendChild(flake.element);
        if (!allowInactive && i > this.flakesMaxActive) {
          flake.active = -1;
        }
      }
      document.body.appendChild(fragment);
      return;
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < limit; i++) {
      // Create flakes within main section bounds
      const rect = mainSection.getBoundingClientRect();
      const x = rect.left + Math.floor(Math.random() * (rect.width - this.flakeWidth - 20));
      const y = rect.top + window.scrollY - Math.floor(Math.random() * window.innerHeight) - this.flakeHeight;

      let flake = new SnowFlake(this, parseInt(Math.random() * this.flakeTypes), x, y);
      this.flakes.push(flake);
      fragment.appendChild(flake.element);
      if (!allowInactive && i > this.flakesMaxActive) {
        flake.active = -1;
      }
    }
    document.body.appendChild(fragment);
  };

  // Override flake movement to stay within bounds
  const originalMove = SnowFlake.prototype.move;
  SnowFlake.prototype.move = function() {
    const mainSection = document.querySelector('.main_section');
    if (!mainSection) {
      originalMove.call(this);
      return;
    }

    const rect = mainSection.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionBottom = rect.bottom + window.scrollY;
    const sectionLeft = rect.left;
    const sectionRight = rect.right;

    const vX = this.vX * this.parent.windOffset;
    this.x += vX;
    this.y += this.vY * this.vAmp;

    // Keep snow within main section bounds
    if (this.x >= sectionRight || sectionRight - this.x < this.parent.flakeWidth) {
      this.x = sectionLeft;
    } else if (vX < 0 && this.x < sectionLeft) {
      this.x = sectionRight - this.parent.flakeWidth - 1;
    }

    this.refresh();

    // Recycle snow back to top instead of deactivating
    if (this.y > sectionBottom) {
      this.y = sectionTop - this.parent.flakeHeight;
      this.x = sectionLeft + Math.floor(Math.random() * (sectionRight - sectionLeft - this.parent.flakeWidth));
    } else {
      if (this.parent.useMeltEffect && this.active && this.type < 3 && !this.melting && Math.random() > 0.998) {
        this.melting = true;
        this.melt();
      }
      if (this.parent.useTwinkleEffect) {
        if (!this.twinkleFrame) {
          if (Math.random() > 0.9) {
            this.twinkleFrame = Math.floor(Math.random() * 20);
          }
        } else {
          this.twinkleFrame--;
          this.element.style.visibility = (this.twinkleFrame && this.twinkleFrame % 2 === 0 ? 'hidden' : 'visible');
        }
      }
    }
  };

  // Override flake recycle to reset within main section
  const originalRecycle = SnowFlake.prototype.recycle;
  SnowFlake.prototype.recycle = function() {
    const mainSection = document.querySelector('.main_section');
    if (mainSection) {
      const rect = mainSection.getBoundingClientRect();
      this.x = rect.left + Math.floor(Math.random() * (rect.width - this.parent.flakeWidth - 20));
      this.y = rect.top + window.scrollY - Math.floor(Math.random() * window.innerHeight) - this.parent.flakeHeight;
    } else {
      originalRecycle.call(this);
      return;
    }

    this.element.style.display = 'none';
    this.element.style.position = 'absolute';
    this.element.style.bottom = 'auto';
    this.setVelocities();
    this.vCheck();
    this.meltFrame = 0;
    this.melting = false;
    this.setOpacity(this.element, 1);
    this.element.style.padding = '0px';
    this.element.style.margin = '0px';
    this.element.style.fontSize = `${this.fontSize}px`;
    this.element.style.lineHeight = `${this.parent.flakeHeight + 2}px`;
    this.element.style.textAlign = 'center';
    this.element.style.verticalAlign = 'baseline';
    this.refresh();
    this.element.style.display = 'block';
    this.active = 1;
  };

  snowStorm.start();

});

 