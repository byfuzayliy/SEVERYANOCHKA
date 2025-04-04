const discountList = document.querySelector(".discount-list");
const newProductList = document.querySelector(".new-product-list");
const popularProductList = document.querySelector(".popular-product-list");
const advertCard = document.querySelector(".advert-cards");
const articlesCards = document.querySelector(".articles-cards");

const advert = [
  {
    img: "../assets/images/home/special-card.png",
    title: "Оформите карту «Северяночка»",
    desc: "И получайте бонусы при покупке в магазинах и на сайте",
  },
  {
    img: "../assets/images/home/special-card2.png",
    title: "Оформите карту «Северяночка»",
    desc: "И получайте бонусы при покупке в магазинах и на сайте",
  },
];

const articles = [
  {
    id: 1,
    title: "Режим использования масок и перчаток на территории магазинов",
    description:
      'Подробная информация о режимах использования масок и перчаток на территории магазинов "ЛЕНТА". Информация обновляется каждый будний день.',
    image: "../assets/images/home/article1.png",
    date: "05.03.2021",
  },
  {
    id: 2,
    title: "Весеннее настроение для каждой и праздничных тёплых пожеланий",
    description:
      "8 Марта – это не просто Международный женский день, это ещё день тюльпанов, приятных сюрпризов и праздничных тёплых пожеланий.",
    image: "../assets/images/home/article2.png",
    date: "02.05.2023",
  },
  {
    id: 3,
    title: "ЗОЖ или ФАСТФУД. А вы на чьей стороне? Голосуем!",
    description:
      "Голосуйте за любимые категории, выбирайте категорию-победителя в мобильном приложении и получайте кешбэк 10% баллами в апреле!",
    image: "../assets/images/home/article3.png",
    date: "22.02.2020",
  },
];

function generateCard({ id, price, images, name, category, rating }) {
  let check = cart.find((el) => el.id === id);
  console.log(check);
  return `<div class="card">
            <img src="${images[0]}" alt="${name}" />
            <div class="card-price">
              <div class="cridit-card">
                <h2>${price}₽</h2>
                <span>С картой</span>
              </div>
              <div class="cash-card">
                <h2>50,50 ₽</h2>
                <span>Обычная</span>
              </div>
            </div>
            <div class = "d-flex align-items-center"><h2><a href = "#">${name}</a></h2> <span class = "badge bg-warning"><a href = "#" class = "text-white">${category}</a></span></div>
            <p>Г/Ц Блинчики с мясом вес, Россия</p>
            <div class="cards-star">
              ${"<i class='bx bx-star'></i>".repeat(Math.floor(rating))}
            </div>
            
              <a href = "../products.html" class=${
                check ? "added-button" : "add-button"
              } onClick = "addToCart(${id})">В корзину</a>
            </div>  
          </div>`;
}

function renderProducts(filterCondition, container) {
  products
    .filter(filterCondition)
    .slice(0, 4)
    .forEach((el) => {
      container.innerHTML += generateCard(el);
    });
}

renderProducts((el) => el.discount > 0, discountList);
renderProducts((el) => el.price > 70, newProductList);
renderProducts((el) => el.rating > 4, popularProductList);

function renderList(data, container, templateFunc) {
  container.innerHTML = data.map(templateFunc).join("");
}

renderList(
  advert,
  advertCard,
  (el) => `
  <div class="advert-card">
    <div>
      <h3>${el.title}</h3>
      <p>${el.desc}</p>
    </div>
    <img src="${el.img}" alt="${el.title}" />
  </div>
`
);

renderList(
  articles,
  articlesCards,
  (el) => `
  <div class="article-card">
    <img src="${el.image}" alt="${el.title}" />
    <span>${el.date}</span>
    <h3>${el.title}</h3>
    <p>${el.description.slice(0, 120)}</p>
    <a href="#">Подробнее</a>
  </div>
`
);
