<?php

session_start();

//  CATALOGUE 
$FRAGRANCES = [
  ["id"=>1,  "name"=>"Ambré Étoile",  "family"=>"Oriental",         "badge"=>"Best Seller", "notes"=>"Vanilla · Amber · Sandalwood · Musk",        "price"=>1850000,  "img"=>"../assets/scents/AmbréÉtoile.jpg"],
  ["id"=>2,  "name"=>"Azure Mist",    "family"=>"Aquatic",          "badge"=>"New",         "notes"=>"Sea Salt · Bergamot · White Cedar · Vetiver", "price"=>1650000,  "img"=>"../assets/scents/Azure Mist.jpg"],
  ["id"=>3,  "name"=>"Noir Spice",    "family"=>"Woody Spicy",      "badge"=>"",            "notes"=>"Black Pepper · Oud · Leather · Tobacco",      "price"=>1950000,  "img"=>"../assets/scents/Noir Spice.jpg"],
  ["id"=>4,  "name"=>"Jardin Rose",   "family"=>"Floral",           "badge"=>"",            "notes"=>"Rose · Peony · Jasmine · Light Musk",         "price"=>1750000,  "img"=>"../assets/scents/Jardin Rose.jpg"],
  ["id"=>5,  "name"=>"Citrus Soleil", "family"=>"Citrus",           "badge"=>"",            "notes"=>"Grapefruit · Lemon · Neroli · Oakmoss",       "price"=>1550000,  "img"=>"../assets/scents/Citrus Soleil.jpg"],
  ["id"=>6,  "name"=>"Velvet Oud",    "family"=>"Oriental",         "badge"=>"Limited",     "notes"=>"Oud · Rose · Saffron · Benzoin",              "price"=>2250000,  "img"=>"../assets/scents/Velvet Oud.jpg"],
  ["id"=>7,  "name"=>"YSL Y EDP",     "family"=>"Woody Aromatic",   "badge"=>"Limited",     "notes"=>"Apple · Bergamot · Ginger · Sage",            "price"=>22500000, "img"=>"../assets/scents/YSL Y EDP.jpg"],
  ["id"=>8,  "name"=>"Montblanc",     "family"=>"Amber Spicy",      "badge"=>"Limited",     "notes"=>"Apple · Bergamot · Ginger · Sage",            "price"=>1100000,  "img"=>"../assets/scents/Montblanc.jpg"],
  ["id"=>9,  "name"=>"Rasasi Virtue", "family"=>"Oriental Woody",   "badge"=>"Limited",     "notes"=>"Oud · Rose · Saffron · Benzoin",              "price"=>2250000,  "img"=>"../assets/scents/Rasasi Virtue.jpg"],
  ["id"=>10, "name"=>"Dior Sauvage",  "family"=>"Aromatic Fougère", "badge"=>"Limited",     "notes"=>"Calabrian Bergamot · Lavender",               "price"=>4250000,  "img"=>"../assets/scents/Dior Sauvage.jpg"],
];

$FRAG_MAP = [];
foreach ($FRAGRANCES as $f) { $FRAG_MAP[$f['id']] = $f; }

//  PROMO CODES 
$PROMO_CODES = [
  'ASHA10'  => ['type'=>'percent', 'value'=>10,    'label'=>'10% off'],
  'ASHA20'  => ['type'=>'percent', 'value'=>20,    'label'=>'20% off'],
  'WELCOME' => ['type'=>'fixed',   'value'=>20000, 'label'=>'UGX 20,000 off'],
];

//  SESSION DEFAULTS ─
if (!isset($_SESSION['cart']))      $_SESSION['cart']      = [];
if (!isset($_SESSION['promo']))     $_SESSION['promo']     = null;
if (!isset($_SESSION['promo_msg'])) $_SESSION['promo_msg'] = '';
if (!isset($_SESSION['promo_ok']))  $_SESSION['promo_ok']  = false;
if (!isset($_SESSION['toast']))     $_SESSION['toast']     = '';

