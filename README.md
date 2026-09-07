# Glowérive Natural Skincare — Shopify Online Store 2.0 Theme

> **"Skincare that cares, beauty that shines."**  
> A luxury, high-conversion Shopify Online Store 2.0 theme crafted for modern botanical, clean beauty, and organic skincare brands.

---

## 🌿 Theme Highlights

- **Shopify Online Store 2.0 Compliant**: Built with standard Liquid templates, dynamic sections, block architectures, and customizable settings schema.
- **Deep Emerald & Mint Palette**: Signature colors `#0e4643`, `#093634`, `#1b635e`, `#e6f3f0`, `#f7fbf9`, and warm gold `#d4a373`.
- **Typography**: Paired with Google Fonts *Playfair Display* (luxury editorial serif) and *Plus Jakarta Sans* (clean geometric sans-serif).
- **Interactive Slide-Out AJAX Cart Drawer**: Dynamic quantity controls, instant item removal, subtotal calculation, and a live "Free Shipping over $50" progress bar.
- **Shop by Category Rings**: Circular category tiles with smooth hover scale effects and active borders.
- **Featured Products Grid**: 4-column product layout with status badges (*Best Seller*, *New*, *Limited*, *Sale*), star ratings, quick add to cart, and wishlist toggle.
- **Brand Video Modal**: Embedded ritual video player trigger directly from the hero banner.
- **Mobile First & Responsive**: Optimized navigation drawer and touch-friendly interaction for mobile, tablet, and desktop devices.
- **Zero Local Dependencies**: Pure standalone code with CDN assets ready for immediate production deployment.

---

## 📁 Repository Structure

```
glowerive-shopify-theme/
├── assets/
│   ├── base.css                  # Theme stylesheet, design tokens, resets & components
│   └── theme.js                  # AJAX Cart Drawer, Wishlist, Video Modal & Navigation JS
├── config/
│   ├── settings_schema.json      # Theme customizer settings (colors, typography, cart, social)
│   └── settings_data.json        # Theme preset values & defaults
├── layout/
│   └── theme.liquid              # Master HTML layout, SEO meta tags, Google fonts, scripts
├── locales/
│   └── en.default.json           # Translations & locale strings
├── sections/
│   ├── announcement-bar.liquid   # Top announcement banner with shipping notice
│   ├── header.liquid             # Sticky navigation header, search, user, cart count badge
│   ├── hero-banner.liquid        # Radiant hero banner with model portrait & video trigger
│   ├── value-props.liquid        # Floating 4-prop feature bar
│   ├── category-grid.liquid      # Circular shop by category preview rings
│   ├── featured-products.liquid  # Product catalog grid with badges and pricing
│   ├── promo-club-banner.liquid  # 20% off offer and newsletter signup form
│   ├── trust-badges.liquid       # 4 customer assurance badges
│   ├── main-product.liquid       # Product detail page template section
│   ├── main-collection.liquid    # Collection listing section
│   ├── main-cart.liquid          # Standalone cart page section
│   ├── main-page.liquid          # General content page section
│   ├── main-404.liquid           # 404 error page section
│   └── footer.liquid             # Comprehensive brand footer and policy links
├── snippets/
│   ├── product-card.liquid       # Product card item snippet
│   ├── cart-drawer.liquid        # Slide-out AJAX cart drawer snippet
│   ├── icon.liquid               # Inline SVG icon library
│   └── price.liquid              # Price formatting snippet
├── templates/
│   ├── index.json                # Home page template connecting sections in order
│   ├── product.json              # Product page template
│   ├── collection.json           # Collection page template
│   ├── cart.json                 # Cart page template
│   ├── page.json                 # Page template
│   └── 404.json                  # 404 template
├── preview/
│   └── index.html                # Interactive browser preview for testing before upload
├── .gitignore                    # Standard Shopify gitignore
└── README.md                     # Documentation
```

---

## 🚀 How to Upload to GitHub

Open PowerShell or your terminal in this directory (`e:\glowerive-shopify-theme`):

```bash
# 1. Initialize Git repository
git init

# 2. Add all theme files
git add .

# 3. Create your initial commit
git commit -m "Initial commit: Glowérive Natural Skincare Shopify 2.0 Theme"

# 4. Rename main branch to main (if not already)
git branch -M main

# 5. Connect to your GitHub repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 6. Push to GitHub
git push -u origin main
```

---

## 🛍️ How to Install on Shopify

### Option A: Direct GitHub Integration (Recommended)
1. In your Shopify Admin, go to **Online Store** > **Themes**.
2. Under **Theme library**, click **Add theme** > **Connect from GitHub**.
3. Log in to GitHub, select your repository (`REPO_NAME`) and the `main` branch.
4. Shopify will automatically pull and deploy the theme! Any future commits to GitHub will automatically sync with your Shopify store.

### Option B: Upload as ZIP File
1. Compress the contents of `glowerive-shopify-theme` into a `.zip` file (make sure `layout`, `sections`, `templates`, `assets`, `config`, `locales` are in the root of the zip).
2. In your Shopify Admin, go to **Online Store** > **Themes**.
3. Click **Add theme** > **Upload zip file**.
4. Click **Customize** to open the visual theme editor!

### Option C: Using Shopify CLI
```bash
shopify theme dev --store your-store.myshopify.com
```

---

## 🧪 Local Preview

You can test the entire storefront locally without needing a Shopify server:
- Open `preview/index.html` directly in your browser.
- Test adding items to the cart drawer, updating quantities, seeing the free shipping progress bar dynamically adjust, toggling wishlist items, and testing mobile menu drawers.
