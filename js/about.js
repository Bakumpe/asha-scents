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

// ── CART COUNT FROM LOCALSTORAGE ──
function syncCartCount() {
  const cart = JSON.parse(localStorage.getItem("ashaCart") || "[]");
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").textContent = count;
}
syncCartCount();

// ── NAV BAG → back to index cart ──
document.getElementById("navBag").addEventListener("click", () => {
  window.location.href = "../index.html";
});

// ── TOAST ──
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.querySelector(".toast-msg").textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}
