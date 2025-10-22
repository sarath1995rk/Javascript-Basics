document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  let cart = [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-card");
    productDiv.innerHTML = `
   <span>${product.name} - $${product.price.toFixed(2)} </span>
   <button data-id="${product.id}"> Add to cart</button>
   `;
    productList.append(productDiv);
  });

  productList.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const productId = parseInt(event.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item) => {
        totalPrice += item.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `<span> ${item.name} - $${item.price.toFixed(
          2
        )} </span>
        <button data-id="${item.id}"> Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
    }
  }

  checkOutBtn.addEventListener("click", function () {
    cart = [];

    alert("Cart cleared! Thank you for your purchase.");
    renderCart();
  });

  cartItems.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const cartItemId = parseInt(event.target.getAttribute("data-id"));
      cart = cart.filter((item) => item.id !== cartItemId);
      renderCart();
    }
  });
});
