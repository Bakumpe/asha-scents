// ── FRAGRANCES DATA ──
const FRAGRANCES = [
  {
    id: 1,
    name: "Ambré Étoile",
    family: "Oriental",
    badge: "Best Seller",
    notes: "Vanilla · Amber · Sandalwood · Musk",
    price: 1850000,
    img: "./assets/scents/AmbréÉtoile.jpg",
  },
  {
    id: 2,
    name: "Azure Mist",
    family: "Aquatic",
    badge: "New",
    notes: "Sea Salt · Bergamot · White Cedar · Vetiver",
    price: 1650000,
    img: "./assets/scents/Azure Mist.jpg",
  },
  {
    id: 3,
    name: "Noir Spice",
    family: "Woody Spicy",
    badge: "",
    notes: "Black Pepper · Oud · Leather · Tobacco",
    price: 1950000,
    img: "./assets/scents/Noir Spice.jpg",
  },
  {
    id: 4,
    name: "Jardin Rose",
    family: "Floral",
    badge: "",
    notes: "Rose · Peony · Jasmine · Light Musk",
    price: 1750000,
    img: "./assets/scents/Jardin Rose.jpg",
  },
  {
    id: 5,
    name: "Citrus Soleil",
    family: "Citrus",
    badge: "",
    notes: "Grapefruit · Lemon · Neroli · Oakmoss",
    price: 1550000,
    img: "./assets/scents/Citrus Soleil.jpg",
  },
  {
    id: 6,
    name: "Velvet Oud",
    family: "Oriental",
    badge: "Limited",
    notes: "Oud · Rose · Saffron · Benzoin",
    price: 2250000,
    img: "./assets/scents/Velvet Oud.jpg",
  },
  {
    id: 7,
    name: "YSL Y EDP",
    family: "Woody Aromatic",
    badge: "Limited",
    notes: "Apple · Bergamot · Ginger · Sage",
    price: 22500000,
    img: "./assets/scents/YSL Y EDP.jpg",
  },
  {
    id: 8,
    name: "Montblanc",
    family: "Amber Spicy",
    badge: "Limited",
    notes: "Apple · Bergamot · Ginger · Sage",
    price: 1100000,
    img: "./assets/scents/Montblanc.jpg",
  },
  {
    id: 9,
    name: "Rasasi Virtue",
    family: "Oriental Woody",
    badge: "Limited",
    notes: "Oud · Rose · Saffron · Benzoin",
    price: 2250000,
    img: "./assets/scents/Rasasi Virtue.jpg",
  },
  {
    id: 10,
    name: "Dior Sauvage",
    family: "Aromatic Fougère",
    badge: "Limited",
    notes: "Calabrian Bergamot · Lavender",
    price: 4250000,
    img: "./assets/scents/Dior Sauvage.jpg",
  },
];

// ── CART STATE ──
let cart = JSON.parse(localStorage.getItem("ashaCart") || "[]");

function saveCart() {
  localStorage.setItem("ashaCart", JSON.stringify(cart));
}

function formatPrice(n) {
  return "UGX " + n.toLocaleString();
}

function getCartItem(id) {
  return cart.find((i) => i.id === id);
}

function addToCart(id) {
  const frag = FRAGRANCES.find((f) => f.id === id);
  if (!frag) return;
  const existing = getCartItem(id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...frag, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(frag.name + " added to your bag");
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = getCartItem(id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) {
    removeFromCart(id);
    return;
  }
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartSubtotal").textContent = formatPrice(total);
  document.getElementById("cartTotal").textContent = formatPrice(total);
  document.getElementById("cartShipping").textContent =
    total > 0 ? "Calculated at checkout" : "—";

  const itemsEl = document.getElementById("cartItems");
  if (cart.length === 0) {
    itemsEl.innerHTML =
      '<div class="cart-empty"><i class="fas fa-shopping-bag"></i>Your bag is empty.<br>Explore our collection.</div>';
    return;
  }
  itemsEl.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img class="cart-item-img" src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-qty">
                    <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
                    <span class="qty-num">${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `,
    )
    .join("");
}

// ── TOAST ──
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.querySelector(".toast-msg").textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

// ── CART OPEN / CLOSE ──
function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

// ── RENDER PRODUCT GRID ──
function renderFragrances() {
  const grid = document.getElementById("fragrancesGrid");
  if (!grid) return;
  grid.innerHTML = FRAGRANCES.map(
    (f) => `
        <div class="frag-card reveal">
            <div class="frag-img-wrap">
                <img src="${f.img}" alt="${f.name}" loading="lazy">
                ${f.badge ? `<div class="frag-badge">${f.badge}</div>` : ""}
            </div>
            <div class="frag-body">
                <div class="frag-family">${f.family}</div>
                <div class="frag-name">${f.name}</div>
                <div class="frag-notes">${f.notes}</div>
            </div>
            <div class="frag-footer">
                <div class="frag-price">${formatPrice(f.price)}</div>
                <button class="frag-add" onclick="addToCart(${f.id})">Add to Bag</button>
            </div>
        </div>
    `,
  ).join("");
  // re-observe new cards
  document
    .querySelectorAll(".frag-card.reveal")
    .forEach((el) => observer.observe(el));
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ── NAV SCROLL ──
window.addEventListener("scroll", () => {
  document
    .getElementById("mainNav")
    .classList.toggle("scrolled", window.scrollY > 60);
});

// ── MOBILE MENU ──
document
  .getElementById("hamburger")
  .addEventListener("click", () =>
    document.getElementById("mobileMenu").classList.add("open"),
  );
document
  .getElementById("mobileClose")
  .addEventListener("click", () =>
    document.getElementById("mobileMenu").classList.remove("open"),
  );
document
  .querySelectorAll(".mobile-menu a")
  .forEach((a) =>
    a.addEventListener("click", () =>
      document.getElementById("mobileMenu").classList.remove("open"),
    ),
  );

// ── CART EVENTS ──
document.getElementById("navBag").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);
document.getElementById("cartContinue").addEventListener("click", closeCart);
document.getElementById("btnCheckout").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your bag is empty!");
    return;
  }
  showToast("Redirecting to checkout…");
});

// ── INIT ──
renderFragrances();
updateCartUI();
