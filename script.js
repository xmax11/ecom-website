document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  // Add to cart buttons
  document.querySelectorAll(".product button").forEach(button => {
    button.addEventListener("click", e => {
      const productEl = e.target.closest(".product");
      const product = {
        id: productEl.dataset.id,
        name: productEl.dataset.name,
        price: parseFloat(productEl.dataset.price)
      };
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      cartCount.textContent = cart.length;
      alert(`${product.name} added to cart!`);
    });
  });

  // Cart page
  const cartItemsEl = document.getElementById("cart-items");
  if (cartItemsEl) {
    if (cart.length === 0) {
      cartItemsEl.innerHTML = "<p>Your cart is empty</p>";
    } else {
      let total = 0;
      cartItemsEl.innerHTML = cart.map(item => {
        total += item.price;
        return `<div>${item.name} - $${item.price}</div>`;
      }).join("");
      document.getElementById("total").textContent = `Total: $${total}`;
    }
  }
});
