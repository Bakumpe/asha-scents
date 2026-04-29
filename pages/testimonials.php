<?php
session_start();

$base_reviews = [
  ["name"=>"Joseph",  "fragrance"=>"Ambré Étoile",  "stars"=>5,   "text"=>"Ambré Étoile is absolutely divine! The vanilla and amber dry-down is so sophisticated. I get compliments every time I wear it — totally worth the investment.", "img"=>"../assets/joseph.jpg"],
  ["name"=>"Elijah",  "fragrance"=>"Noir Spice",    "stars"=>5,   "text"=>"Noir Spice is my new signature. The peppery opening with smooth leather base is incredible — long-lasting and distinctive without being overpowering.", "img"=>"../assets/elijah.jpg"],
  ["name"=>"Tadeo",   "fragrance"=>"Azure Mist",    "stars"=>4.5, "text"=>"Azure Mist is such a perfect everyday fragrance. Light and fresh, but doesn't disappear after an hour like other aquatics I've tried. The packaging is gorgeous too.", "img"=>"../assets/tadeo.jpg"],
  ["name"=>"Ismail",  "fragrance"=>"Jardin Rose",   "stars"=>5,   "text"=>"I never expected a local brand to match international luxury houses. Jardin Rose is beautifully complex and lasts all day on my skin. Mistry Scent is incredible.", "img"=>"../assets/ismail.jpg"],
  ["name"=>"Faizol",  "fragrance"=>"Velvet Oud",    "stars"=>5,   "text"=>"Velvet Oud is the most luxurious thing I've ever worn. The saffron and rose over oud is breathtaking. Definitely a statement fragrance.", "img"=>"../assets/faizol.jpg"],
  ["name"=>"Stella",  "fragrance"=>"Citrus Soleil", "stars"=>4,   "text"=>"Citrus Soleil is my morning go-to. Bright, uplifting, and professional. Perfect for the office and lasts a solid 6 hours on me.", "img"=>"../assets/stella.jpg"],
];

