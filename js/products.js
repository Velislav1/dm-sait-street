// РЕДАКТИРАЙ ТУК: продукти на магазина.
// image: сложи път към снимка (напр. "img/palto.jpg"), или остави "" за цветен placeholder.
// badge: "Ново", "-20%" или "" ; old: стара цена (по избор).
const CATEGORIES = ["Дамски", "Мъжки", "Аксесоари"];

const PRODUCTS = [
  { name: "Вълнено палто", type: "coat", cat: "Дамски", price: 189, old: 239, badge: "-20%", color: "#8c7b6b", image: "" },
  { name: "Ленена рокля", type: "dress", cat: "Дамски", price: 98, badge: "Ново", color: "#b5683f", image: "" },
  { name: "Копринена блуза", type: "blouse", cat: "Дамски", price: 74, color: "#6e7f73", image: "" },
  { name: "Висока талия дънки", type: "jeans", cat: "Дамски", price: 82, color: "#4f6177", image: "" },
  { name: "Класическо сако", type: "jacket", cat: "Мъжки", price: 169, badge: "Ново", color: "#3b3a3a", image: "" },
  { name: "Памучна риза", type: "shirt", cat: "Мъжки", price: 64, color: "#7d8fa3", image: "" },
  { name: "Chino панталон", type: "pants", cat: "Мъжки", price: 79, old: 99, badge: "-20%", color: "#a18f73", image: "" },
  { name: "Плетен пуловер", type: "sweater", cat: "Мъжки", price: 92, color: "#5b4d40", image: "" },
  { name: "Кожен колан", type: "belt", cat: "Аксесоари", price: 39, color: "#7a3f22", image: "" },
  { name: "Копринен шал", type: "scarf", cat: "Аксесоари", price: 49, badge: "Ново", color: "#a8566b", image: "" },
  { name: "Кожена чанта", type: "bag", cat: "Аксесоари", price: 139, color: "#4d3a2e", image: "" },
  { name: "Вълнена шапка", type: "hat", cat: "Аксесоари", price: 29, color: "#6b6f5b", image: "" }
];
