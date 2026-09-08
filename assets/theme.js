/**
 * Glowérive Natural Skincare — Theme JavaScript
 * Handles Cart Drawer, Shopify Cart API, Wishlist, Modals, and Navigation
 */

(function () {
  'use strict';

  // Global Cart State (with fallback mock items for instant local/preview testing)
  const FREE_SHIPPING_THRESHOLD = 50.0;
  
  let cartState = {
    item_count: 2,
    total_price: 7600, // in cents ($76.00)
    items: [
      {
        id: 101,
        title: "Hydra Glow Gel Cream",
        price: 3400,
        quantity: 1,
        image: "product-1.jpg"
      },
      {
        id: 102,
        title: "Radiance Boost Serum",
        price: 4200,
        quantity: 1,
        image: "product-2.jpg"
      }
    ]
  };

  // Check if real Shopify Cart API is available
  const isShopify = typeof window.Shopify !== 'undefined' && window.Shopify.routes;

  // DOM Elements
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const cartCloseBtn = document.getElementById('cart-drawer-close');
  const cartTriggers = document.querySelectorAll('[data-cart-trigger]');
  const cartBadgeCount = document.querySelectorAll('.cart-count-badge');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal-price');
  const freeShippingText = document.getElementById('free-shipping-text');
  const freeShippingBar = document.getElementById('free-shipping-bar');

  // Format money helper
  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  // Toast notification
  function showToast(message) {
    let toast = document.getElementById('theme-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'theme-toast';
      toast.className = 'toast-notification';
      toast.innerHTML = '<i class="fa-solid fa-circle-check text-teal-300"></i> <span id="toast-text"></span>';
      document.body.appendChild(toast);
    }
    const textEl = toast.querySelector('#toast-text');
    if (textEl) textEl.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  }

  // Render Cart Drawer HTML
  function renderCartDrawer() {
    if (!cartItemsContainer) return;

    // Update badges
    cartBadgeCount.forEach(el => {
      el.textContent = cartState.item_count;
      el.style.display = cartState.item_count > 0 ? 'flex' : 'none';
    });

    // Subtotal
    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = formatMoney(cartState.total_price);
    }

    // Free Shipping Progress
    const totalDollars = cartState.total_price / 100;
    if (freeShippingBar && freeShippingText) {
      const percent = Math.min(100, Math.round((totalDollars / FREE_SHIPPING_THRESHOLD) * 100));
      freeShippingBar.style.width = percent + '%';

      if (totalDollars >= FREE_SHIPPING_THRESHOLD) {
        freeShippingText.innerHTML = '🎉 Congratulations! You have unlocked <strong>Free Shipping</strong>!';
      } else {
        const remaining = (FREE_SHIPPING_THRESHOLD - totalDollars).toFixed(2);
        freeShippingText.innerHTML = `Add <strong>$${remaining}</strong> more to unlock <strong>Free Shipping</strong>!`;
      }
    }

    // Render items
    if (!cartState.items || cartState.items.length === 0) {
      cartItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: #64748b;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem; color: #cbd5e1;">
            <i class="fa-solid fa-bag-shopping"></i>
          </div>
          <p style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; color: #1e293b;">Your bag is empty</p>
          <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">Explore our natural skincare routines to find your glow.</p>
          <button class="btn-add-to-cart" style="max-width: 200px; margin: 0 auto;" onclick="closeCart()">
            Start Shopping
          </button>
        </div>
      `;
      return;
    }

    let itemsHtml = '';
    cartState.items.forEach(item => {
      itemsHtml += `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" class="cart-item__image" />
          <div class="cart-item__details">
            <h4 class="cart-item__title">${item.title}</h4>
            <div class="cart-item__price">${formatMoney(item.price)}</div>
            <div class="cart-item__quantity-row">
              <div class="qty-control">
                <button type="button" class="qty-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="qty-num">${item.quantity}</span>
                <button type="button" class="qty-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
              </div>
              <span class="cart-item__remove" onclick="removeItemFromCart(${item.id})">Remove</span>
            </div>
          </div>
        </div>
      `;
    });
    cartItemsContainer.innerHTML = itemsHtml;
  }

  // Open & Close Cart
  function openCart() {
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.openCart = openCart;
  window.closeCart = closeCart;

  // Cart operations
  window.updateItemQuantity = function (id, newQty) {
    if (newQty <= 0) {
      window.removeItemFromCart(id);
      return;
    }

    if (isShopify) {
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, quantity: newQty })
      })
      .then(res => res.json())
      .then(cart => {
        syncShopifyCart(cart);
      });
    } else {
      const item = cartState.items.find(i => i.id === id);
      if (item) {
        item.quantity = newQty;
        recalculateLocalCart();
        renderCartDrawer();
      }
    }
  };

  window.removeItemFromCart = function (id) {
    if (isShopify) {
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, quantity: 0 })
      })
      .then(res => res.json())
      .then(cart => {
        syncShopifyCart(cart);
      });
    } else {
      cartState.items = cartState.items.filter(i => i.id !== id);
      recalculateLocalCart();
      renderCartDrawer();
      showToast("Item removed from your bag.");
    }
  };

  window.addToCart = function (productData) {
    if (isShopify) {
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: productData.id,
          quantity: productData.quantity || 1
        })
      })
      .then(res => res.json())
      .then(item => {
        fetch('/cart.js')
          .then(res => res.json())
          .then(cart => {
            syncShopifyCart(cart);
            openCart();
            showToast(`${productData.title} added to bag!`);
          });
      });
    } else {
      const existing = cartState.items.find(i => i.id === productData.id || i.title === productData.title);
      if (existing) {
        existing.quantity += (productData.quantity || 1);
      } else {
        cartState.items.push({
          id: productData.id || Date.now(),
          title: productData.title,
          price: productData.price,
          quantity: productData.quantity || 1,
          image: productData.image
        });
      }
      recalculateLocalCart();
      renderCartDrawer();
      openCart();
      showToast(`${productData.title} added to bag!`);
    }
  };

  function recalculateLocalCart() {
    let count = 0;
    let total = 0;
    cartState.items.forEach(i => {
      count += i.quantity;
      total += i.price * i.quantity;
    });
    cartState.item_count = count;
    cartState.total_price = total;
  }

  function syncShopifyCart(cart) {
    cartState = cart;
    renderCartDrawer();
  }

  // Wishlist Handling with LocalStorage
  let wishlist = JSON.parse(localStorage.getItem('glowerive_wishlist') || '[]');

  window.toggleWishlist = function (productId, buttonEl) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
      wishlist.push(productId);
      if (buttonEl) buttonEl.classList.add('active');
      showToast("Added to your wishlist!");
    } else {
      wishlist.splice(index, 1);
      if (buttonEl) buttonEl.classList.remove('active');
      showToast("Removed from wishlist.");
    }
    localStorage.setItem('glowerive_wishlist', JSON.stringify(wishlist));
  };

  // Video Modal Handlers
  window.openVideoModal = function () {
    const modal = document.getElementById('video-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeVideoModal = function () {
    const modal = document.getElementById('video-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      const iframe = modal.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        iframe.src = src; // stop video playback
      }
    }
  };

  // Mobile Menu Drawer Handlers
  window.toggleMobileMenu = function () {
    const drawer = document.getElementById('mobile-menu-drawer');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (drawer && overlay) {
      const isOpen = drawer.classList.contains('active');
      if (isOpen) {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  };

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function () {
    // Attach cart open triggers
    cartTriggers.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openCart();
      });
    });

    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Initial render
    renderCartDrawer();

    // Fetch real cart if on Shopify
    if (isShopify) {
      fetch('/cart.js')
        .then(res => res.json())
        .then(cart => syncShopifyCart(cart))
        .catch(err => console.log('Cart fetch notice:', err));
    }
  });

})();
