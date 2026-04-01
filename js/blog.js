// ── BLOG POSTS DATA ──
const POSTS = [
  {
    cat: "Perfumery",
    title: "The Art of Layering Fragrances",
    date: "Mar 2025",
    excerpt:
      "Discover how to create your own unique scent signature by combining two or more complementary fragrances for depth and longevity.",
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bf324093-565e-4d29-acc3-2879b9c0d508.png",
  },
  {
    cat: "Ingredients",
    title: "Oud: The Liquid Gold of Perfumery",
    date: "Feb 2025",
    excerpt:
      "We trace the journey of oud from the forests of Southeast Asia to our atelier in Kampala — and why it commands such reverence.",
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1a2f3403-e5d4-47c3-b36f-ecd9dbb81dde.png",
  },
  {
    cat: "Heritage",
    title: "African Botanicals in Modern Perfumery",
    date: "Jan 2025",
    excerpt:
      "Uganda's rich flora offers rare ingredients that define our house style. Meet the local botanicals at the heart of Mistry Scent.",
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bf324093-565e-4d29-acc3-2879b9c0d508.png",
  },
  {
    cat: "Guide",
    title: "How to Choose Your Signature Scent",
    date: "Dec 2024",
    excerpt:
      "A practical, sensory guide to identifying the fragrance families that speak to your personality and lifestyle.",
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1a2f3403-e5d4-47c3-b36f-ecd9dbb81dde.png",
  },
  {
    cat: "Care",
    title: "Making Your Fragrance Last All Day",
    date: "Nov 2024",
    excerpt:
      "Simple, expert-backed techniques to extend the life of your perfume from morning until evening.",
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bf324093-565e-4d29-acc3-2879b9c0d508.png",
  },
  {
    cat: "Story",
    title: "Behind the Bottle: Ambré Étoile",
    date: "Oct 2024",
    excerpt:
      "Our master perfumer shares the inspiration, iterations, and emotion behind our best-selling fragrance.",
    img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1a2f3403-e5d4-47c3-b36f-ecd9dbb81dde.png",
  },
];

function renderBlog() {
  document.getElementById("blogGrid").innerHTML = POSTS.map(
    (p) => `
        <div class="blog-card reveal">
            <div class="blog-img"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
            <div class="blog-body">
                <div class="blog-cat">${p.cat}</div>
                <h3 class="blog-title">${p.title}</h3>
                <p class="blog-excerpt">${p.excerpt}</p>
                <div class="blog-meta">
                    <span>${p.date}</span>
                    <span class="blog-read">Read more →</span>
                </div>
            </div>
        </div>
    `,
  ).join("");
  document
    .querySelectorAll(".blog-card.reveal")
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

// ── NEWSLETTER SUBSCRIBE ──
document.getElementById("subscribeBtn").addEventListener("click", () => {
  const email = document.getElementById("emailInput").value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !re.test(email)) {
    showToast("Please enter a valid email.", "fa-exclamation");
    return;
  }

  const subs = JSON.parse(localStorage.getItem("ashaSubscribers") || "[]");
  if (subs.includes(email)) {
    showToast("You're already subscribed!", "fa-info");
    return;
  }
  subs.push(email);
  localStorage.setItem("ashaSubscribers", JSON.stringify(subs));
  document.getElementById("emailInput").value = "";
  showToast("Welcome! 10% off code sent to your inbox.");
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
renderBlog();
