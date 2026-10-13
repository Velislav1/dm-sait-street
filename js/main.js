const eur = n => n + " €";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
const here = location.pathname.split("/").pop() || "index.html";
const cur = here + location.search;

/* ---------- storage (безопасно) ---------- */
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
let cart = store.get("ad-cart", []).filter(id => PRODUCTS.some(p => p.id === id && p.status !== "sold"));
let favs = store.get("ad-fav", []);
const byId = id => PRODUCTS.find(p => p.id == id);

/* ---------- header / footer ---------- */
const MARQUEE = "Нови дропове всяка седмица · Оригинални марки · Всяка дреха е 1 от 1 · Доставка с куриер в цяла България · Проверка преди плащане";
const marqueeHTML = `<div class="marquee"><div class="track">${Array(8).fill(`<span>${MARQUEE.split(" · ").join("</span><span>")}</span>`).join("")}</div></div>`;
const links = [["index.html", "Начало"], ["shop.html?g=m", "Мъжко"], ["shop.html?g=w", "Дамско"], ["shop.html", "Всички"], ["about.html", "За нас"], ["contact.html", "Контакти"]];

$("#site-header").outerHTML = `${marqueeHTML}
<header class="site"><div class="container nav">
  <a href="index.html" class="logo" aria-label="Avanti Drip"><img class="lg-d" src="img/logo.png" alt="Avanti Drip"><img class="lg-l" src="img/logo-light.png" alt="Avanti Drip"></a>
  <ul>${links.map(([h, t]) => `<li><a href="${h}"${h === cur ? ' class="active"' : ""}>${t}</a></li>`).join("")}</ul>
  <div class="nav-right">
    <button class="icon-btn" id="theme-btn" aria-label="Смени тема">🌙</button>
    <a class="icon-btn has-n" href="shop.html?fav=1" aria-label="Любими">♥<i id="fav-n"></i></a>
    <button class="icon-btn has-n" id="cart-btn" aria-label="Кошница">🛍<i id="cart-n"></i></button>
    <button class="icon-btn menu-btn" aria-label="Меню">☰</button>
  </div>
  <div class="progress" id="progress"></div>
</div></header>
<div class="overlay" id="overlay"></div>
<aside class="drawer" id="drawer" aria-label="Кошница"></aside>
<div class="toast" id="toast"></div>`;

$("#site-footer").outerHTML = `<footer class="site"><div class="container">
  <div class="foot">
    <div><img class="fl" src="img/logo-light.png" alt="Avanti Drip"><p>Оригинални спортни и streetwear дрехи втора употреба. Подбрани на ръка, проверени и готови за нов живот.</p>
      <div class="socials"><a href="${CONTACT.instagram}" target="_blank" rel="noopener" aria-label="Instagram">IG</a><a href="${CONTACT.facebook}" target="_blank" rel="noopener" aria-label="Facebook">FB</a><a href="${CONTACT.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">TT</a></div></div>
    <div><h4>Навигация</h4><ul>${links.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
    <div><h4>Категории</h4><ul>${CATEGORIES.map(c => `<li><a href="shop.html?cat=${encodeURIComponent(c)}">${c}</a></li>`).join("")}</ul></div>
    <div><h4>Контакт</h4><ul><li>${CONTACT.phone}</li><li>${CONTACT.email}</li><li>${CONTACT.city}</li><li>Доставка с куриер</li></ul></div>
  </div>
  <div class="copy"><span>© 2026 Avanti Drip. Всички права запазени.</span><span>Политика за поверителност · Условия за ползване</span></div>
</div></footer>`;

/* ---------- theme / menu / scroll ---------- */
const themeBtn = $("#theme-btn");
const paint = () => (themeBtn.textContent = root.dataset.theme === "dark" ? "☀️" : "🌙");
paint();
themeBtn.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  paint();
});
$(".menu-btn").addEventListener("click", () => $(".nav ul").classList.toggle("open"));
const hdr = $("header.site");
const onScroll = () => {
  hdr.classList.toggle("scrolled", scrollY > 40);
  const h = document.documentElement.scrollHeight - innerHeight;
  $("#progress").style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- toast ---------- */
let tt;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(tt);
  tt = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- scroll reveal ---------- */
const io = "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches
  ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 })
  : null;
