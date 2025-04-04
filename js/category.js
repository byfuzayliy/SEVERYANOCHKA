const categoryCards = document.querySelector(".category-cards");

// Mahsulotlarni kategoriya bo‘yicha filtrlash
function getProductsByCategory(categoryName) {
  console.log(categoryName);
  return products.filter((product) => product.category === categoryName);
}

// Sahifa yuklanganda mahsulotlarni chiqarish
function renderCategoryPage() {
  const params = new URLSearchParams(window.location.search);
  const categoryName = params.get("id"); // URL'dan kategoriya nomini olish

  if (!categoryName) {
    categoryCards.innerHTML = "<h2>Kategoriya topilmadi</h2>";
    return;
  }

  const categoryProducts = getProductsByCategory(categoryName);

  if (categoryProducts.length === 0) {
    categoryCards.innerHTML = `<h2>"${categoryName}" bo'yicha mahsulot topilmadi</h2>`;
    return;
  }

  categoryCards.innerHTML = categoryProducts.map(getCategoryCards).join("");
}

// Mahsulotni karta ko‘rinishida qaytarish
function getCategoryCards({ id, price, images, name, category, rating }) {
  return `
    <div class="card">
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
      <div class="d-flex align-items-center">
        <h2><a href="product.html?id=${id}">${name}</a></h2> 
        <span class="badge bg-warning"><a href="category.html?id=${category}" class="text-white">${category}</a></span>
      </div>
      <p>Mahsulot haqida qisqacha</p>
      <div class="cards-star">
        ${"<i class='bx bx-star'></i>".repeat(Math.floor(rating))}
      </div>
      <a href="../products.html" class="add-button" onClick="addToCart(${id})">В корзину</a>
    </div>
  `;
}

renderCategoryPage();
