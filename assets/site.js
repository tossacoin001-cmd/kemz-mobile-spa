/* ===== EDIT YOUR BUSINESS DETAILS HERE ===== */
const KEMZ = {
  whatsapp: "2348143870957",          // international format, no "+" or spaces
  // Prices in naira (per person). Change any number and the site + WhatsApp messages update.
  prices: {
    basic: 75000,      // Basic Pampering: 60-min massage + facial
    deluxe: 130000,    // Deluxe Rejuvenation: 90-min massage + facial + body scrub
    ultimate: 180000   // Ultimate: massage, facial, scrub, waxing, mani & pedi
  },
  // "From" prices shown on each treatment card
  from: { massage: 40000, facial: 35000, scrub: 40000, nails: 20000 },
  gallery: [
    ["images/g-hot-stones.jpg", "Hot stone massage with orchids"],
    ["images/g-stone-therapy.jpg", "Stone therapy along the spine"],
    ["images/g-relax.jpg", "Client relaxing on a massage table with warm stones and candle"],
    ["images/g-oil.jpg", "Warm massage oil being poured"],
    ["images/g-manicure.jpg", "Soft nude manicure"],
    ["images/g-essentials.jpg", "Spa towel, lotion and candle"]
  ]
};
/* =========================================== */

(function(){
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => [...el.querySelectorAll(s)];
  const naira = n => "\u20A6" + Number(n).toLocaleString("en-NG");
  const P = KEMZ.prices, F = KEMZ.from;
  const ask = "Preferred date: \nPreferred time: \nLocation (area / home / hotel): \n\nPlease confirm availability. Thank you!";
  const BOOK = {
    general:  "Hello Kemz Mobile Spa! I'd like to book a spa session at my location.\n\nTreatment: \n" + ask,
    massage:  `Hello Kemz Mobile Spa! I'd like to book a MASSAGE (from ${naira(F.massage)}).\n\nType: Swedish / Deep tissue / Aromatherapy\nDuration: 60 / 90 mins\n` + ask,
    facial:   `Hello Kemz Mobile Spa! I'd like to book a FACIAL (from ${naira(F.facial)}).\n\nMy skin type / concern: \n` + ask,
    scrub:    `Hello Kemz Mobile Spa! I'd like to book a BODY SCRUB / WRAP (from ${naira(F.scrub)}).\n\n` + ask,
    nails:    `Hello Kemz Mobile Spa! I'd like to book NAIL CARE (from ${naira(F.nails)}).\n\nService: Manicure / Pedicure / Mani-pedi\n` + ask,
    basic:    `Hello Kemz Mobile Spa! I'd like to book the BASIC PAMPERING PACKAGE (${naira(P.basic)}): 60-min massage + facial.\n\nNumber of people: 1\n` + ask,
    deluxe:   `Hello Kemz Mobile Spa! I'd like to book the DELUXE REJUVENATION PACKAGE (${naira(P.deluxe)}): 90-min massage, facial + body scrub.\n\nNumber of people: 1\n` + ask,
    ultimate: `Hello Kemz Mobile Spa! I'd like to book the ULTIMATE SPA EXPERIENCE (${naira(P.ultimate)}): massage, facial, body scrub, waxing + mani-pedi.\n\nNumber of people: 1\n` + ask,
    occasion: "Hello Kemz Mobile Spa! I'd like to plan a spa session for an OCCASION.\n\nOccasion (birthday / bridal shower / girls' day in / other): \nNumber of guests: \nTreatments wanted: \nDate: \nTime: \nVenue / location: \n\nPlease send me a quote. Thank you!"
  };
  const wa = msg => `https://wa.me/${KEMZ.whatsapp}?text=${encodeURIComponent(msg)}`;
  $$("[data-book]").forEach(a => {
    let msg = BOOK[a.dataset.book] || BOOK.general;
    if (a.dataset.occasion) msg = msg.replace("Occasion (birthday / bridal shower / girls' day in / other): ", "Occasion: " + a.dataset.occasion);
    a.href = wa(msg);
    a.target = "_blank"; a.rel = "noopener";
  });
  $$("#yr").forEach(e => e.textContent = new Date().getFullYear());

  // prices
  for (const [k,v] of Object.entries(P)) { const el = $(`[data-price="${k}"]`); if (el && v) el.innerHTML = `${naira(v)} <small>/ person</small>`; }
  for (const [k,v] of Object.entries(F)) { const el = $(`[data-from="${k}"]`); if (el && v) el.textContent = `From ${naira(v)}`; }
  const priceOf = {"Basic Pampering Package":P.basic,"Deluxe Rejuvenation Package":P.deluxe,"Ultimate Spa Experience":P.ultimate,"Massage":F.massage,"Facial":F.facial,"Body scrub / wrap":F.scrub,"Manicure / Pedicure":F.nails};
  $$("#service option").forEach(o => { o.value = o.value; const v = priceOf[o.value]; if (v) o.textContent = `${o.value}: ${o.parentElement.label === "Packages" ? "" : "from "}${naira(v)}`; });
  // gallery
  if (KEMZ.gallery.length && $("#gallery")) {
    const g = $("#gallery"); g.hidden = false;
    $(".gallery-grid", g).innerHTML = KEMZ.gallery.map(([src,alt]) => `<img src="${src}" alt="${alt}" loading="lazy" width="585" height="585">`).join("");
  }

  // header
  const header = $("header");
  const onScroll = () => { if (!document.body.classList.contains("lock")) header.classList.toggle("scrolled", window.scrollY > 30); };
  onScroll(); window.addEventListener("scroll", onScroll, {passive:true});

  // mobile menu (locks background scroll while open)
  const btn = $(".menu-btn"), menu = $("#menu");
  const backdrop = document.createElement("div"); backdrop.className = "nav-backdrop"; document.body.appendChild(backdrop);
  let lockY = 0;
  const setMenu = open => {
    if (open === menu.classList.contains("open")) return;
    menu.classList.toggle("open", open); header.classList.toggle("menu-open", open); backdrop.classList.toggle("show", open);
    btn.setAttribute("aria-expanded", open); btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    btn.innerHTML = open
      ? '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'
      : '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    if (open) {
      lockY = window.scrollY;
      document.body.style.top = `-${lockY}px`;
      document.documentElement.classList.add("lock"); document.body.classList.add("lock");
    } else {
      document.documentElement.classList.remove("lock"); document.body.classList.remove("lock");
      document.body.style.top = "";
      const root = document.documentElement, prev = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto"; window.scrollTo(0, lockY); root.style.scrollBehavior = prev;
    }
  };
  btn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  backdrop.addEventListener("click", () => setMenu(false));
  backdrop.addEventListener("touchmove", e => e.preventDefault(), {passive:false});
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 820) setMenu(false); });
  $$("#menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));

  if ($("#date")) {
  // date min = today
  const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  $("#date").min = d.toISOString().slice(0,10);

  }
  // reveal on scroll
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.12, rootMargin:"0px 0px -40px 0px"});
    $$(".reveal").forEach(el => io.observe(el));
  } else $$(".reveal").forEach(el => el.classList.add("in"));

  const form = $("form[name=booking]");
  if (form) {
  // booking form → Netlify Forms (when hosted) + WhatsApp message
  const fmtDate = v => { try { return new Date(v + "T12:00").toLocaleDateString("en-GB", {weekday:"short", day:"numeric", month:"short", year:"numeric"}); } catch(e) { return v; } };
  form.addEventListener("submit", async e => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach(inp => {
      const bad = !inp.value.trim() || (inp.id === "phone" && inp.value.replace(/\D/g,"").length < 7);
      inp.closest(".field").classList.toggle("invalid", bad);
      if (bad && ok) { inp.focus(); ok = false; }
    });
    if (!ok) return;
    const f = Object.fromEntries(new FormData(form));
    if (f.company) return; // bot
    const msg = [
      "Hello Kemz Mobile Spa! I'd like to book a spa session at my location.",
      "",
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      `Treatment: ${f.service}${priceOf[f.service] ? " (" + (/Package|Experience/.test(f.service) ? "" : "from ") + naira(priceOf[f.service]) + ")" : ""}`,
      `Date: ${fmtDate(f.date)}`,
      `Time: ${f.time}`,
      `Location: ${f.location}`,
      f.notes ? `Notes: ${f.notes}` : ""
    ].filter(Boolean).join("\n");
    const url = `https://wa.me/${KEMZ.whatsapp}?text=${encodeURIComponent(msg)}`;
    $("#waSend").href = url;
    // save lead to Netlify Forms (silently ignored if not on Netlify)
    try { await fetch("/", {method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:new URLSearchParams(new FormData(form)).toString()}); } catch(err) {}
    $("#formFields").hidden = true;
    $("#done").classList.add("show");
    try { const w = window.open(url, "_blank", "noopener"); } catch(err) {}
  });
  $$("input,select", form).forEach(i => i.addEventListener("input", () => i.closest(".field")?.classList.remove("invalid")));
  $("#editBooking").addEventListener("click", e => { e.preventDefault(); $("#formFields").hidden = false; $("#done").classList.remove("show"); });
  }
})();
