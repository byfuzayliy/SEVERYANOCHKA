const toggleButton = document.getElementById("toggle-dark-mode");
const cartTotal = document.querySelector(".count-cart");
const bxMenu = document.querySelector(".bx-menu");
const catalogsModal = document.querySelector(".catalogs-modal");
const catalogsWrapper = document.querySelector(".catalogs");
const catalogs = [
  { id: 1, name: "Молоко, сыр, яйцо" },
  { id: 2, name: "Хлеб" },
  { id: 3, name: "Фрукты и овощи" },
  { id: 4, name: "Замороженные продукты" },
  { id: 5, name: "Напитки" },
  { id: 6, name: "Кондитерские изделия" },
  { id: 7, name: "Чай, кофе" },
  { id: 8, name: "Бакалея" },
  { id: 9, name: "Здоровое питание" },
  { id: 10, name: "Зоотовары" },
  { id: 11, name: "Непродовольственные товары" },
  { id: 12, name: "Детское питание" },
  { id: 13, name: "Мясо, птица, колбаса" },
];
function getCatalogs(el) {
  return `<a href = "#">${el.id}.${el.name}</a>`;
}

catalogs.map((el) => {
  catalogsModal.innerHTML += getCatalogs(el);
});
bxMenu.addEventListener("click", function () {
  if (catalogsWrapper.style.display === "none") {
    catalogsWrapper.style.display = "flex";
  } else {
    catalogsWrapper.style.display = "none";
  }
});
// Avvalgi tanlovni olish
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

toggleButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// I have started wrote codes for a cart page

let cart = JSON.parse(localStorage.getItem("cart")) || [];
function getCart() {
  cartTotal.textContent = cart.length;
}

getCart();
