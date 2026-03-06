
  document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));

        // Find if item already exists
        const existing = cart.find(item => item.name === name);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to cart!`);
      });
    });
  });

document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsEl = document.getElementById('cart-items');
    const finalTotalEl = document.getElementById('final-total');

    let finalTotal = 0;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = `<tr><td colspan="4" class="text-center">Your cart is empty.</td></tr>`;
    } else {
      cartItemsEl.innerHTML = ''; // Clear existing content
      cart.forEach(item => {
        const total = item.price * item.quantity;
        finalTotal += total;

        const row = `
          <tr>
            <td>${item.name}</td>
            <td>€${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>€${total.toFixed(2)}</td>
          </tr>
        `;
        cartItemsEl.innerHTML += row;
      });

      finalTotalEl.textContent = `€${finalTotal.toFixed(2)}`;
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
  const cartItemsEl = document.getElementById('cart-items');
  const finalTotalEl = document.getElementById('final-total');

  // Load cart from localStorage or initialize empty
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Render cart items in the table
  function renderCart() {
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
      cartItemsEl.innerHTML = `<tr><td colspan="4" class="text-center">Your cart is empty.</td></tr>`;
      finalTotalEl.textContent = '€0.00';
      return;
    }

    let finalTotal = 0;

    cart.forEach((item, index) => {
      const total = item.price * item.quantity;
      finalTotal += total;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.name}</td>
        <td>€${item.price.toFixed(2)}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-outline-secondary btn-decrease" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary btn-increase" data-index="${index}">+</button>
          </div>
        </td>
        <td>€${total.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-danger btn-remove" data-index="${index}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      cartItemsEl.appendChild(tr);
    });

    finalTotalEl.textContent = `€${finalTotal.toFixed(2)}`;
  }

  // Save cart to localStorage and re-render
  function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  // Listen for clicks on +/- and remove buttons (event delegation)
  cartItemsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const index = parseInt(btn.getAttribute('data-index'), 10);
    if (isNaN(index)) return;

    if (btn.classList.contains('btn-increase')) {
      cart[index].quantity++;
      updateCartStorage();
    } 
    else if (btn.classList.contains('btn-decrease')) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCartStorage();
      }
    } 
    else if (btn.classList.contains('btn-remove')) {
      cart.splice(index, 1);
      updateCartStorage();
    }
  });

  renderCart();
});
