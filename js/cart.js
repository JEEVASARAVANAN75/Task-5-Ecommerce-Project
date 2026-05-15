const cartContainer = document.getElementById("cartContainer");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<h2>Your Cart Is Empty</h2>";

    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item) => `

    <div class="cart-item">

      <img src="${item.image}">

      <div>

        <h2>${item.title}</h2>

        <p>₹${item.price}</p>

        <p>
          Quantity:
          ${item.quantity}
        </p>

        <button onclick="increase(${item.id})">
          +
        </button>

        <button onclick="decrease(${item.id})">
          -
        </button>

        <button onclick="removeItem(${item.id})">
          Remove
        </button>

      </div>

    </div>

  `,
    )
    .join("");

  calculateTotal();
}

function calculateTotal() {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  document.getElementById("totalPrice").innerText = `Total: ₹${total}`;
}

function increase(id) {
  const item = cart.find((item) => item.id === id);

  item.quantity++;

  saveCart();
}

function decrease(id) {
  const item = cart.find((item) => item.id === id);

  if (item.quantity > 1) {
    item.quantity--;
  }

  saveCart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);

  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}

displayCart();
