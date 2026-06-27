/**
 * Kashmir Heritage Luxury E-Commerce JS
 * Handles: Cart, Navigation, Overlays, Galleries, Accordions, Tabs
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSearch();
  initCart();
  initTabs();
  initAccordions();
  initProductPage();
});

/* ==========================================
   NAVIGATION
   ========================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  
  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu dynamic styling
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      // Toggle a class or show navigation menu
      alert("Mobile menu clicked - this would trigger a custom luxury full-screen slide menu.");
    });
  }
}

/* ==========================================
   SEARCH OVERLAY
   ========================================== */
function initSearch() {
  const searchBtn = document.querySelector('.search-btn');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-input');

  if (searchBtn && searchOverlay && searchClose) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchOverlay.classList.add('active');
      setTimeout(() => searchInput.focus(), 300);
    });

    searchClose.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
      }
    });
  }
}

/* ==========================================
   SHOPPING CART (LOCAL STORAGE SYSTEM)
   ========================================== */
let cart = [];

function initCart() {
  const cartBtn = document.querySelector('.cart-btn');
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartClose = document.querySelector('.cart-close-btn');

  // Load cart from LocalStorage
  if (localStorage.getItem('kashmir_cart')) {
    try {
      cart = JSON.parse(localStorage.getItem('kashmir_cart'));
    } catch (e) {
      cart = [];
    }
  }

  // Update header cart count badge
  updateCartBadge();

  // Drawer Toggle Events
  if (cartBtn && cartOverlay && cartDrawer && cartClose) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });

    cartClose.addEventListener('click', () => {
      closeCartDrawer();
    });

    cartOverlay.addEventListener('click', () => {
      closeCartDrawer();
    });
  }

  // Bind Add to Cart Buttons across pages
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('js-add-to-cart')) {
      e.preventDefault();
      const btn = e.target;
      const id = btn.getAttribute('data-product-id');
      const name = btn.getAttribute('data-product-name');
      const price = parseFloat(btn.getAttribute('data-product-price'));
      const image = btn.getAttribute('data-product-image');
      
      // Check if qty comes from page input
      let qty = 1;
      const qtyInput = document.querySelector('.detail-qty-input');
      if (qtyInput) {
        qty = parseInt(qtyInput.value) || 1;
      }

      addToCart(id, name, price, image, qty);
    }
  });

  // Cart item events (delegated)
  const cartBody = document.querySelector('.cart-body');
  if (cartBody) {
    cartBody.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('js-qty-plus')) {
        const id = e.target.getAttribute('data-id');
        updateItemQty(id, 1);
      } else if (e.target && e.target.classList.contains('js-qty-minus')) {
        const id = e.target.getAttribute('data-id');
        updateItemQty(id, -1);
      } else if (e.target && e.target.classList.contains('js-cart-remove')) {
        const id = e.target.getAttribute('data-id');
        removeFromCart(id);
      }
    });
  }
}

function openCartDrawer() {
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const cartDrawer = document.querySelector('.cart-drawer');
  if (cartOverlay && cartDrawer) {
    renderCart();
    cartOverlay.classList.add('active');
    cartDrawer.classList.add('active');
  }
}

function closeCartDrawer() {
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const cartDrawer = document.querySelector('.cart-drawer');
  if (cartOverlay && cartDrawer) {
    cartOverlay.classList.remove('active');
    cartDrawer.classList.remove('active');
  }
}

function addToCart(id, name, price, image, qty) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({ id, name, price, image, qty });
  }

  saveCart();
  updateCartBadge();
  openCartDrawer();
}

function updateItemQty(id, change) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart();
    updateCartBadge();
    renderCart();
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartBadge();
  renderCart();
}

function saveCart() {
  localStorage.setItem('kashmir_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-count-badge');
  const count = cart.reduce((total, item) => total + item.qty, 0);
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });
}

