const productDetail = document.getElementById("productDetail");

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

fetch("./data/products.json")
  .then((res) => res.json())
  .then((products) => {
    const product = products.find((p) => p.id == productId);

    productDetail.innerHTML = `

    <div class="detail-card">

      <img src="${product.image}">

      <h2>${product.title}</h2>

      <p>${product.description}</p>

      <h3>₹${product.price}</h3>

      <button onclick="addToCart()">
        Add To Cart
      </button>

    </div>

  `;

    window.addToCart = function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find((item) => item.id == product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Added To Cart");
    };
  });