// 
// JSON ENDPOINT  — GET ?json=1  (used by index.js sidebar)
// 
if (isset($_GET['json'])) {
  header('Content-Type: application/json');
  $items    = [];
  $subtotal = 0;
  $count    = 0;
  foreach ($_SESSION['cart'] as $id => $qty) {
    if (!isset($FRAG_MAP[$id])) continue;
    $f        = $FRAG_MAP[$id];
    $items[]  = [
      'id'    => $f['id'],
      'name'  => $f['name'],
      'price' => $f['price'],
      'qty'   => (int)$qty,
      'img'   => $f['img'],
    ];
    $subtotal += $f['price'] * $qty;
    $count    += $qty;
  }
  echo json_encode([
    'items'    => $items,
    'count'    => $count,
    'subtotal' => $subtotal,
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

// 
// ACTION HANDLER  (POST → redirect → GET)
// 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'] ?? '';
  $id     = isset($_POST['id']) ? (int)$_POST['id'] : 0;

  if ($action === 'add' && isset($FRAG_MAP[$id])) {
    $_SESSION['cart'][$id] = ($_SESSION['cart'][$id] ?? 0) + 1;
    $_SESSION['toast']     = $FRAG_MAP[$id]['name'] . ' added to your bag';
  }
  if ($action === 'inc' && isset($_SESSION['cart'][$id])) {
    $_SESSION['cart'][$id]++;
  }
  if ($action === 'dec' && isset($_SESSION['cart'][$id])) {
    $_SESSION['cart'][$id]--;
    if ($_SESSION['cart'][$id] < 1) unset($_SESSION['cart'][$id]);
  }
  if ($action === 'remove' && isset($_SESSION['cart'][$id])) {
    unset($_SESSION['cart'][$id]);
    $_SESSION['toast'] = 'Item removed from your bag';
  }
  if ($action === 'promo') {
    $code = strtoupper(trim($_POST['code'] ?? ''));
    if ($code === '') {
      $_SESSION['promo']     = null;
      $_SESSION['promo_msg'] = 'Please enter a code.';
      $_SESSION['promo_ok']  = false;
    } elseif (isset($PROMO_CODES[$code])) {
      $_SESSION['promo']     = $code;
      $_SESSION['promo_msg'] = '✓ ' . $PROMO_CODES[$code]['label'] . ' applied!';
      $_SESSION['promo_ok']  = true;
      $_SESSION['toast']     = 'Promo code applied!';
    } else {
      $_SESSION['promo']     = null;
      $_SESSION['promo_msg'] = 'Invalid code. Try ASHA10 or WELCOME.';
      $_SESSION['promo_ok']  = false;
    }
  }

  // AJAX POST from index.js — return 204, no redirect needed
  if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) ||
      strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false) {
    http_response_code(204);
    exit;
  }

  // Normal form POST from cart.php — PRG redirect
  header('Location: ' . $_SERVER['PHP_SELF']);
  exit;
}

// 
// BUILD DISPLAY DATA  (GET page render)
// 
$cart_rows = [];
foreach ($_SESSION['cart'] as $id => $qty) {
  if (isset($FRAG_MAP[$id]))
    $cart_rows[] = array_merge($FRAG_MAP[$id], ['qty' => (int)$qty]);
}

$subtotal = 0;
foreach ($cart_rows as $row) { $subtotal += $row['price'] * $row['qty']; }

$discount     = 0;
$applied_code = $_SESSION['promo'];
if ($applied_code && isset($PROMO_CODES[$applied_code])) {
  $p        = $PROMO_CODES[$applied_code];
  $discount = $p['type'] === 'percent'
    ? (int)round($subtotal * $p['value'] / 100)
    : (int)$p['value'];
}
$total      = max(0, $subtotal - $discount);
$item_count = array_sum(array_column($cart_rows, 'qty'));

$cart_ids = array_map('intval', array_keys($_SESSION['cart']));
$upsell   = array_slice(
  array_values(array_filter($FRAGRANCES, fn($f) => !in_array($f['id'], $cart_ids))),
  0, 4
);

$toast = $_SESSION['toast'];
$_SESSION['toast'] = '';

