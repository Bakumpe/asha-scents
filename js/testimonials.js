// testimonials.js
// ── STATIC + DYNAMIC REVIEWS ──
const BASE_REVIEWS = [
  {
    name: "Joseph",
    fragrance: "Ambré Étoile",
    stars: 5,
    text: "Ambré Étoile is absolutely divine! The vanilla and amber dry-down is so sophisticated. I get compliments every time I wear it — totally worth the investment.",
    img: "../assets/joseph.jpg",
  },
  {
    name: "Elijah",
    fragrance: "Noir Spice",
    stars: 5,
    text: "Noir Spice is my new signature. The peppery opening with smooth leather base is incredible — long-lasting and distinctive without being overpowering.",
    img: "../assets/elijah.jpg",
  },
  {
    name: "Tadeo",
    fragrance: "Azure Mist",
    stars: 4.5,
    text: "Azure Mist is such a perfect everyday fragrance. Light and fresh, but doesn't disappear after an hour like other aquatics I've tried. The packaging is gorgeous too.",
    img: "../assets/tadeo.jpg",
  },
  {
    name: "Ismail",
    fragrance: "Jardin Rose",
    stars: 5,
    text: "I never expected a local brand to match international luxury houses. Jardin Rose is beautifully complex and lasts all day on my skin. Mistry Scent is incredible.",
    img: "../assets/ismail.jpg",
  },
  {
    name: "Faizol",
    fragrance: "Velvet Oud",
    stars: 5,
    text: "Velvet Oud is the most luxurious thing I've ever worn. The saffron and rose over oud is breathtaking. Definitely a statement fragrance.",
    img: "../assets/faizol.jpg",
  },
  {
    name: "Stella",
    fragrance: "Citrus Soleil",
    stars: 4,
    text: "Citrus Soleil is my morning go-to. Bright, uplifting, and professional. Perfect for the office and lasts a solid 6 hours on me.",
    img: "../assets/stella.jpg",
  },
];

function starsHTML(n) {
  const full = Math.floor(n);
  const half = n % 1 >= 0.5;
  let s = "★".repeat(full);
  if (half) s += "½";
  return s;
}

function renderReviews() {
  const saved = JSON.parse(localStorage.getItem("ashaReviews") || "[]");
  const all = [...saved, ...BASE_REVIEWS];
  const grid = document.getElementById("testiGrid");
  grid.innerHTML = all
    .map(
      (r) => `
        <div class="testi-card reveal">
            <div class="testi-quote">"</div>
            <p class="testi-text">${r.text}</p>
            <div class="testi-footer">
                <div class="testi-avatar">
                    <img src="${r.img || "https://randomuser.me/api/portraits/lego/1.jpg"}" alt="${r.name}" onerror="this.src='https://randomuser.me/api/portraits/lego/1.jpg'">
                </div>
                <div>
                    <div class="testi-name">${r.name}</div>
                    <div class="testi-stars">${starsHTML(r.stars)}</div>
                    ${r.fragrance ? `<div class="testi-fragrance">${r.fragrance}</div>` : ""}
                </div>
            </div>
        </div>
    `,
    )
    .join("");
  document
    .querySelectorAll(".testi-card.reveal")
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

// ── TOAST ──
let toastTimer;
function showToast(msg, icon = "fa-check") {
  const t = document.getElementById("toast");
  t.querySelector(".toast-icon").className = `toast-icon fas ${icon}`;
  t.querySelector(".toast-msg").textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3000);
}

// ── SUBMIT REVIEW ──
document.getElementById("submitReview").addEventListener("click", () => {
  const name = document.getElementById("reviewName").value.trim();
  const fragrance = document.getElementById("reviewFragrance").value;
  const rating = document.querySelector('input[name="rating"]:checked');
  const text = document.getElementById("reviewText").value.trim();

  if (!name || !fragrance || !rating || !text) {
    showToast("Please fill in all fields.", "fa-exclamation");
    return;
  }

  const newReview = {
    name,
    fragrance,
    stars: parseInt(rating.value),
    text,
    img: "",
  };
  const saved = JSON.parse(localStorage.getItem("ashaReviews") || "[]");
  saved.unshift(newReview);
  localStorage.setItem("ashaReviews", JSON.stringify(saved));

  document.getElementById("reviewName").value = "";
  document.getElementById("reviewFragrance").value = "";
  document.querySelector('input[name="rating"]:checked').checked = false;
  document.getElementById("reviewText").value = "";

  renderReviews();
  showToast("Thank you for your review!");
  document
    .getElementById("testimonials")
    .scrollIntoView({ behavior: "smooth" });
});

// ── NAV ──
window.addEventListener("scroll", () => {
  document
    .getElementById("mainNav")
    .classList.toggle("scrolled", window.scrollY > 60);
});
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

// ── CART COUNT ──
function syncCartCount() {
  const cart = JSON.parse(localStorage.getItem("ashaCart") || "[]");
  document.getElementById("cartCount").textContent = cart.reduce(
    (s, i) => s + i.qty,
    0,
  );
}
syncCartCount();
document.getElementById("navBag").addEventListener("click", () => {
  window.location.href = "../index.html";
});

// ── INIT ──
renderReviews();