function reveal() {
  $$(".head,.tile,.card,.col,.step,.value,.num,.gal a,.cta,.split>*,.hero-visual,.eco .container>*").forEach((el, i) => {
    if (el.dataset.rv) return;
    el.dataset.rv = 1;
    if (!io) return;
    el.classList.add("rv");
    el.style.transitionDelay = (i % 4) * 70 + "ms";
    io.observe(el);
  });
}

/* ---------- cards ---------- */
const badge = p => p.status === "new" ? '<span class="badge">Ново</span>' : p.status === "sold" ? '<span class="badge sold">Продадено</span>' : "";
const cardHTML = p => `<article class="card${p.status === "sold" ? " is-sold" : ""}" data-id="${p.id}" tabindex="0">
  <div class="ph">${badge(p)}<button class="fav${favs.includes(p.id) ? " on" : ""}" data-fav="${p.id}" aria-label="Любим">♥</button>
    <img src="${p.images[0]}" alt="${p.brand} ${p.name}" loading="lazy">${p.images[1] ? `<img class="alt" src="${p.images[1]}" alt="" loading="lazy">` : ""}
    <span class="qv">Бърз преглед</span></div>
  <div class="meta"><div class="brand">${p.brand}</div><h3>${p.name}</h3>
    <div class="row"><span class="chip">${p.size}</span><span class="price">${eur(p.price)}${p.old ? `<s>${eur(p.old)}</s>` : ""}</span></div></div>
</article>`;

function counts() {
  const set = (id, n) => { const e = $(id); e.textContent = n || ""; e.classList.toggle("on", !!n); };
  set("#fav-n", favs.length);
  set("#cart-n", cart.length);
}
function toggleFav(id) {
  favs = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id];
  store.set("ad-fav", favs);
  $$(`[data-fav="${id}"]`).forEach(b => b.classList.toggle("on", favs.includes(id)));
  counts();
  toast(favs.includes(id) ? "Добавено в любими ♥" : "Махнато от любими");
  document.dispatchEvent(new Event("favchange"));
}

/* ---------- cart drawer ---------- */
const open = el => { el.classList.add("open"); $("#overlay").classList.add("open"); document.body.style.overflow = "hidden"; };
function closeAll() {
  $("#drawer").classList.remove("open");
  $("#overlay").classList.remove("open");
  modal && modal.classList.remove("open");
  document.body.style.overflow = "";
}
function drawCart() {
  const items = cart.map(byId);
  const sub = items.reduce((s, p) => s + p.price, 0);
  const ship = !items.length || sub >= SHIP.free ? 0 : SHIP.price;
  const left = Math.max(0, SHIP.free - sub);
  $("#drawer").innerHTML = `<div class="dh"><h3>Кошница (${items.length})</h3><button class="x" data-close aria-label="Затвори">×</button></div>
    ${items.length ? `<div class="ship"><p>${left ? `Още <b>${eur(left)}</b> до безплатна доставка` : "🎉 Имаш безплатна доставка!"}</p><div class="bar"><i style="width:${Math.min(100, sub / SHIP.free * 100)}%"></i></div></div>
    <div class="items">${items.map(p => `<div class="it"><img src="${p.images[0]}" alt=""><div><small>${p.brand}</small><b>${p.name}</b><span>Размер ${p.size}</span></div><div class="r"><b>${eur(p.price)}</b><button data-rm="${p.id}">Махни</button></div></div>`).join("")}</div>
    <div class="sum"><div><span>Междинна сума</span><b>${eur(sub)}</b></div><div><span>Доставка</span><b>${ship ? eur(ship) : "Безплатна"}</b></div><div class="t"><span>Общо</span><b>${eur(sub + ship)}</b></div>
      <a class="btn or" href="contact.html?order=${cart.join(",")}">Поръчай</a><p>Плащаш при получаване – можеш да огледаш пратката.</p></div>`
    : '<div class="mt"><p>Кошницата е празна.</p><a class="btn gr" href="shop.html">Към магазина</a></div>'}`;
}
function addToCart(id) {
  if (!cart.includes(id)) { cart.push(id); store.set("ad-cart", cart); }
  counts(); drawCart();
}
$("#cart-btn").addEventListener("click", () => { drawCart(); open($("#drawer")); });
$("#overlay").addEventListener("click", closeAll);
$("#drawer").addEventListener("click", e => {
  if (e.target.closest("[data-close]")) closeAll();
  const rm = e.target.closest("[data-rm]");
  if (rm) { cart = cart.filter(x => x != rm.dataset.rm); store.set("ad-cart", cart); counts(); drawCart(); }
});

