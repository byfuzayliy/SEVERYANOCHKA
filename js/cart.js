const cartCards = document.querySelector(".cart-cards");

function getCartCards({
  id,
  images,
  quantity,
  name,
  description,
  price,
  discount,
}) {
  return `<div class=" alert alert-primary cart-card flex-wrap d-flex justify-content-between align-items-center mb-3">
            <div class = "d-flex gap-3 flex-wrap justify-content-between align-items-center">
              <img src="${images[0]}" alt="" />

              <div>
              <h4>${name}
              <span class="badge bg-warning">${discount}%</span>
              </h4>
              <h5> Price:<span class = "badge bg-danger">${price}$</span></h5>
                <p>
                ${description}
                </p>
              </div>
            </div>

            <div class = "d-flex gap-4">
              <div>
                <button class = "btn btn-primary" onClick = "decQuantity(${id})">-</button>
                <span class = "btn">${quantity}</span>
                <button class = "btn btn-primary" onClick="incQuantity(${id})">+</button>
              </div>

              <div>
              <h3>${sumCard(id)}$</h3>
              </div>
            </div>
          </div>`;
}

function getCartProduct() {
  cartCards.innerHTML = "";
  cart.map((el) => {
    cartCards.innerHTML += getCartCards(el);
  });
}

getCartProduct();
function incQuantity(id) {
  cart = cart.map((el) => {
    if (el.id === id) {
      el.quantity++;
    }
    return el;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  getCartProduct();
  sumCard(id);
}

function decQuantity(id) {
  let product = cart.find((el) => el.id === id);

  if (product.quantity === 1) {
    cart = cart.filter((el) => el.id !== id);
  } else {
    cart = cart.map((el) => {
      if (el.id === id && el.quantity > 1) {
        el.quantity--;
      }
      return el;
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  getCartProduct();
  getCart();
  sumCard(id);
}

function sumCard(id) {
  product = cart.find((el) => el.id === id);
  return product.price * product.quantity;
}
