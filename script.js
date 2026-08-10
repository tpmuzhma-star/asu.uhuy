/* ============================================================
   $WSC — World Slapping Cat
   script.js — semua data & logic terpisah dari markup & CSS.
   ============================================================ */

const PAW_SVG = `
<svg viewBox="0 0 220 220" aria-hidden="true">
  <path d="M110,210 L150,120 L96,20" stroke="#0A0A0B" stroke-width="58" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <ellipse cx="96" cy="34" rx="58" ry="52" fill="#0A0A0B" transform="rotate(-18 96 34)" />
</svg>`;

/* ---------------------- data ---------------------- */
const TICKER_ITEMS = ["$WSC", "WORLD SLAPPING CAT", "THE CAT IS SLAPPING", "ROBINHOOD CHAIN", "$WSC", "NO CAT LEFT UNSLAPPED"];

const LORE_EVENTS = [

];

const TOKEN_META = [

];

// percent: null = belum final, tampilkan pola "coming soon"
const ALLOCATION = [
];

const ROADMAP = [
  { n: "01", title: "The First Slap", items: ["Launch $WSC", "Build the community", "Release the official mascot"] },
  { n: "02", title: "Slap the Internet", items: ["Memes", "Social campaigns", "Community challenges", "Meme contests"] },
  { n: "03", title: "Slap the World", items: ["Global community", "Merchandise", "Collaborations", "Community events"] },
];

