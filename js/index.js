// ══════════════════════════════════════════════════════════
// FRAGRANCES  (single source of truth — matches cart.php)
// ══════════════════════════════════════════════════════════
const FRAGRANCES = [
  { id:1,  name:"Ambré Étoile",  family:"Oriental",         badge:"Best Seller", notes:"Vanilla · Amber · Sandalwood · Musk",        price:1850000,  img:"./assets/scents/AmbréÉtoile.jpg" },
  { id:2,  name:"Azure Mist",    family:"Aquatic",          badge:"New",         notes:"Sea Salt · Bergamot · White Cedar · Vetiver", price:1650000,  img:"./assets/scents/Azure Mist.jpg" },
  { id:3,  name:"Noir Spice",    family:"Woody Spicy",      badge:"",            notes:"Black Pepper · Oud · Leather · Tobacco",      price:1950000,  img:"./assets/scents/Noir Spice.jpg" },
  { id:4,  name:"Jardin Rose",   family:"Floral",           badge:"",            notes:"Rose · Peony · Jasmine · Light Musk",         price:1750000,  img:"./assets/scents/Jardin Rose.jpg" },
  { id:5,  name:"Citrus Soleil", family:"Citrus",           badge:"",            notes:"Grapefruit · Lemon · Neroli · Oakmoss",       price:1550000,  img:"./assets/scents/Citrus Soleil.jpg" },
  { id:6,  name:"Velvet Oud",    family:"Oriental",         badge:"Limited",     notes:"Oud · Rose · Saffron · Benzoin",              price:2250000,  img:"./assets/scents/Velvet Oud.jpg" },
  { id:7,  name:"YSL Y EDP",     family:"Woody Aromatic",   badge:"Limited",     notes:"Apple · Bergamot · Ginger · Sage",            price:22500000, img:"./assets/scents/YSL Y EDP.jpg" },
  { id:8,  name:"Montblanc",     family:"Amber Spicy",      badge:"Limited",     notes:"Apple · Bergamot · Ginger · Sage",            price:1100000,  img:"./assets/scents/Montblanc.jpg" },
  { id:9,  name:"Rasasi Virtue", family:"Oriental Woody",   badge:"Limited",     notes:"Oud · Rose · Saffron · Benzoin",              price:2250000,  img:"./assets/scents/Rasasi Virtue.jpg" },
  { id:10, name:"Dior Sauvage",  family:"Aromatic Fougère", badge:"Limited",     notes:"Calabrian Bergamot · Lavender",               price:4250000,  img:"./assets/scents/Dior Sauvage.jpg" },
];

// ══════════════════════════════════════════════════════════
// CART API  — all state lives in cart.php $_SESSION
// ══════════════════════════════════════════════════════════

// POST an action to cart.php and return the updated cart JSON
async function cartPost(action, id = null) {
  const body = new URLSearchParams({ action });
  if (id !== null) body.append('id', id);
  const res  = await fetch('pages/cart.php', { method: 'POST', body });
  // cart.php PRG-redirects on normal POST; for AJAX we need JSON back.
  // We fetch the cart state separately after posting.
  return fetchCart();
}

// GET current cart state from cart.php as JSON
async function fetchCart() {
  const res  = await fetch('pages/cart.php?json=1');
  return res.json();            // { items: [{id,name,price,qty,img}], count, subtotal }
}

// ── Add to bag (called from product card buttons) ──────────
async function addToCart(id) {
  const frag = FRAGRANCES.find(f => f.id === id);
  if (!frag) return;

  // POST to session
  const body = new URLSearchParams({ action: 'add', id });
  await fetch('pages/cart.php', { method: 'POST', body });

  // Refresh sidebar from session
  const cart = await fetchCart();
  renderSidebar(cart);
  showToast(frag.name + ' added to your bag');
  openCart();
}

// ── Sidebar qty / remove (called from sidebar buttons) ─────
async function sidebarAction(action, id) {
  const body = new URLSearchParams({ action, id });
  await fetch('pages/cart.php', { method: 'POST', body });
  const cart = await fetchCart();
  renderSidebar(cart);
}

// ══════════════════════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════════════════════
function fmt(n) { return 'UGX ' + n.toLocaleString(); }

function renderSidebar(cart) {
  const { items, count, subtotal } = cart;

  document.getElementById('cartCount').textContent    = count;
  document.getElementById('cartSubtotal').textContent = fmt(subtotal);
  document.getElementById('cartTotal').textContent    = fmt(subtotal);
  document.getElementById('cartShipping').textContent = subtotal > 0 ? 'Calculated at checkout' : '—';

  const el = document.getElementById('cartItems');
  if (!items.length) {
    el.innerHTML = `<div class="cart-empty">
      <i class="fas fa-shopping-bag"></i>Your bag is empty.<br>Explore our collection.
    </div>`;
    return;
  }

  el.innerHTML = items.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmt(item.price)}</div>
        <div class="cart-qty">
          <button class="qty-btn" onclick="sidebarAction('dec',${item.id})">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="sidebarAction('inc',${item.id})">+</button>
        </div>
        <button class="cart-item-remove" onclick="sidebarAction('remove',${item.id})">Remove</button>
      </div>
    </div>
  `).join('');
}

function renderFragrances() {
  const grid = document.getElementById('fragrancesGrid');
  if (!grid) return;
  grid.innerHTML = FRAGRANCES.map(f => `
    <div class="frag-card reveal">
      <div class="frag-img-wrap">
        <img src="${f.img}" alt="${f.name}" loading="lazy">
        ${f.badge ? `<div class="frag-badge">${f.badge}</div>` : ''}
      </div>
      <div class="frag-body">
        <div class="frag-family">${f.family}</div>
        <div class="frag-name">${f.name}</div>
        <div class="frag-notes">${f.notes}</div>
      </div>
      <div class="frag-footer">
        <div class="frag-price">${fmt(f.price)}</div>
        <button class="frag-add" onclick="addToCart(${f.id})">Add to Bag</button>
      </div>
    </div>
  `).join('');
  document.querySelectorAll('.frag-card.reveal').forEach(el => observer.observe(el));
}

// ══════════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════════
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.querySelector('.toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ══════════════════════════════════════════════════════════
// CART SIDEBAR OPEN / CLOSE
// ══════════════════════════════════════════════════════════
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ══════════════════════════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════════════════════════
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ══════════════════════════════════════════════════════════
// NAV / EVENTS
// ══════════════════════════════════════════════════════════
window.addEventListener('scroll', () =>
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60)
);
document.getElementById('hamburger') .addEventListener('click', () => document.getElementById('mobileMenu').classList.add('open'));
document.getElementById('mobileClose').addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
document.querySelectorAll('.mobile-menu a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'))
);
document.getElementById('navBag').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);
document.getElementById('cartContinue').addEventListener('click', closeCart);
document.getElementById('btnCheckout').addEventListener('click', async () => {
  const cart = await fetchCart();
  if (!cart.count) { showToast('Your bag is empty!'); return; }
  window.location.href = 'pages/cart.php';
});

document.getElementById('nav-account').addEventListener('click', () => {
  window.location.href = 'pages/login.php';


});

// ══════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════
renderFragrances();
fetchCart().then(renderSidebar);