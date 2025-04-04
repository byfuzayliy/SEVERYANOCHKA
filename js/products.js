const productsWrapper = document.querySelector(".products-wrapper");
const searchInput = document.querySelector(".search-input");
const pagination = document.querySelector(".pagination");
const categorySelect = document.querySelector(".form-select");
let search = "";
let active = 1;

const filterCategories = [
  "All",
  "Fruit",
  "Bakery",
  "Vegetable",
  "Dairy",
  "Chicken",
  "Dessert",
  "Meat",
  "Fast Food",
  "Breakfast",
  "Lunch",
  "Dinner",
];

function getProducts({ images, price, name, id, category, rating }) {
  let check = cart.find((el) => el.id === id);
  console.log(check);

  return `
  <div class="card ">
              <img src=${images[0]} alt="" />

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

                     <div class = "d-flex align-items-center"><h2><a href = "../product.html?id=${id}">${name}</a></h2> <span class = "badge bg-warning"><a href = "../category.html?id=${category}" class = "text-white">${category}</a></span></div>

              <p>Г/Ц Блинчики с мясом вес, Россия</p>
              <div class="cards-star">
              ${"<i class='bx bx-star'></i>".repeat(Math.floor(rating))}
              </div>

              <button class=${
                check ? "added-button" : "add-button"
              } onClick = "addToCart(${id})">В корзину</button>
            </div>  
  `;
}

function getProductFinded() {
  let finded = products.filter((el) => el.name.toLowerCase().includes(search));
  let pages = Math.ceil(finded.length / 8);

  if (pages > 1) {
    pagination.innerHTML = `
    <button class = "btn btn-primary" ${
      active === 1 ? "disabled" : ""
    } onClick = "getPage('-')">Previous</button>
      `;
    for (let i = 1; i < pages; i++) {
      pagination.innerHTML += `<button class= "btn btn-${
        i === active ? "danger" : "primary"
      }" onClick = "getPage(${i})">${i}</button>`;
    }

    pagination.innerHTML += ` <button class="btn btn-primary" ${
      active === pages - 1 ? "disabled" : ""
    } onClick = "getPage('+')">Next</button>`;
  } else {
    pagination.innerHTML = "";
    productsWrapper.innerHTML = `<p>
      Ничего не найдено по вашему запросу. Попробуйте изменить ключевые слова или фразу.
    </p>`;
  }
  let start = (active - 1) * 10;
  let end = active * 10;
  let pageResult = finded.slice(start, end);
  productsWrapper.innerHTML = "";

  pageResult.map((el) => {
    productsWrapper.innerHTML += getProducts(el);
  });
}

getProductFinded();
searchInput.addEventListener("keyup", (e) => {
  active = 1;
  search = e.target.value.trim().toLowerCase();

  getProductFinded();
});

function getPage(page) {
  if (page === "+") {
    active++;
  } else if (page === "-") {
    active--;
  } else {
    active = page;
  }

  getProductFinded();
}

function addToCart(id) {
  let product = products.find((el) => el.id === id);
  let check = cart.find((el) => el.id === id);

  if (check) {
    cart = cart.map((el) => {
      if (el.id === id) {
        el.quantity++;
      }
      return el;
    });
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  getCart();
  getProductFinded();
}

//  filter

function getFilterCategory(category) {
  return `<option value = ${category.toLowerCase()}>${category}</option>`;
}

filterCategories.map((category) => {
  categorySelect.innerHTML += getFilterCategory(category);
});

function filterProducts(category) {
  let filteredCard;

  if (category === "all") {
    filteredCard = products;
  } else {
    filteredCard = products.filter(
      (el) => el.category.toLowerCase() === category
    );
  }

  pagination.innerHTML = "";
  productsWrapper.innerHTML = "";
  filteredCard.map((el) => {
    productsWrapper.innerHTML += getProducts(el);
  });
}

categorySelect.addEventListener("change", (event) => {
  active = 1;
  filterProducts(event.target.value);
});
