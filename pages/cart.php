<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Bag | Mistry Scent</title>
    <link rel="stylesheet" href="../css/cart.css" ></link>
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
        <i class="fas fa-shopping-bag" style="font-size: 0.85rem"></i>
        <span class="nav-bag-count" id="cartCount">0</span>
      </button>
      <button class="nav-hamburger" id="hamburger" aria-label="Open menu">
        <i class="fas fa-bars"></i>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
      <button class="mobile-close" id="mobileClose">
        <i class="fas fa-times"></i>
      </button>
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
        <p id="cartSummaryLine">You have 0 items in your bag</p>
      </div>

      <!-- ── CART LAYOUT ── -->
      <div class="cart-layout" id="cartLayout">
        <!-- Items Panel -->
        <div>
          <div class="cart-items-panel" id="cartItemsPanel">
            <!-- Rendered by JS -->
          </div>
          <a href="../index.html#fragrances" class="continue-link">
            <i class="fas fa-arrow-left" style="font-size: 0.6rem"></i> Continue
            Shopping
          </a>
        </div>

        <!-- Order Summary -->
        <div class="order-summary reveal" id="orderSummary">
          <div class="summary-title">Order Summary</div>

          <div class="summary-row">
            <span>Subtotal</span><span id="summarySubtotal">UGX 0</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span><span id="summaryShipping">—</span>
          </div>
          <div class="summary-row">
            <span>Discount</span><span id="summaryDiscount">—</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span id="summaryTotal">UGX 0</span>
          </div>

          <!-- Promo Code -->
          <div class="promo-wrap">
            <span class="promo-label">Promo Code</span>
            <div class="promo-input-row">
              <input
                type="text"
                class="promo-input"
                id="promoInput"
                placeholder="e.g. ASHA10"
              />
              <button class="promo-btn" id="promoBtn">Apply</button>
            </div>
            <div class="promo-msg" id="promoMsg"></div>
          </div>

          <button class="btn-checkout-full" id="btnCheckout">
            Proceed to Checkout
          </button>
          <p class="checkout-note">
            <i class="fas fa-lock"></i> Secure checkout &nbsp;·&nbsp; Free
            returns &nbsp;·&nbsp; Kampala delivery
          </p>
        </div>
      </div>

      <!-- ── UPSELL ── -->
      <div class="upsell-section reveal" id="upsellSection">
        <div class="section-eyebrow">You May Also Like</div>
        <h2 class="section-title">Complete Your <em>Collection</em></h2>
        <div class="upsell-grid" id="upsellGrid"></div>
      </div>
    </main>

    <!--  TOAST  -->
    <div class="toast" id="toast" role="status" aria-live="polite">
      <i class="toast-icon fas fa-check"></i>
      <span class="toast-msg"></span>
    </div>

    <!--  FOOTER  -->
    <footer id="contact">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">Asha <em>Scents</em></div>
          <p class="footer-about">
            Crafting exquisite fragrances since 2010. Where African heritage
            meets world-class artistry to create unforgettable scents.
          </p>
          <div class="footer-socials">
            <a href="#" class="footer-social" aria-label="Instagram"
              ><i class="fab fa-instagram"></i
            ></a>
            <a href="#" class="footer-social" aria-label="Facebook"
              ><i class="fab fa-facebook-f"></i
            ></a>
            <a href="#" class="footer-social" aria-label="Pinterest"
              ><i class="fab fa-pinterest-p"></i
            ></a>
            <a href="#" class="footer-social" aria-label="TikTok"
              ><i class="fab fa-tiktok"></i
            ></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="#">All Fragrances</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Gift Sets</a></li>
            <li><a href="#">Travel Sizes</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>About</h4>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Our Process</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Perfume Care</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <address>
            Kampala, Uganda<br />+256 700 000 000<br /><br /><a
              href="mailto:babiryejk20@gmail.com"
              >babiryejk20@gmail.com</a
            >
          </address>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 Mistry Scent. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a><a href="#">Terms of Service</a
          ><a href="#">Shipping Policy</a>
        </div>
      </div>
    </footer>

    <script src="../js/cart.js"></script>
  </body>
</html>
