const productsContainer = document.getElementById("productsContainer");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");

const sortFilter = document.getElementById("sortFilter");

let products = [];

let filteredProducts = [];

const productsPerPage = 4;

let currentPage = 1;

fetch("./data/products.json")
  .then((res) => res.json())
  .then((data) => {
    products = data;

    filteredProducts = data;

    setupCategories();

    displayProducts();

    updateCartCount();
  });

function displayProducts() {
  const start = (currentPage - 1) * productsPerPage;

  const end = start + productsPerPage;

  const paginatedProducts = filteredProducts.slice(start, end);

  productsContainer.innerHTML = paginatedProducts
    .map(
      (product) => `

    <div class="card">

      <img src="${product.image}">

      <div class="card-content">

        <h3>${product.title}</h3>

        <p class="price">
          ₹${product.price}
        </p>

        <p>
          ${product.category}
        </p>

        <a href="product.html?id=${product.id}">
          View Details
        </a>

        <button onclick="addToCart(${product.id})">
          Add To Cart
        </button>

      </div>

    </div>

  `,
    )
    .join("");

  document.getElementById("pageNumber").innerText = currentPage;
}

function setupCategories() {
  const categories = [...new Set(products.map((p) => p.category))];

  categories.forEach((category) => {
    const option = document.createElement("option");

    option.value = category;

    option.innerText = category;

    categoryFilter.appendChild(option);
  });
}

function filterProducts() {
  const searchValue = searchInput.value.toLowerCase();

  const categoryValue = categoryFilter.value;

  filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchValue);

    const matchesCategory =
      categoryValue === "all" || product.category === categoryValue;

    return matchesSearch && matchesCategory;
  });

  if (sortFilter.value === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortFilter.value === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortFilter.value === "a-z") {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  currentPage = 1;

  displayProducts();
}

searchInput.addEventListener("input", filterProducts);

categoryFilter.addEventListener("change", filterProducts);

sortFilter.addEventListener("change", filterProducts);

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;

    displayProducts();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (currentPage < totalPages) {
    currentPage++;

    displayProducts();
  }
});

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = products.find((p) => p.id === id);

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Added To Cart");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById("cartCount").innerText = total;
}
