//AHSA-SCENTS/js/cart.js
// ══════════════════════════════════════
// DATA
// ══════════════════════════════════════
const ALL_FRAGRANCES = [
  {
    id: 1,
    name: "Ambré Étoile",
    family: "Oriental",
    badge: "Best Seller",
    notes: "Vanilla · Amber · Sandalwood · Musk",
    price: 185000,
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bf324093-565e-4d29-acc3-2879b9c0d508.png",
  },
  {
    id: 2,
    name: "Azure Mist",
    family: "Aquatic",
    badge: "New",
    notes: "Sea Salt · Bergamot · White Cedar",
    price: 165000,
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1a2f3403-e5d4-47c3-b36f-ecd9dbb81dde.png",
  },
  {
    id: 3,
    name: "Noir Spice",
    family: "Woody Spicy",
    badge: "",
    notes: "Black Pepper · Oud · Leather · Tobacco",
    price: 195000,
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bf324093-565e-4d29-acc3-2879b9c0d508.png",
  },
  {
    id: 4,
    name: "Jardin Rose",
    family: "Floral",
    badge: "",
    notes: "Rose · Peony · Jasmine · Light Musk",
    price: 175000,
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1a2f3403-e5d4-47c3-b36f-ecd9dbb81dde.png",
  },
  {
    id: 5,
    name: "Citrus Soleil",
    family: "Citrus",
    badge: "",
    notes: "Grapefruit · Lemon · Neroli · Oakmoss",
    price: 155000,
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bf324093-565e-4d29-acc3-2879b9c0d508.png",
  },
  {
    id: 6,
    name: "Velvet Oud",
    family: "Oriental",
    badge: "Limited",
    notes: "Oud · Rose · Saffron · Benzoin",
    price: 225000,
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1a2f3403-e5d4-47c3-b36f-ecd9dbb81dde.png",
  },
];

const PROMO_CODES = {
  ASHA10: { type: "percent", value: 10, label: "10% off" },
  ASHA20: { type: "percent", value: 20, label: "20% off" },
  WELCOME: { type: "fixed", value: 20000, label: "UGX 20,000 off" },
};

// ══════════════════════════════════════
// STATE
// ══════════════════════════════════════
let cart = JSON.parse(localStorage.getItem("ashaCart") || "[]");
let appliedCode = JSON.parse(localStorage.getItem("ashaPromo") || "null");

function saveCart() {
  localStorage.setItem("ashaCart", JSON.stringify(cart));
}
function savePromo() {
  localStorage.setItem("ashaPromo", JSON.stringify(appliedCode));
}
function fmt(n) {
  return "UGX " + n.toLocaleString();
}

// ══════════════════════════════════════
// CART CRUD
// ══════════════════════════════════════
function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) {
    cart = cart.filter((i) => i.id !== id);
  }
  saveCart();
  render();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  render();
  showToast("Item removed from your bag");
}

function addToCart(id) {
  const frag = ALL_FRAGRANCES.find((f) => f.id === id);
  if (!frag) return;
  const ex = cart.find((i) => i.id === id);
  if (ex) {
    ex.qty++;
  } else {
    cart.push({ ...frag, qty: 1 });
  }
  saveCart();
  render();
  showToast(frag.name + " added to your bag");
}

// ══════════════════════════════════════
// TOTALS
// ══════════════════════════════════════
function calcTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let discount = 0;
  if (appliedCode) {
    const p = PROMO_CODES[appliedCode];
    discount =
      p.type === "percent" ? Math.round((subtotal * p.value) / 100) : p.value;
  }
  const total = Math.max(0, subtotal - discount);
  return { subtotal, discount, total };
}