$cart_count = 0;
if (!empty($_SESSION['cart'])) {
  foreach ($_SESSION['cart'] as $qty) $cart_count += (int)$qty;
}
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
    <title>Reviews | Mistry Scent</title>
    <link rel="stylesheet" href="../css/testimonials.css" />
  </head>
  <body>

    <!-- NAV -->
    <nav id="mainNav">
      <a href="../index.html" class="nav-logo">Mistry<em>Scents</em></a>
      <ul class="nav-links">
        <li><a href="../index.html#fragrances">Fragrances</a></li>
        <li><a href="./about.html">Our Story</a></li>
        <li><a href="../index.html#guide">Scent Guide</a></li>
        <li><a href="./testimonials.php" class="active">Reviews</a></li>
      </ul>
      <button class="nav-bag" id="navBag" aria-label="Open shopping bag">
        <i class="fas fa-shopping-bag" style="font-size: 0.85rem"></i>
        <span class="nav-bag-count" id="cartCount"><?= $cart_count ?></span>
      </button>
      <div class="nav-account">
        <a href="./login.php" id="nav-account" aria-label="User account">
          <i class="fas fa-user"></i>
        </a>
      </div>
      <button class="nav-hamburger" id="hamburger" aria-label="Open menu">
        <i class="fas fa-bars"></i>
      </button>
    </nav>

    <!-- MOBILE MENU -->
    <div class="mobile-menu" id="mobileMenu">
      <button class="mobile-close" id="mobileClose"><i class="fas fa-times"></i></button>
      <a href="../index.html#fragrances">Fragrances</a>
      <a href="./about.html">Our Story</a>
      <a href="../index.html#guide">Scent Guide</a>
      <a href="./testimonials.php">Reviews</a>
      <a href="../index.html#contact">Contact</a>
    </div>

    <!-- PAGE HERO -->
    <div class="page-hero reveal">
      <div class="section-eyebrow">Reviews</div>
      <h1>What Our Clients <em>Say</em></h1>
      <div class="divider" style="margin: 20px auto"></div>
      <p>Over 5,000 happy clients. Here's what they love about Mistry Scent.</p>
    </div>

    <!-- STATS BAR -->
    <div class="stats-bar">
      <div class="stat-block reveal"><div class="stat-big">5K+</div><div class="stat-lbl">Happy Clients</div></div>
      <div class="stat-block reveal"><div class="stat-big">4.9</div><div class="stat-lbl">Average Rating</div></div>
      <div class="stat-block reveal"><div class="stat-big">98%</div><div class="stat-lbl">Would Recommend</div></div>
      <div class="stat-block reveal"><div class="stat-big">2010</div><div class="stat-lbl">Est. in Uganda</div></div>
    </div>

    <!-- TESTIMONIALS GRID -->
    <section id="testimonials">
      <div class="testimonials-header reveal">
        <div class="section-eyebrow">Client Stories</div>
        <h2 class="section-title">Voices of Our <em>Community</em></h2>
      </div>
      <div class="testimonials-grid" id="testiGrid"></div>
    </section>

    <!-- REVIEW FORM -->
    <section class="review-form-section">
      <div class="review-form-inner reveal">
        <div class="section-eyebrow">Share Your Experience</div>
        <h2 class="section-title">Leave a <em>Review</em></h2>
        <div class="divider"></div>
        <p>We'd love to hear about your experience with Mistry Scent. Your feedback helps us craft even better fragrances.</p>
        <div class="form-group">
          <label>Your Name</label>
          <input type="text" id="reviewName" placeholder="e.g. Amara K." autocomplete="name" />
        </div>
        <div class="form-group">
          <label>Fragrance</label>
          <select id="reviewFragrance">
            <option value="">Select a fragrance…</option>
            <?php
            $fragrances = ["Ambré Étoile","Azure Mist","Noir Spice","Jardin Rose","Citrus Soleil","Velvet Oud","YSL Y EDP","Montblanc","Rasasi Virtue","Dior Sauvage"];
            foreach ($fragrances as $f) echo "<option>" . htmlspecialchars($f) . "</option>\n";
            ?>
          </select>
        </div>
        <div class="form-group">
          <label>Your Rating</label>
          <div class="star-rating">
            <input type="radio" id="s5" name="rating" value="5"><label for="s5">★</label>
            <input type="radio" id="s4" name="rating" value="4"><label for="s4">★</label>
            <input type="radio" id="s3" name="rating" value="3"><label for="s3">★</label>
            <input type="radio" id="s2" name="rating" value="2"><label for="s2">★</label>
            <input type="radio" id="s1" name="rating" value="1"><label for="s1">★</label>
          </div>
        </div>
        <div class="form-group">
          <label>Your Review</label>
          <textarea id="reviewText" placeholder="Tell us about your experience…"></textarea>
        </div>
        <button class="btn-submit" id="submitReview">Submit Review</button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer id="contact">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">Mistry<em>Scents</em></div>
          <p class="footer-about">Crafting exquisite fragrances since 2010. Where African heritage meets world-class artistry to create unforgettable scents.</p>
          <div class="footer-socials">
            <a href="#" class="footer-social" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" class="footer-social" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="footer-social" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
            <a href="#" class="footer-social" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="#">All Fragrances</a></li><li><a href="#">Best Sellers</a></li>
            <li><a href="#">New Arrivals</a></li><li><a href="#">Gift Sets</a></li>
            <li><a href="#">Travel Sizes</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>About</h4>
          <ul>
            <li><a href="#">Our Story</a></li><li><a href="#">Our Process</a></li>
            <li><a href="#">Sustainability</a></li><li><a href="#">Perfume Care</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <address>
            Kampala, Uganda<br />+256 700 000 000<br /><br />
            <a href="mailto:babiryejk20@gmail.com">babiryejk20@gmail.com</a>
          </address>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Mistry Scents. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Shipping Policy</a>
        </div>
      </div>
    </footer>

    <!-- TOAST -->
    <div class="toast" id="toast" role="status" aria-live="polite">
      <i class="toast-icon fas fa-check"></i>
      <span class="toast-msg"></span>
    </div>

    <script>
    // PHP injects base reviews as a JS constant — no separate .js file needed
    const BASE_REVIEWS = <?= json_encode($base_reviews, JSON_UNESCAPED_UNICODE) ?>;

    // ── SCROLL REVEAL ──
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── HELPERS ──
    function starsHTML(n) {
      let s = '★'.repeat(Math.floor(n));
      if (n % 1 >= 0.5) s += '½';
      return s;
    }

    function renderReviews() {
      const saved = JSON.parse(localStorage.getItem('ashaReviews') || '[]');
      const all   = [...saved, ...BASE_REVIEWS];
      const grid  = document.getElementById('testiGrid');
      grid.innerHTML = all.map(r => `
        <div class="testi-card reveal">
          <div class="testi-quote">"</div>
          <p class="testi-text">${r.text}</p>
          <div class="testi-footer">
            <div class="testi-avatar">
              <img src="${r.img || 'https://randomuser.me/api/portraits/lego/1.jpg'}"
                   alt="${r.name}"
                   onerror="this.src='https://randomuser.me/api/portraits/lego/1.jpg'">
            </div>
            <div>
              <div class="testi-name">${r.name}</div>
              <div class="testi-stars">${starsHTML(r.stars)}</div>
              ${r.fragrance ? `<div class="testi-fragrance">${r.fragrance}</div>` : ''}
            </div>
          </div>
        </div>
      `).join('');
      grid.querySelectorAll('.testi-card.reveal').forEach(el => observer.observe(el));
    }

    // ── TOAST ──
    let toastTimer;
    function showToast(msg, icon = 'fa-check') {
      const t = document.getElementById('toast');
      t.querySelector('.toast-icon').className = `toast-icon fas ${icon}`;
      t.querySelector('.toast-msg').textContent = msg;
      t.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
    }

    // ── SUBMIT REVIEW ──
    document.getElementById('submitReview').addEventListener('click', () => {
      const name      = document.getElementById('reviewName').value.trim();
      const fragrance = document.getElementById('reviewFragrance').value;
      const rating    = document.querySelector('input[name="rating"]:checked');
      const text      = document.getElementById('reviewText').value.trim();

      if (!name || !fragrance || !rating || !text) {
        showToast('Please fill in all fields.', 'fa-exclamation');
        return;
      }

      const saved = JSON.parse(localStorage.getItem('ashaReviews') || '[]');
      saved.unshift({ name, fragrance, stars: parseInt(rating.value), text, img: '' });
      localStorage.setItem('ashaReviews', JSON.stringify(saved));

      document.getElementById('reviewName').value      = '';
      document.getElementById('reviewFragrance').value = '';
      rating.checked = false;
      document.getElementById('reviewText').value      = '';

      renderReviews();
      showToast('Thank you for your review!');
      document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' });
    });

    // ── NAV ──
    window.addEventListener('scroll', () =>
      document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60)
    );
    document.getElementById('hamburger') .addEventListener('click', () => document.getElementById('mobileMenu').classList.add('open'));
    document.getElementById('mobileClose').addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
    document.querySelectorAll('.mobile-menu a').forEach(a =>
      a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'))
    );
    document.getElementById('navBag').addEventListener('click', () => {
      window.location.href = './cart.php';
    });

    // ── INIT ──
    renderReviews();
    </script>

  </body>
</html>