const HANGER = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M32 18a5 5 0 1 0-5-5"/><path d="M32 18v6L6 44a3 3 0 0 0 2 5h48a3 3 0 0 0 2-5L32 24"/></svg>';
const money = n => n + " лв.";

// тъмен / светъл режим
const root = document.documentElement;
const themeBtn = document.getElementById("theme-btn");
const paintIcon = () => themeBtn && (themeBtn.textContent = root.dataset.theme === "dark" ? "☀️" : "🌙");
paintIcon();
themeBtn && themeBtn.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  paintIcon();
});

// мобилно меню
const btn = document.querySelector(".menu-btn");
btn && btn.addEventListener("click", () => document.querySelector(".nav ul").classList.toggle("open"));

// активна връзка в менюто
const here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav ul a").forEach(a => a.getAttribute("href") === here && a.classList.add("active"));

function cardHTML(p) {
  const thumb = p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : (ICONS[p.type] || HANGER);
  return `<article class="card">
    <div class="thumb" style="background:linear-gradient(160deg,${p.color},${p.color}cc)">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}${thumb}
    </div>
    <div class="info"><span class="cat-name">${p.cat}</span><h3>${p.name}</h3>
      <div class="price">${money(p.price)}${p.old ? `<s>${money(p.old)}</s>` : ""}</div></div>
  </article>`;
}

// начална: избрани продукти
const featured = document.getElementById("featured");
if (featured) featured.innerHTML = PRODUCTS.filter(p => p.badge).slice(0, 4).map(cardHTML).join("");

// каталог с филтри
const catalog = document.getElementById("catalog");
if (catalog) {
  const bar = document.getElementById("filters");
  const draw = c => {
    const list = c === "Всички" ? PRODUCTS : PRODUCTS.filter(p => p.cat === c);
    catalog.innerHTML = list.length ? list.map(cardHTML).join("") : '<p class="empty">Няма продукти в тази категория.</p>';
    bar.querySelectorAll("button").forEach(b => b.classList.toggle("active", b.textContent === c));
  };
  bar.innerHTML = ["Всички", ...CATEGORIES].map(c => `<button>${c}</button>`).join("");
  bar.addEventListener("click", e => e.target.tagName === "BUTTON" && draw(e.target.textContent));
  const q = new URLSearchParams(location.search).get("cat");
  draw(CATEGORIES.includes(q) ? q : "Всички");
}

// контактна форма (демо – за реално изпращане свържи с Formspree/EmailJS)
const form = document.getElementById("contact-form");
if (form) form.addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector(".form-msg").style.display = "block";
  form.reset();
});
