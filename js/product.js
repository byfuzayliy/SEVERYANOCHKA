const productWrapper = document.querySelector(".product-wrapper");

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function renderProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));
  const product = getProductById(productId);

  if (!product) {
    productWrapper.innerHTML = "<h1>Mahsulot topilmadi</h1>";
    return;
  }

  productWrapper.innerHTML = `
    <div class="product-wrapper-card my-3"> 
      <h1><span>${product.id}</span>. ${product.name}</h1>
      <div class="cards-star d-flex align-items-center gap-2">
        ${"<i class='bx bx-star'></i>".repeat(Math.floor(product.rating))}
        <p class="p-0 m-0">${product.rating} отзыва</p>
        <i class="bx bx-share">Поделиться</i>
        <i class="bx bx-heart">В избраное</i>
      </div>
      <div class="d-flex my-3">
        <div class="indecators gap-2">
          <div class="d-flex justify-content-between indecators-images">
            ${product.images
              .map(
                (el, index) =>
                  `<img src="${el}" alt="" class="product-img indecator" data-index="${index}">`
              )
              .join("")}
          </div>
          <img class="product-img main-indecator" src="${product.images[0]}"/>
        </div>
        <div>
          <h2>${product.price} ₽</h2>
          <p>${product.description}</p>
          <a href="index.html">Ortga qaytish</a>
        </div>
      </div>
    </div>
  `;

  setupImageSwitcher();
}

function setupImageSwitcher() {
  const mainImage = document.querySelector(".main-indecator");
  const indecators = document.querySelectorAll(".indecator");

  indecators.forEach((img) => {
    img.addEventListener("click", function () {
      mainImage.src = this.src; // Bosilgan rasmni asosiy rasmga almashtiramiz
    });
  });
}

window.onload = renderProduct;