function renderCart() {
  const cartBody = document.querySelector('.cart-body');
  const subtotalVal = document.querySelector('.cart-subtotal-val');
  
  if (!cartBody) return;

  if (cart.length === 0) {
    cartBody.innerHTML = '<div class="cart-empty-message">Your heritage cart is currently empty. Explore the treasures of Kashmir.</div>';
    if (subtotalVal) subtotalVal.textContent = '₹0.00';
    return;
  }

  let html = '';
  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}.00</div>
          <div class="cart-item-qty-row">
            <button class="qty-btn js-qty-minus" data-id="${item.id}">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn js-qty-plus" data-id="${item.id}">+</button>
          </div>
          <span class="cart-item-remove js-cart-remove" data-id="${item.id}">Remove</span>
        </div>
      </div>
    `;
  });

  cartBody.innerHTML = html;
  if (subtotalVal) {
    subtotalVal.textContent = `₹${subtotal.toLocaleString('en-IN')}.00`;
  }
}

/* ==========================================
   EDUCATION BLOCK TABS (HOMEPAGE)
   ========================================== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.edu-tab-btn');
  const tabPanes = document.querySelectorAll('.edu-tab-pane');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        // Remove active class
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Add active class
        btn.classList.add('active');
        const targetPane = document.getElementById(`tab-${target}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }
}

/* ==========================================
   ACCORDIONS (PRODUCT DETAILS & FAQ)
   ========================================== */
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isActive = item.classList.contains('active');

      // Close all accordions in the same group
      const parentGroup = item.parentElement;
      const siblings = parentGroup.querySelectorAll('.accordion-item');
      siblings.forEach(sib => {
        sib.classList.remove('active');
        const sibBody = sib.querySelector('.accordion-body');
        if (sibBody) sibBody.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        // Set dynamic max-height
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================
   PRODUCT DETAILS PAGE FUNCTIONALITY
   ========================================== */
function initProductPage() {
  // Swapping main image with thumbnail
  const thumbs = document.querySelectorAll('.product-thumb');
  const mainImg = document.querySelector('.product-main-image-wrap img');

  if (thumbs.length > 0 && mainImg) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Update active class
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        // Update main image source
        const newSrc = thumb.querySelector('img').getAttribute('src');
        mainImg.setAttribute('src', newSrc);
      });
    });
  }

  // Qty Increment/Decrement in details page
  const qtyInput = document.querySelector('.detail-qty-input');
  const qtyMinus = document.querySelector('.detail-qty-minus');
  const qtyPlus = document.querySelector('.detail-qty-plus');

  if (qtyInput && qtyMinus && qtyPlus) {
    qtyMinus.addEventListener('click', () => {
      let currentVal = parseInt(qtyInput.value) || 1;
      if (currentVal > 1) {
        qtyInput.value = currentVal - 1;
      }
    });

    qtyPlus.addEventListener('click', () => {
      let currentVal = parseInt(qtyInput.value) || 1;
      qtyInput.value = currentVal + 1;
    });

    qtyInput.addEventListener('change', () => {
      let val = parseInt(qtyInput.value);
      if (isNaN(val) || val < 1) {
        qtyInput.value = 1;
      }
    });
  }

  // Buy Now Button action Simulation
  const buyNowBtn = document.querySelector('.js-buy-now');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = buyNowBtn.getAttribute('data-product-id');
      const name = buyNowBtn.getAttribute('data-product-name');
      const price = parseFloat(buyNowBtn.getAttribute('data-product-price'));
      const image = buyNowBtn.getAttribute('data-product-image');
      
      const qtyInput = document.querySelector('.detail-qty-input');
      const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

      // Add to cart and immediately redirect/show checkout message
      addToCart(id, name, price, image, qty);
      
      // Simulate going to checkout
      setTimeout(() => {
        alert("Simulating redirect to premium heritage checkout page... Process complete!");
      }, 500);
    });
  }
}
