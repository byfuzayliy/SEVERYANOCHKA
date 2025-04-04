const categoryListCards = document.querySelector(".catalog-list-cards");

function getCategoryListCards(el) {
  return `<a href="../category.html?id=${el.id}" class = "category-card">
       <img src = "${el.image}"/>
       <h3>${el.name}</h3>
    </a>`;
}

categories.map((el) => {
  categoryListCards.innerHTML += getCategoryListCards(el);
});
