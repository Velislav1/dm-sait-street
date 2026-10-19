// РЕДАКТИРАЙ ТУК: продукти на Avanti Drip.
// images: първата е основната, втората (по избор) се показва при посочване и в галерията.
// gender: "m" мъжко, "w" дамско, "u" унисекс (показва се и в двете).
// status: "new" -> НОВО, "sold" -> ПРОДАДЕНО, "" -> без етикет.  old: стара цена (по избор).
// ВАЖНО: размерите, цените и състоянието са примерни, оправи ги според реалните.
const CATEGORIES = ["Суичъри", "Горнища с цип", "Тениски и блузи", "Футболни фланелки"];

const PRODUCTS = [
  { gender: "m", id: 1, name: "Germany Away Jersey 2024", brand: "Adidas", cat: "Футболни фланелки", size: "XL", price: 49, status: "new",
    condition: "Отлично", tags: ["Футбол", "Streetwear"], images: ["img/adidas-germany-front.jpg", "img/adidas-germany-back.jpg"] },
  { gender: "u", id: 2, name: "Baltimore Ravens Hoodie", brand: "Nike", cat: "Суичъри", size: "L", price: 54, status: "new",
    condition: "Много добро", tags: ["NFL", "Streetwear"], images: ["img/nike-ravens.jpg"] },
  { gender: "m", id: 3, name: "Ravenwood Basketball 1/4 Zip", brand: "Adidas", cat: "Горнища с цип", size: "M", price: 39, old: 49, status: "",
    condition: "Отлично", tags: ["Баскетбол"], images: ["img/adidas-ravenwood.jpg"] },
  { gender: "m", id: 4, name: "Indiana Pacers 1/4 Zip", brand: "Nike", cat: "Горнища с цип", size: "L", price: 36, status: "new",
    condition: "Отлично", tags: ["NBA", "Баскетбол"], images: ["img/nike-pacers.jpg", "img/nike-pacers-back.jpg"] },
  { gender: "u", id: 5, name: "NK Wings Hoodie", brand: "Under Armour", cat: "Суичъри", size: "L", price: 44, old: 55, status: "",
    condition: "Много добро", tags: ["Streetwear"], images: ["img/ua-nk-hoodie.jpg"] },
  { gender: "m", id: 6, name: "West Virginia 1/4 Zip", brand: "Nike", cat: "Горнища с цип", size: "M", price: 34, status: "sold",
    condition: "Отлично", tags: ["Колеж"], images: ["img/nike-wvu.jpg"] },
  { gender: "m", id: 7, name: "Heatgear Long Sleeve", brand: "Under Armour", cat: "Тениски и блузи", size: "M", price: 24, old: 29, status: "",
    condition: "Много добро", tags: ["Спорт"], images: ["img/ua-blue-back.jpg"] },
  { gender: "m", id: 8, name: "Maroon 1/4 Zip Tee", brand: "Under Armour", cat: "Тениски и блузи", size: "L", price: 26, old: 32, status: "",
    condition: "Отлично", tags: ["Спорт"], images: ["img/ua-maroon.jpg"] }
];

// Контакти, смени с истинските
const CONTACT = {
  instagram: "https://instagram.com/avantidrip",
  facebook: "https://facebook.com/avantidrip",
  tiktok: "https://tiktok.com/@avantidrip",
  phone: "+359 88 888 8888",
  email: "info@avantidrip.bg",
  city: "България"
};

// Доставка: безплатна над "free" €, иначе "price" € (примерно, оправи)
const SHIP = { free: 100, price: 5 };
// Следващ дроп: day 0=нед, 1=пон ... 4=чет, 5=пет, 6=съб
const DROP = { day: 5, hour: 19, minute: 0, label: "Петък · 19:00 ч." };

// Формите ("Напомни ми" и Контакти) се пращат през Formspree (безплатно): https://formspree.io
// Създай форма там, копирай адреса (https://formspree.io/f/xxxxxxx) и го сложи тук.
// Докато е празно, формите отварят имейл приложението на клиента (mailto).
const FORM = { endpoint: "" };