/* ---------- modal ---------- */
let modal;
function openModal(id) {
  const p = byId(id);
  if (!p) return;
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.addEventListener("click", e => {
      if (e.target === modal || e.target.classList.contains("x")) closeAll();
      const add = e.target.closest("[data-add]");
      if (add) { addToCart(+add.dataset.add); closeAll(); toast("Добавено в кошницата 🛍"); drawCart(); open($("#drawer")); }
      const f = e.target.closest("[data-fav]");
      if (f) { toggleFav(+f.dataset.fav); }
    });
    document.body.appendChild(modal);
  }
  const sold = p.status === "sold", inCart = cart.includes(p.id);
  modal.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><button class="x" aria-label="Затвори">×</button>
    <div class="gallery"><div class="main"><img id="m-img" src="${p.images[0]}" alt="${p.name}"></div>
      ${p.images.length > 1 ? `<div class="thumbs">${p.images.map((s, i) => `<button class="${i ? "" : "on"}" data-src="${s}"><img src="${s}" alt=""></button>`).join("")}</div>` : ""}</div>
    <div class="info"><span class="tag" style="align-self:flex-start">${p.brand}</span><h2>${p.name}</h2>
      <div class="price">${eur(p.price)}${p.old ? `<s>${eur(p.old)}</s>` : ""}</div>
      <ul class="specs"><li><span>Размер</span><b>${p.size}</b></li><li><span>Категория</span><b>${p.cat}</b></li><li><span>Състояние</span><b>${p.condition}</b></li><li><span>Наличност</span><b>${sold ? "Продадено" : "1 брой"}</b></li></ul>
      <div class="acts">${sold ? '<a class="btn gr" href="shop.html">Виж други модели</a>' : `${inCart ? '<a class="btn or" href="contact.html?order=' + cart.join(",") + '">Към поръчката</a>' : `<button class="btn or" data-add="${p.id}">Добави в кошницата</button>`}<a class="btn gr" href="${CONTACT.instagram}" target="_blank" rel="noopener">Питай в Instagram</a>`}
        <button class="btn ghost fav-line${favs.includes(p.id) ? " on" : ""}" data-fav="${p.id}">♥ Любим</button></div>
      <p class="note">Всяка дреха е уникална – 1 брой. Проверка преди плащане.</p></div></div>`;
  modal.classList.add("open");
  $("#overlay").classList.add("open");
  document.body.style.overflow = "hidden";
  $$(".thumbs button", modal).forEach(b => b.addEventListener("click", () => {
    $("#m-img").src = b.dataset.src;
    $$(".thumbs button", modal).forEach(x => x.classList.toggle("on", x === b));
  }));
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); if (e.key === "Enter" && e.target.classList?.contains("card")) openModal(e.target.dataset.id); });
document.addEventListener("click", e => {
  const f = e.target.closest(".card [data-fav]");
  if (f) { e.stopPropagation(); toggleFav(+f.dataset.fav); return; }
  const c = e.target.closest(".card");
  c && openModal(c.dataset.id);
});

/* ---------- home ---------- */
const recent = $("#recent");
if (recent) recent.innerHTML = PRODUCTS.slice(0, 8).map(cardHTML).join("");

/* ---------- drop countdown ---------- */
const dropEl = $("#drop-time");
if (dropEl) {
  const next = () => {
    const d = new Date();
    d.setHours(DROP.hour, DROP.minute, 0, 0);
    d.setDate(d.getDate() + ((DROP.day - d.getDay() + 7) % 7));
    if (d <= new Date()) d.setDate(d.getDate() + 7);
    return d;
  };
  const target = next();
  $("#drop-label") && ($("#drop-label").textContent = DROP.label);
  const tick = () => {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
    $$("b", dropEl).forEach((b, i) => (b.textContent = String(v[i]).padStart(2, "0")));
  };
  tick(); setInterval(tick, 1000);
}

/* ---------- shop ---------- */
const catalog = $("#catalog");
if (catalog) {
  const q = new URLSearchParams(location.search);
  const GN = { m: "Мъжко", w: "Дамско" };
  const state = { g: GN[q.get("g")] || "Всички", cat: CATEGORIES.includes(q.get("cat")) ? q.get("cat") : "Всички", brand: "Всички", size: "Всички", fav: q.get("fav") === "1", text: "", sort: "new" };
  const brands = ["Всички", ...new Set(PRODUCTS.map(p => p.brand))];
  const sizes = ["Всички", ...["S", "M", "L", "XL", "XXL"].filter(s => PRODUCTS.some(p => p.size === s))];
  const pills = (el, list, key) => {
    el.innerHTML = list.map(x => `<button class="${state[key] === x ? "on" : ""}">${x}</button>`).join("");
    el.onclick = e => { if (e.target.tagName === "BUTTON") { state[key] = e.target.textContent; draw(); } };
  };
  function draw() {
    $("#f-g").innerHTML = ["Всички", "Мъжко", "Дамско"].map(x => `<button class="${!state.fav && state.g === x ? "on" : ""}">${x}</button>`).join("") + `<button class="${state.fav ? "on" : ""}" data-fav-f>♥ Любими</button>`;
    $("#f-g").onclick = e => {
      if (e.target.tagName !== "BUTTON") return;
      if (e.target.hasAttribute("data-fav-f")) state.fav = !state.fav; else { state.g = e.target.textContent; state.fav = false; }
      draw();
    };
    pills($("#f-cat"), ["Всички", ...CATEGORIES], "cat");
    pills($("#f-brand"), brands, "brand");
    pills($("#f-size"), sizes, "size");
    const gk = { "Мъжко": "m", "Дамско": "w" }[state.g];
    const list = PRODUCTS.filter(p => (!state.fav || favs.includes(p.id)) && (!gk || p.gender === gk || p.gender === "u") && (state.cat === "Всички" || p.cat === state.cat) &&
      (state.brand === "Всички" || p.brand === state.brand) && (state.size === "Всички" || p.size === state.size) &&
      (p.brand + " " + p.name + " " + p.tags.join(" ")).toLowerCase().includes(state.text));
    if (state.sort === "low") list.sort((a, b) => a.price - b.price);
    else if (state.sort === "high") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => (a.status === "sold") - (b.status === "sold"));
    const title = $("h1.shop-title");
    if (title) title.textContent = state.fav ? "Любими" : state.g === "Всички" ? "Всички дрехи" : state.g + " облекло";
    $("#count").textContent = list.length + " " + (list.length === 1 ? "артикул" : "артикула");
    const none = state.fav ? "Още нямаш любими – натисни ♥ върху дреха, която ти хареса."
      : state.g === "Дамско" ? "Нови дамски модели идват скоро – пиши ни и ще те уведомим първа!" : "Няма резултати. Пробвай друг филтър.";
    catalog.innerHTML = list.length ? list.map(cardHTML).join("") : `<p class="empty">${none}</p>`;
    reveal();
  }
  $("#search").addEventListener("input", e => { state.text = e.target.value.trim().toLowerCase(); draw(); });
  $("#sort").addEventListener("change", e => { state.sort = e.target.value; draw(); });
  document.addEventListener("favchange", () => state.fav && draw());
  draw();
}

/* ---------- contact (с поръчка от кошницата) ---------- */
const form = $("#contact-form");
if (form) {
  const q = new URLSearchParams(location.search);
  const ids = (q.get("order") || "").split(",").map(Number).filter(id => byId(id));
  if (ids.length) {
    const items = ids.map(byId), sub = items.reduce((s, p) => s + p.price, 0), ship = sub >= SHIP.free ? 0 : SHIP.price;
    form.msg.value = `Здравейте! Искам да поръчам:\n${items.map(p => `• ${p.brand} ${p.name} (${p.size}) – ${eur(p.price)}`).join("\n")}\n\nОбщо: ${eur(sub + ship)} (доставка ${ship ? eur(ship) : "безплатна"}).\nАдрес за доставка: `;
    $("#order-note") && ($("#order-note").style.display = "block");
  } else if (q.get("item")) form.msg.value = `Здравейте! Интересувам се от: ${q.get("item")}. Налична ли е още?`;
  form.addEventListener("submit", e => {
    e.preventDefault(); // демо – за реално изпращане свържи с Formspree / EmailJS
    $(".form-msg").style.display = "block";
    form.reset();
  });
}

counts();
drawCart();
reveal();