function fmt(int $n): string  { return 'UGX ' . number_format($n); }
function e(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Bag | Asha Scents</title>
  <link rel="stylesheet" href="../css/cart.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <?php if ($toast): ?>
  <script>window.__TOAST__ = <?= json_encode($toast, JSON_UNESCAPED_UNICODE) ?>;</script>
  <?php endif; ?>
</head>
<body>

<!--  NAV  -->
<nav id="mainNav">
  <a href="../index.html" class="nav-logo">Asha <em>Scents</em></a>
  <ul class="nav-links">
    <li><a href="../index.html#fragrances">Fragrances</a></li>
    <li><a href="./about.html">Our Story</a></li>
    <li><a href="../index.html#guide">Scent Guide</a></li>
    <li><a href="./testimonials.html">Reviews</a></li>
  </ul>
  <button class="nav-bag" id="navBag" aria-label="View shopping bag">
    <i class="fas fa-shopping-bag" style="font-size:0.85rem"></i>
    <span class="nav-bag-count"><?= $item_count ?></span>
  </button>
  <button class="nav-hamburger" id="hamburger" aria-label="Open menu">
    <i class="fas fa-bars"></i>
  </button>
</nav>

<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-close" id="mobileClose"><i class="fas fa-times"></i></button>
  <a href="../index.html#fragrances">Fragrances</a>
  <a href="./about.html">Our Story</a>
  <a href="../index.html#guide">Scent Guide</a>
  <a href="./testimonials.html">Reviews</a>
  <a href="../index.html#contact">Contact</a>
</div>

<!--  MAIN  -->
<main>

  <div class="cart-page-header reveal">
    <div class="section-eyebrow">Shopping Bag</div>
    <h1>Your <em>Selections</em></h1>
    <p>
      <?php if ($item_count === 0): ?>Your bag is empty
      <?php else: ?>You have <?= $item_count ?> item<?= $item_count !== 1 ? 's' : '' ?> in your bag
      <?php endif; ?>
    </p>
  </div>

  <div class="cart-layout">

    <!-- ITEMS PANEL -->
    <div>
      <div class="cart-items-panel">
        <?php if (empty($cart_rows)): ?>
          <div class="cart-empty-state">
            <i class="fas fa-shopping-bag"></i>
            <h3>Your bag is empty</h3>
            <p>Discover our curated collection of luxury fragrances.</p>
            <a href="../index.html#fragrances" class="btn-shop">Explore Fragrances</a>
          </div>
        <?php else: ?>
          <?php foreach ($cart_rows as $item): ?>
            <div class="cart-item-row reveal">
              <img class="cart-item-img" src="<?= e($item['img']) ?>" alt="<?= e($item['name']) ?>">
              <div class="cart-item-info">
                <div class="cart-item-name"><?= e($item['name']) ?></div>
                <div class="cart-item-family"><?= e($item['family']) ?></div>
                <div class="cart-item-price-unit"><?= fmt($item['price']) ?> each</div>
                <div class="cart-qty">
                  <form method="POST" style="display:inline">
                    <input type="hidden" name="action" value="dec">
                    <input type="hidden" name="id" value="<?= $item['id'] ?>">
                    <button type="submit" class="qty-btn">−</button>
                  </form>
                  <span class="qty-num"><?= $item['qty'] ?></span>
                  <form method="POST" style="display:inline">
                    <input type="hidden" name="action" value="inc">
                    <input type="hidden" name="id" value="<?= $item['id'] ?>">
                    <button type="submit" class="qty-btn">+</button>
                  </form>
                </div>
              </div>
              <div class="cart-item-right">
                <div class="cart-item-line-price"><?= fmt($item['price'] * $item['qty']) ?></div>
                <form method="POST" style="display:inline">
                  <input type="hidden" name="action" value="remove">
                  <input type="hidden" name="id" value="<?= $item['id'] ?>">
                  <button type="submit" class="cart-item-remove">
                    <i class="fas fa-times"></i> Remove
                  </button>
                </form>
              </div>
            </div>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>

      <a href="../index.html#fragrances" class="continue-link">
        <i class="fas fa-arrow-left" style="font-size:0.6rem"></i> Continue Shopping
      </a>
    </div>

    <!-- ORDER SUMMARY -->
    <div class="order-summary reveal">
      <div class="summary-title">Order Summary</div>
      <div class="summary-row"><span>Subtotal</span><span><?= fmt($subtotal) ?></span></div>
      <div class="summary-row"><span>Shipping</span><span><?= $subtotal > 0 ? 'Calculated at checkout' : '—' ?></span></div>
      <div class="summary-row"><span>Discount</span><span><?= $discount > 0 ? '−' . fmt($discount) : '—' ?></span></div>
      <div class="summary-row total"><span>Total</span><span><?= fmt($total) ?></span></div>

      <div class="promo-wrap">
        <span class="promo-label">Promo Code</span>
        <form method="POST">
          <input type="hidden" name="action" value="promo">
          <div class="promo-input-row">
            <input type="text" name="code" class="promo-input" placeholder="e.g. ASHA10"
                   value="<?= e($applied_code ?? '') ?>" />
            <button type="submit" class="promo-btn">Apply</button>
          </div>
        </form>
        <?php if ($_SESSION['promo_msg']): ?>
          <div class="promo-msg <?= $_SESSION['promo_ok'] ? 'success' : 'error' ?>">
            <?= e($_SESSION['promo_msg']) ?>
          </div>
        <?php endif; ?>
      </div>

      <?php if (!empty($cart_rows)): ?>
        <form method="POST" action="checkout.php">
          <button type="submit" class="btn-checkout-full">Proceed to Checkout</button>
        </form>
      <?php else: ?>
        <button class="btn-checkout-full" disabled style="opacity:.5;cursor:not-allowed">
          Proceed to Checkout
        </button>
      <?php endif; ?>

      <p class="checkout-note">
        <i class="fas fa-lock"></i> Secure checkout &nbsp;·&nbsp; Free returns &nbsp;·&nbsp; Kampala delivery
      </p>
    </div>

  </div>

  <!-- UPSELL -->
  <?php if (!empty($upsell)): ?>
  <div class="upsell-section reveal">
    <div class="section-eyebrow">You May Also Like</div>
    <h2 class="section-title">Complete Your <em>Collection</em></h2>
    <div class="upsell-grid">
      <?php foreach ($upsell as $f): ?>
        <div class="upsell-card reveal">
          <div class="upsell-img">
            <img src="<?= e($f['img']) ?>" alt="<?= e($f['name']) ?>" loading="lazy">
          </div>
          <div class="upsell-body">
            <div class="upsell-name"><?= e($f['name']) ?></div>
            <div class="upsell-price"><?= fmt($f['price']) ?></div>
            <form method="POST">
              <input type="hidden" name="action" value="add">
              <input type="hidden" name="id" value="<?= $f['id'] ?>">
              <button type="submit" class="upsell-add">Add to Bag</button>
            </form>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
  <?php endif; ?>

</main>

<!-- TOAST -->
<div class="toast" id="toast" role="status" aria-live="polite">
  <i class="toast-icon fas fa-check"></i>
  <span class="toast-msg"></span>
</div>

<!-- FOOTER -->
<footer id="contact">
  <div class="footer-grid">
    <div>
      <div class="footer-brand">Asha <em>Scents</em></div>
      <p class="footer-about">Crafting exquisite fragrances since 2010. Where African heritage meets world-class artistry.</p>
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
      <address>Kampala, Uganda<br />+256 700 000 000<br /><br />
        <a href="mailto:babiryejk20@gmail.com">babiryejk20@gmail.com</a>
      </address>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2025 Asha Scents. All rights reserved.</p>
    <div class="footer-links">
      <a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Shipping Policy</a>
    </div>
  </div>
</footer>

<!-- MINIMAL JS — UI only -->
<script>
function showToast(msg) {
  const t = document.getElementById('toast');
  t.querySelector('.toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
if (typeof window.__TOAST__ === 'string' && window.__TOAST__) showToast(window.__TOAST__);

const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }), { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('hamburger') .addEventListener('click', () => document.getElementById('mobileMenu').classList.add('open'));
document.getElementById('mobileClose').addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
document.querySelectorAll('.mobile-menu a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'))
);
document.getElementById('navBag').addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
</script>

</body>
</html>