// ══════════════════════════════════════
// RENDER CART ITEMS
// ══════════════════════════════════════
function renderItems() {
  const panel = document.getElementById("cartItemsPanel");
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartSummaryLine").textContent =
    count === 0
      ? "Your bag is empty"
      : `You have ${count} item${count !== 1 ? "s" : ""} in your bag`;

  if (cart.length === 0) {
    panel.innerHTML = `
            <div class="cart-empty-state">
                <i class="fas fa-shopping-bag"></i>
                <h3>Your bag is empty</h3>
                <p>Discover our curated collection of luxury fragrances and find your signature scent.</p>
                <a href="../index.html#fragrances" class="btn-shop">Explore Fragrances</a>
            </div>`;
    return;
  }

  panel.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item-row reveal">
            <img class="cart-item-img" src="${item.img}" alt="${item.name}">

            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-family">${item.family}</div>
                <div class="cart-item-price-unit">${fmt(item.price)} each</div>
                <div class="cart-qty">
                    <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
                    <span class="qty-num">${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
                </div>
            </div>
            <div class="cart-item-right">
                <div class="cart-item-line-price">${fmt(item.price * item.qty)}</div>
                <button class="cart-item-remove" onclick="removeItem(${item.id})">
                    <i class="fas fa-times"></i> Remove
                </button>
            </div>
        </div>
    `,
    )
    .join("");

  // re-observe new rows
  panel.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ══════════════════════════════════════
// RENDER SUMMARY
// ══════════════════════════════════════
function renderSummary() {
  const { subtotal, discount, total } = calcTotals();
  document.getElementById("summarySubtotal").textContent = fmt(subtotal);
  document.getElementById("summaryShipping").textContent =
    subtotal > 0 ? "Calculated at checkout" : "—";
  document.getElementById("summaryDiscount").textContent =
    discount > 0 ? "−" + fmt(discount) : "—";
  document.getElementById("summaryTotal").textContent = fmt(total);

  // Restore promo UI if code was already applied
  if (appliedCode) {
    document.getElementById("promoInput").value = appliedCode;
    document.getElementById("promoMsg").textContent =
      `✓ ${PROMO_CODES[appliedCode].label} applied`;
    document.getElementById("promoMsg").className = "promo-msg success";
  }
}

// ══════════════════════════════════════
// RENDER UPSELL
// ══════════════════════════════════════
function renderUpsell() {
  const cartIds = new Set(cart.map((i) => i.id));
  const suggestions = ALL_FRAGRANCES.filter((f) => !cartIds.has(f.id)).slice(
    0,
    4,
  );
  const grid = document.getElementById("upsellGrid");
  grid.innerHTML = suggestions
    .map(
      (f) => `
        <div class="upsell-card reveal">
            <div class="upsell-img"><img src="${f.img}" alt="${f.name}" loading="lazy"></div>
            <div class="upsell-body">
                <div class="upsell-name">${f.name}</div>
                <div class="upsell-price">${fmt(f.price)}</div>
                <button class="upsell-add" onclick="addToCart(${f.id})">Add to Bag</button>
            </div>
        </div>
    `,
    )
    .join("");
  grid.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  document.getElementById("upsellSection").style.display = suggestions.length
    ? ""
    : "none";
}

// ══════════════════════════════════════
// MASTER RENDER
// ══════════════════════════════════════
function render() {
  renderItems();
  renderSummary();
  renderUpsell();
}

// ══════════════════════════════════════
// PROMO CODE
// ══════════════════════════════════════
document.getElementById("promoBtn").addEventListener("click", () => {
  const code = document.getElementById("promoInput").value.trim().toUpperCase();
  const msg = document.getElementById("promoMsg");
  if (!code) {
    msg.textContent = "Please enter a code.";
    msg.className = "promo-msg error";
    return;
  }
  if (PROMO_CODES[code]) {
    appliedCode = code;
    savePromo();
    msg.textContent = `✓ ${PROMO_CODES[code].label} applied!`;
    msg.className = "promo-msg success";
    renderSummary();
    showToast("Promo code applied!");
  } else {
    appliedCode = null;
    savePromo();
    msg.textContent = "Invalid code. Try ASHA10 or WELCOME.";
    msg.className = "promo-msg error";
  }
});

document.getElementById("promoInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("promoBtn").click();
});

// ══════════════════════════════════════
// CHECKOUT
// ══════════════════════════════════════
document.getElementById("btnCheckout").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your bag is empty!");
    return;
  }
  showToast("Redirecting to secure checkout…");
});

// ══════════════════════════════════════
// TOAST
// ══════════════════════════════════════
let toastTimer;
function showToast(msg, icon = "fa-check") {
  const t = document.getElementById("toast");
  t.querySelector(".toast-icon").className = `toast-icon fas ${icon}`;
  t.querySelector(".toast-msg").textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

// ══════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));


// NAV

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
document
  .getElementById("navBag")
  .addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

// ══════════════════════════════════════
// INIT
// ══════════════════════════════════════
render();