// url: null = belum live, tampil sebagai badge "Soon"
const SOCIALS = [
  { key: "twitter", label: "X / Twitter", url: null, icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>` },
 
];

const ARCHIVE_CAPTIONS = [
];

const SLAP_CAPTIONS = [
  "SLAPPED.",
  "DIRECT HIT.",
  "THE WORLD FELT THAT.",
  "NO MERCY.",
  "ANOTHER ONE DOWN.",
  "GRAVITY? ALSO SLAPPED.",
  "CATASTROPHIC.",
];

/* ---------------------- render helpers ---------------------- */
function renderTicker() {
  const track = document.getElementById("tickerTrack");
  const buildSet = () =>
    TICKER_ITEMS.map((item) => `<span class="ticker-item font-display">${item}<span class="dot">✦</span></span>`).join("");
  track.innerHTML = `<div class="ticker-set">${buildSet()}</div><div class="ticker-set">${buildSet()}</div>`;
}

function renderLore() {
  const list = document.getElementById("loreList");
  list.innerHTML = LORE_EVENTS.map(
    (e, i) => `
    <li class="lore-item wsc-reveal" data-reveal data-delay="${i * 60}">
      <span class="lore-num font-display">${e.n}</span>
      <div class="lore-card" style="transform: rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)">
        <h3 class="font-display">${e.title}</h3>
        <p>${e.body}</p>
      </div>
    </li>`
  ).join("");
}

function renderStats() {
  const grid = document.getElementById("statGrid");
  grid.innerHTML = TOKEN_META.map((m) => {
    const pending = m.value === "COMING SOON";
    return `
    <div class="stat-card">
      <p class="stat-label">${m.label}</p>
      <p class="stat-value ${pending ? "pending" : "ready"}">${m.value}</p>
    </div>`;
  }).join("");
}

function renderAllocation() {
  const list = document.getElementById("allocList");
  const allLocked = ALLOCATION.every((a) => typeof a.percent === "number");
  document.getElementById("allocNote").style.display = allLocked ? "none" : "block";

  list.innerHTML = ALLOCATION.map((a, i) => {
    const pending = a.percent === null;
    return `
    <div class="alloc-row wsc-reveal" data-reveal data-delay="${i * 60}">
      <div class="alloc-top font-display">
        <span class="name">${a.label}</span>
        <span class="pct ${pending ? "pending" : ""}">${pending ? "Coming soon" : a.percent + "%"}</span>
      </div>
      <div class="alloc-bar">
        ${pending
          ? `<div class="alloc-bar-pending"></div>`
          : `<div class="alloc-bar-fill" data-fill="${a.percent}"></div>`}
      </div>
    </div>`;
  }).join("");
}

function renderRoadmap() {
  const grid = document.getElementById("roadmapGrid");
  grid.innerHTML = ROADMAP.map(
    (phase, i) => `
    <div class="roadmap-card wsc-reveal" data-reveal data-delay="${i * 80}">
      <span class="num font-display">${phase.n}</span>
      <h3 class="font-display">${phase.title}</h3>
      <ul>
        ${phase.items.map((item) => `<li><span class="bullet"></span>${item}</li>`).join("")}
      </ul>
    </div>`
  ).join("");
}

function renderCommunity() {
  const cta = document.getElementById("communityCta");
  const anyLive = SOCIALS.some((s) => s.url);
  cta.innerHTML = SOCIALS.map((s) =>
    s.url
      ? `<a href="${s.url}" class="btn btn-outline font-display">${s.icon} ${s.label}</a>`
      : `<span class="btn-disabled font-display">${s.icon} ${s.label} · Soon</span>`
  ).join("");
  document.getElementById("communityNote").style.display = anyLive ? "none" : "block";
}

function renderFooterSocials() {
  const wrap = document.getElementById("footerSocials");
  wrap.innerHTML = SOCIALS.filter((s) => s.url)
    .map((s) => `<a href="${s.url}" aria-label="${s.label}">${s.icon}</a>`)
    .join("");
}

function renderArchive() {
  const grid = document.getElementById("archiveGrid");
  const rotations = [-3, 2, -2, 3, -2.5, 2.5];
  grid.innerHTML = ARCHIVE_CAPTIONS.map((caption, i) => {
    const rotate = rotations[i % rotations.length];
    return `
    <div class="archive-card" style="transform: rotate(${rotate}deg)">
      <div class="archive-icon">${PAW_SVG}</div>
      <p class="archive-caption font-display">${caption}</p>
    </div>`;
  }).join("");
}

/* ---------------------- scroll reveal ---------------------- */
function initReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  els.forEach((el) => {
    const delay = el.getAttribute("data-delay");
    if (delay) el.style.transitionDelay = `${delay}ms`;
    obs.observe(el);
  });
}

function initAllocationBars() {
  const fills = document.querySelectorAll(".alloc-bar-fill[data-fill]");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.fill + "%";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  fills.forEach((el) => obs.observe(el));
}

/* ---------------------- navbar ---------------------- */
function initNavbar() {
  const nav = document.getElementById("navbar");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------------------- hero video parallax ---------------------- */
function initHeroTilt() {
  const hero = document.getElementById("top");
  const bg = document.getElementById("heroVideoBg");
  if (!hero || !bg) return;

  // Only run on devices with a fine pointer (desktop/mouse) — skip on touch devices
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  if (!hasFinePointer) return;

  hero.addEventListener("mousemove", (e) => {
    const box = hero.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * 2 - 1;
    const y = ((e.clientY - box.top) / box.height) * 2 - 1;
    bg.style.transform = `scale(1.06) translate(${x * -10}px, ${y * -8}px)`;
  });
}

/* ---------------------- slap counter + sound ---------------------- */
function initSlapCounter() {
  const btn = document.getElementById("slapBtn");
  const wrap = document.getElementById("slapBtnWrap");
  const countEl = document.getElementById("slapCount");
  const section = document.getElementById("slapSection");
  const muteBtn = document.getElementById("muteBtn");
  const volIcon = document.getElementById("volIcon");

  let count = 0;
  let muted = false;
  let audioCtx = null;

  const VOL_ON = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
  const VOL_OFF = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

  muteBtn.addEventListener("click", () => {
    muted = !muted;
    volIcon.outerHTML = muted ? VOL_OFF : VOL_ON;
    muteBtn.setAttribute("aria-label", muted ? "Unmute slap sound" : "Mute slap sound");
  });

  function playSlap() {
    if (muted) return;
    try {
      audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const t = audioCtx.currentTime;

      const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.15, audioCtx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const noise = audioCtx.createBufferSource();
      noise.buffer = noiseBuffer;
      const bandpass = audioCtx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.value = 1800;
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.9, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      noise.connect(bandpass).connect(noiseGain).connect(audioCtx.destination);

      const osc = audioCtx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(50, t + 0.12);
      const oscGain = audioCtx.createGain();
      oscGain.gain.setValueAtTime(0.6, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.connect(oscGain).connect(audioCtx.destination);

      noise.start(t); noise.stop(t + 0.15);
      osc.start(t); osc.stop(t + 0.16);
    } catch {
      /* audio unsupported — fail silently */
    }
  }

  btn.addEventListener("click", () => {
    count += 1;
    countEl.textContent = String(count).padStart(6, "0");

    // paw pop
    const oldPaw = wrap.querySelector(".slap-paw");
    if (oldPaw) oldPaw.remove();
    const paw = document.createElement("div");
    paw.className = "slap-paw";
    paw.innerHTML = PAW_SVG;
    wrap.appendChild(paw);

    // caption pop
    const oldCap = wrap.querySelector(".slap-caption");
    if (oldCap) oldCap.remove();
    const cap = document.createElement("p");
    cap.className = "slap-caption font-display";
    cap.textContent = SLAP_CAPTIONS[Math.floor(Math.random() * SLAP_CAPTIONS.length)];
    wrap.appendChild(cap);

    // shake section
    section.classList.remove("shaking");
    void section.offsetWidth; // force reflow to restart animation
    section.classList.add("shaking");
    window.setTimeout(() => section.classList.remove("shaking"), 500);

    playSlap();
  });
}

/* ---------------------- init ---------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderTicker();
  renderLore();
  renderStats();
  renderAllocation();
  renderRoadmap();
  renderCommunity();
  renderFooterSocials();
  renderArchive();

  document.getElementById("copyrightYear").textContent =
    `© ${new Date().getFullYear()} World Slapping Cat. No cat left unslapped.`;

  initNavbar();
  initHeroTilt();
  initReveal();
  initAllocationBars();
  initSlapCounter();
});
