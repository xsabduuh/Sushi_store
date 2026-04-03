/* ============================================
   SAKURA SUSHI — script.js
   ============================================ */

/* ======= DATA ======= */
const CATEGORIES = [
  { id: 1, name: "Nigiri" },
  { id: 2, name: "Maki Rolls" },
  { id: 3, name: "Sashimi" },
  { id: 4, name: "Temaki" },
  { id: 5, name: "Uramaki" },
  { id: 6, name: "Specialties" },
];

const PRODUCTS = [
  { id:1,  name:"Salmon Nigiri",    desc:"Premium Atlantic salmon hand-pressed over seasoned sushi rice. Delicate, buttery texture with a clean ocean flavor.", price:14.00, catId:1, cat:"Nigiri",      img:"https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80", ingredients:["Atlantic Salmon","Sushi Rice","Wasabi","Nori"],                       cal:180, spice:0, veg:false, featured:true,  isNew:false, popular:true,  pcs:2 },
  { id:2,  name:"Tuna Nigiri",      desc:"Premium bluefin tuna over hand-pressed sushi rice. Rich, clean flavor with a silky finish.",                           price:16.00, catId:1, cat:"Nigiri",      img:"https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80", ingredients:["Bluefin Tuna","Sushi Rice","Wasabi","Soy Sauce"],                    cal:160, spice:0, veg:false, featured:true,  isNew:false, popular:true,  pcs:2 },
  { id:3,  name:"Yellowtail Nigiri",desc:"Buttery yellowtail with a mild, sweet flavor. A crowd favorite with delicate marbling.",                               price:15.00, catId:1, cat:"Nigiri",      img:"https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80", ingredients:["Yellowtail","Sushi Rice","Wasabi","Green Onion"],                    cal:170, spice:0, veg:false, featured:false, isNew:true,  popular:false, pcs:2 },
  { id:4,  name:"Dragon Roll",      desc:"Shrimp tempura inside, avocado layered on top like dragon scales. Drizzled with eel sauce.",                           price:22.00, origPrice:26.00, catId:5, cat:"Uramaki",   img:"https://images.unsplash.com/photo-1617196034154-4e8c71e8f1a7?w=600&q=80", ingredients:["Shrimp Tempura","Avocado","Cucumber","Eel Sauce","Sesame"],    cal:420, spice:1, veg:false, featured:true,  isNew:false, popular:true,  pcs:8 },
  { id:5,  name:"Spicy Tuna Roll",  desc:"Fresh tuna mixed with spicy mayo and cucumber. A perfect balance of heat and umami.",                                  price:18.00, catId:2, cat:"Maki Rolls", img:"https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=600&q=80", ingredients:["Tuna","Spicy Mayo","Cucumber","Nori","Sesame Seeds"],             cal:310, spice:2, veg:false, featured:true,  isNew:false, popular:true,  pcs:6 },
  { id:6,  name:"California Roll",  desc:"Classic crab, avocado and cucumber inside-out roll. A timeless crowd-pleaser.",                                        price:14.00, catId:5, cat:"Uramaki",   img:"https://images.unsplash.com/photo-1617196034232-5b2a5a57e0fb?w=600&q=80", ingredients:["Imitation Crab","Avocado","Cucumber","Sesame Seeds","Nori"],      cal:280, spice:0, veg:false, featured:false, isNew:false, popular:true,  pcs:8 },
  { id:7,  name:"Rainbow Roll",     desc:"California roll topped with an array of fresh fish — salmon, tuna, yellowtail and avocado.",                           price:24.00, catId:5, cat:"Uramaki",   img:"https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80", ingredients:["Salmon","Tuna","Yellowtail","Avocado","Cucumber","Crab"],          cal:480, spice:0, veg:false, featured:true,  isNew:false, popular:true,  pcs:8 },
  { id:8,  name:"Salmon Sashimi",   desc:"Five pristine slices of premium Atlantic salmon. Pure, unadulterated oceanic flavor.",                                 price:20.00, catId:3, cat:"Sashimi",    img:"https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80", ingredients:["Atlantic Salmon","Ginger","Wasabi","Daikon"],                       cal:200, spice:0, veg:false, featured:false, isNew:false, popular:true,  pcs:5 },
  { id:9,  name:"Tuna Sashimi",     desc:"Five slices of premium bluefin tuna. Deep red, meaty, and magnificently rich.",                                        price:22.00, catId:3, cat:"Sashimi",    img:"https://images.unsplash.com/photo-1617196034148-8b18a5e7b0a0?w=600&q=80", ingredients:["Bluefin Tuna","Ginger","Wasabi","Soy Sauce"],                       cal:180, spice:0, veg:false, featured:false, isNew:true,  popular:false, pcs:5 },
  { id:10, name:"Veggie Roll",      desc:"Fresh cucumber, avocado, pickled radish and carrot rolled in nori. Light and vibrant.",                                price:12.00, catId:2, cat:"Maki Rolls", img:"https://images.unsplash.com/photo-1617196034099-e3dc2fb23a80?w=600&q=80", ingredients:["Cucumber","Avocado","Pickled Radish","Carrot","Nori","Sesame"],   cal:200, spice:0, veg:true,  featured:false, isNew:false, popular:false, pcs:6 },
  { id:11, name:"Salmon Temaki",    desc:"Hand-rolled cone filled with salmon, avocado and sushi rice. Fresh, immediate, delicious.",                            price:12.00, catId:4, cat:"Temaki",     img:"https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80", ingredients:["Salmon","Avocado","Sushi Rice","Nori","Sesame"],                    cal:280, spice:0, veg:false, featured:false, isNew:true,  popular:false, pcs:1 },
  { id:12, name:"Omakase Platter",  desc:"Chef's selection of 12 pieces: nigiri, sashimi and specialty rolls. The ultimate sushi experience.",                   price:65.00, origPrice:78.00, catId:6, cat:"Specialties",img:"https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80", ingredients:["Chef's Selection","Seasonal Fish","Premium Ingredients"],      cal:850, spice:1, veg:false, featured:true,  isNew:false, popular:true,  pcs:12 },
  { id:13, name:"Volcano Roll",     desc:"Spicy tuna inside, baked scallop and spicy mayo on top. Finished with tobiko.",                                        price:26.00, catId:6, cat:"Specialties",img:"https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80", ingredients:["Spicy Tuna","Scallop","Spicy Mayo","Tobiko","Cucumber"],          cal:520, spice:3, veg:false, featured:true,  isNew:true,  popular:false, pcs:8 },
];

/* ======= ICONS (inline SVG strings) ======= */
const ICONS = {
  bag:     `<svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  arrow:   `<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>`,
  arrowL:  `<svg viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  trash:   `<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  minus:   `<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  plus:    `<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  check:   `<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  loader:  `<svg viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>`,
};

/* ======= CART ======= */
let cart = [];
function loadCart() {
  try { cart = JSON.parse(localStorage.getItem("sakura_cart") || "[]"); } catch { cart = []; }
}
function saveCart() { localStorage.setItem("sakura_cart", JSON.stringify(cart)); }
function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function cartSubtotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function addToCart(product, qty = 1, notes = "") {
  const ex = cart.find(i => i.id === product.id);
  if (ex) { ex.qty += qty; }
  else { cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty, notes }); }
  saveCart(); updateNavBadge();
  showToast("Added to cart", `${qty}× ${product.name}`);
}
function updateQty(id, qty) {
  if (qty < 1) { cart = cart.filter(i => i.id !== id); }
  else { const item = cart.find(i => i.id === id); if (item) item.qty = qty; }
  saveCart(); updateNavBadge();
}
function removeItem(id) { cart = cart.filter(i => i.id !== id); saveCart(); updateNavBadge(); }
function clearCart() { cart = []; saveCart(); updateNavBadge(); }

/* ======= TOAST ======= */
let toastTimer;
function showToast(title, body) {
  const t = document.getElementById("toast");
  t.querySelector(".toast-title").textContent = title;
  t.querySelector(".toast-body").textContent = body;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3000);
}

/* ======= NAV BADGE ======= */
function updateNavBadge() {
  const n = cartCount();
  document.querySelectorAll(".cart-badge").forEach(b => {
    b.textContent = n;
    b.classList.toggle("visible", n > 0);
  });
}

/* ======= NAV SCROLL ======= */
window.addEventListener("scroll", () => {
  document.getElementById("nav").classList.toggle("scrolled", window.scrollY > 20);
});

/* ======= ROUTER (hash-based) ======= */
function navigate(path) {
  window.location.hash = path;
  window.scrollTo(0, 0);
}
function getRoute() { return window.location.hash.slice(1) || "/"; }
window.addEventListener("hashchange", render);
window.addEventListener("load", () => { loadCart(); updateNavBadge(); render(); });

function render() {
  const route = getRoute();
  const app = document.getElementById("app");

  // Determine active nav
  document.querySelectorAll(".nav-link").forEach(l => {
    const href = l.dataset.href;
    l.classList.toggle("active", route === href || (href === "/" && route === ""));
  });

  if (route === "/" || route === "") { renderHome(app); }
  else if (route === "/menu") { renderMenu(app); }
  else if (route.startsWith("/product/")) {
    const id = parseInt(route.split("/")[2]);
    renderProduct(app, id);
  }
  else if (route === "/cart") { renderCart(app); }
  else if (route === "/success") { renderSuccess(app); }
  else { app.innerHTML = `<div class="container" style="padding:80px 0;text-align:center"><h2>Page not found</h2><br><button onclick="navigate('/')" class="btn btn-primary">Go Home</button></div>`; }
}

/* ======= PRODUCT CARD HTML ======= */
function productCardHTML(p, index) {
  const badge = p.isNew ? `<span class="product-badge">NEW</span>`
    : p.popular ? `<span class="product-badge popular">POPULAR</span>` : "";
  const icons = (p.veg ? `<span class="product-icon icon-veg" title="Vegetarian">🌿</span>` : "")
    + (p.spice > 0 ? `<span class="product-icon icon-spicy" title="Spicy">${"🌶".repeat(p.spice)}</span>` : "");
  return `
  <div class="product-card" onclick="navigate('/product/${p.id}')" style="animation-delay:${index*0.07}s">
    <div class="product-img-wrap">
      ${badge}
      <div class="product-icons">${icons}</div>
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
    </div>
    <div class="product-info">
      <div class="product-header">
        <span class="product-name">${p.name}</span>
        <span class="product-price">$${p.price.toFixed(2)}</span>
      </div>
      <p class="product-cat">${p.cat}</p>
      <p class="product-desc">${p.desc}</p>
      <div class="product-footer">
        <span class="product-meta">${p.pcs ? p.pcs+" pcs" : ""} ${p.cal ? "· "+p.cal+" kcal" : ""}</span>
        <button class="add-btn" onclick="event.stopPropagation(); addToCart(PRODUCTS.find(x=>x.id===${p.id}), 1)">${ICONS.plus}</button>
      </div>
    </div>
  </div>`;
}

/* ======= HOME PAGE ======= */
function renderHome(app) {
  const featured = PRODUCTS.filter(p => p.featured);
  app.innerHTML = `
  <!-- HERO -->
  <section class="hero">
    <div class="hero-img"></div>
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          Premium Omakase
        </div>
        <h1 class="hero-title font-display">Artistry in<br><em>Every Bite.</em></h1>
        <p class="hero-subtitle">
          Experience Tokyo's finest omakase tradition delivered to your door.
          Freshly sourced ingredients, masterful technique, uncompromising quality.
        </p>
        <button class="btn btn-primary" onclick="navigate('/menu')">
          EXPLORE MENU ${ICONS.arrow}
        </button>
      </div>
    </div>
  </section>

  <!-- CATEGORIES -->
  <section class="section-categories">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title font-display">Collections</h2>
        <span class="section-link" onclick="navigate('/menu')">View All ${ICONS.chevron}</span>
      </div>
      <div class="cats-scroll">
        ${CATEGORIES.map(c => `
          <div class="cat-card" onclick="navigate('/menu?cat=${c.id}')">
            <span class="cat-name font-display">${c.name}</span>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- FEATURED -->
  <section class="section-featured">
    <div class="container">
      <div class="section-featured-top">
        <div>
          <p class="section-eyebrow">Chef's Selection</p>
          <h2 class="section-big-title font-display">Featured Signatures</h2>
        </div>
        <p class="section-desc">
          Our master chef's daily recommendations, highlighting the season's finest catches and most exquisite flavor profiles.
        </p>
      </div>
      <div class="product-grid">
        ${featured.map((p,i) => productCardHTML(p, i)).join("")}
      </div>
      <div style="text-align:center;margin-top:52px">
        <button class="btn btn-outline" onclick="navigate('/menu')">VIEW FULL MENU</button>
      </div>
    </div>
  </section>

  ${footerHTML()}`;
}

/* ======= MENU PAGE ======= */
let menuState = { cat: undefined, diet: "all", sort: "popular", search: "" };

function renderMenu(app) {
  // Read cat from URL
  const hash = window.location.hash;
  const catMatch = hash.match(/cat=(\d+)/);
  if (catMatch) menuState.cat = parseInt(catMatch[1]);

  app.innerHTML = `
  <div class="menu-header">
    <div class="container">
      <h1 class="menu-title font-display">Our Menu</h1>
      <p class="menu-subtitle">Explore our collection of meticulously crafted sushi, sashimi, and warm dishes.</p>
    </div>
  </div>

  <div class="menu-body">
    <div class="container">
      <div class="menu-layout">
        <!-- Sidebar -->
        <aside class="menu-sidebar">
          <input class="menu-search" id="menuSearch" placeholder="Search products..." value="${menuState.search}" />

          <div class="sidebar-section">
            <p class="sidebar-heading font-display">Categories</p>
            <button class="filter-btn ${!menuState.cat ? "active" : ""}" onclick="setMenuCat(undefined)">
              All Items
            </button>
            ${CATEGORIES.map(c => `
              <button class="filter-btn ${menuState.cat === c.id ? "active" : ""}" onclick="setMenuCat(${c.id})">
                ${c.name}
                <span class="filter-count">${PRODUCTS.filter(p=>p.catId===c.id).length}</span>
              </button>
            `).join("")}
          </div>

          <div class="sidebar-section">
            <p class="sidebar-heading font-display">Dietary</p>
            <button class="filter-btn ${menuState.diet==="all"?"active":""}" onclick="setMenuDiet('all')">All</button>
            <button class="filter-btn ${menuState.diet==="veg"?"active":""}" onclick="setMenuDiet('veg')">🌿 Vegetarian</button>
            <button class="filter-btn ${menuState.diet==="spicy"?"active":""}" onclick="setMenuDiet('spicy')">🌶 Spicy</button>
          </div>
        </aside>

        <!-- Main -->
        <div class="menu-main">
          <div class="menu-topbar">
            <p class="menu-count" id="menuCount"></p>
            <select class="sort-select" id="menuSort" onchange="setMenuSort(this.value)">
              <option value="popular" ${menuState.sort==="popular"?"selected":""}>Most Popular</option>
              <option value="price_asc" ${menuState.sort==="price_asc"?"selected":""}>Price: Low to High</option>
              <option value="price_desc" ${menuState.sort==="price_desc"?"selected":""}>Price: High to Low</option>
              <option value="name" ${menuState.sort==="name"?"selected":""}>Name</option>
            </select>
          </div>
          <div class="product-grid" id="menuGrid"></div>
        </div>
      </div>
    </div>
  </div>

  ${footerHTML()}`;

  // Bind search
  document.getElementById("menuSearch").addEventListener("input", e => {
    menuState.search = e.target.value;
    refreshMenuGrid();
  });

  refreshMenuGrid();
}

function setMenuCat(id) { menuState.cat = id; renderMenu(document.getElementById("app")); }
function setMenuDiet(d) { menuState.diet = d; renderMenu(document.getElementById("app")); }
function setMenuSort(s) { menuState.sort = s; refreshMenuGrid(); }
function refreshMenuGrid() {
  let list = [...PRODUCTS];
  if (menuState.cat) list = list.filter(p => p.catId === menuState.cat);
  if (menuState.diet === "veg") list = list.filter(p => p.veg);
  if (menuState.diet === "spicy") list = list.filter(p => p.spice > 0);
  if (menuState.search.trim()) list = list.filter(p => p.name.toLowerCase().includes(menuState.search.toLowerCase()));
  if (menuState.sort === "price_asc") list.sort((a,b) => a.price - b.price);
  else if (menuState.sort === "price_desc") list.sort((a,b) => b.price - a.price);
  else if (menuState.sort === "name") list.sort((a,b) => a.name.localeCompare(b.name));
  else list.sort((a,b) => (b.popular?1:0) - (a.popular?1:0));

  const grid = document.getElementById("menuGrid");
  const countEl = document.getElementById("menuCount");
  if (countEl) countEl.innerHTML = `Showing <strong>${list.length}</strong> results`;

  if (!list.length) {
    grid.innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:60px;background:var(--bg-card);border:1px solid var(--border);border-radius:16px">
      <p style="font-size:40px;margin-bottom:12px">🍣</p>
      <h3 class="font-display" style="font-size:20px;margin-bottom:8px">No products found</h3>
      <p style="color:var(--muted);margin-bottom:20px">Try clearing your filters.</p>
      <button class="btn btn-outline" onclick="menuState={cat:undefined,diet:'all',sort:'popular',search:''};renderMenu(document.getElementById('app'))">Clear Filters</button>
    </div>`;
    return;
  }
  grid.innerHTML = list.map((p,i) => productCardHTML(p,i)).join("");
}

/* ======= PRODUCT DETAIL PAGE ======= */
function renderProduct(app, id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) { app.innerHTML = `<div class="container" style="padding:80px 0;text-align:center"><h2>Product not found</h2></div>`; return; }

  app.innerHTML = `
  <div class="container" style="padding:40px 0 80px">
    <span class="back-link" onclick="history.back()">
      ${ICONS.arrowL} Back to Menu
    </span>

    <div class="product-detail">
      <!-- Image -->
      <div class="detail-img">
        ${p.isNew ? `<span class="product-badge">NEW</span>` : p.popular ? `<span class="product-badge popular">POPULAR</span>` : ""}
        <img src="${p.img}" alt="${p.name}" />
      </div>

      <!-- Info -->
      <div class="detail-content">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
          <span class="detail-cat">${p.cat}</span>
          <div class="detail-tags">
            ${p.veg ? `<span class="detail-tag tag-veg">🌿 Vegetarian</span>` : ""}
            ${p.spice > 0 ? `<span class="detail-tag tag-spicy">${"🌶".repeat(p.spice)} Spicy</span>` : ""}
          </div>
        </div>
        <h1 class="detail-name font-display">${p.name}</h1>
        <div class="detail-prices">
          <span class="detail-price">$${p.price.toFixed(2)}</span>
          ${p.origPrice ? `<span class="detail-original">$${p.origPrice.toFixed(2)}</span>` : ""}
        </div>
        <p class="detail-desc">${p.desc}</p>

        <div class="detail-specs">
          ${p.pcs ? `<div><p class="spec-label">Serving Size</p><p class="spec-value">${p.pcs} Pieces</p></div>` : ""}
          ${p.cal ? `<div><p class="spec-label">Calories</p><p class="spec-value">${p.cal} kcal</p></div>` : ""}
          ${p.ingredients.length ? `
          <div style="grid-column:1/-1">
            <p class="spec-label">Key Ingredients</p>
            <div class="ingredients-list">
              ${p.ingredients.map(i => `<span class="ingredient-tag">${i}</span>`).join("")}
            </div>
          </div>` : ""}
        </div>

        <label class="notes-label">Special Instructions</label>
        <textarea class="notes-input" id="detailNotes" rows="3" placeholder="Any dietary preferences or allergies?"></textarea>

        <div class="add-to-cart-row">
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeDetailQty(-1)">${ICONS.minus}</button>
            <span class="qty-num" id="detailQty">1</span>
            <button class="qty-btn" onclick="changeDetailQty(1)">${ICONS.plus}</button>
          </div>
          <button class="add-cart-btn" id="addCartBtn" onclick="addFromDetail(${p.id})">
            ${ICONS.bag}
            <span id="addCartLabel">ADD TO ORDER — $${p.price.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  ${footerHTML()}`;
}

let detailQty = 1;
function changeDetailQty(delta) {
  detailQty = Math.max(1, detailQty + delta);
  document.getElementById("detailQty").textContent = detailQty;
  const p = PRODUCTS.find(x => x.id === parseInt(window.location.hash.split("/")[2]));
  if (p) document.getElementById("addCartLabel").textContent = `ADD TO ORDER — $${(p.price * detailQty).toFixed(2)}`;
}
function addFromDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  const notes = document.getElementById("detailNotes")?.value || "";
  addToCart(p, detailQty, notes);
  const btn = document.getElementById("addCartBtn");
  btn.classList.add("added");
  document.getElementById("addCartLabel").textContent = "ADDED!";
  setTimeout(() => {
    btn.classList.remove("added");
    document.getElementById("addCartLabel").textContent = `ADD TO ORDER — $${(p.price * detailQty).toFixed(2)}`;
  }, 2000);
}

/* ======= CART PAGE ======= */
function renderCart(app) {
  const subtotal = cartSubtotal();
  const delivery = subtotal > 50 ? 0 : 5;
  const total = subtotal + delivery;

  if (!cart.length) {
    app.innerHTML = `
    <div class="container" style="padding:60px 0 80px">
      <div class="cart-header">
        <h1 class="cart-title font-display">Your Order</h1>
      </div>
      <div class="cart-empty">
        <div class="cart-empty-icon">${ICONS.bag}</div>
        <h2>Your cart is empty</h2>
        <p>You haven't added any premium sushi to your order yet.</p>
        <button class="btn btn-primary" onclick="navigate('/menu')">BROWSE MENU ${ICONS.arrow}</button>
      </div>
    </div>
    ${footerHTML()}`;
    return;
  }

  app.innerHTML = `
  <div class="container" style="padding:60px 0 80px">
    <div class="cart-header">
      <h1 class="cart-title font-display">Your Order</h1>
      <button class="clear-btn" onclick="clearCart();renderCart(document.getElementById('app'))">${ICONS.trash} Clear Cart</button>
    </div>
    <div class="cart-layout">
      <!-- Items -->
      <div class="cart-items" id="cartItems">
        ${cart.map(item => cartItemHTML(item)).join("")}
      </div>

      <!-- Summary -->
      <div class="order-summary">
        <h3 class="summary-title font-display">Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal (${cartCount()} items)</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Delivery Fee</span>
          <span>${delivery === 0 ? "Free" : "$"+delivery.toFixed(2)}</span>
        </div>
        ${delivery > 0 ? `<p class="summary-free">Free delivery on orders over $50</p>` : ""}
        <div class="summary-total-row">
          <span class="summary-total-label">Total</span>
          <span class="summary-total">$${total.toFixed(2)}</span>
        </div>
        <p class="summary-time">Est. delivery: 25-35 min</p>
        <div class="promo-row">
          <input class="promo-input" placeholder="Promo code" />
          <button class="promo-apply-btn">Apply</button>
        </div>
        <button class="checkout-btn" id="checkoutBtn" onclick="handleCheckout()">
          PLACE ORDER ${ICONS.arrow}
        </button>
      </div>
    </div>
  </div>
  ${footerHTML()}`;
}

function cartItemHTML(item) {
  return `
  <div class="cart-item" id="cartItem${item.id}">
    <div class="cart-item-img">
      <img src="${item.img}" alt="${item.name}" loading="lazy" />
    </div>
    <div class="cart-item-info">
      <p class="cart-item-name" onclick="navigate('/product/${item.id}')">${item.name}</p>
      <p class="cart-item-price-each">$${item.price.toFixed(2)} each</p>
      <div class="cart-item-controls">
        <div class="item-qty">
          <button class="item-qty-btn" onclick="cartChange(${item.id}, ${item.qty-1})">${ICONS.minus}</button>
          <span class="item-qty-num">${item.qty}</span>
          <button class="item-qty-btn" onclick="cartChange(${item.id}, ${item.qty+1})">${ICONS.plus}</button>
        </div>
      </div>
    </div>
    <div class="cart-item-right">
      <span class="item-subtotal">$${(item.price * item.qty).toFixed(2)}</span>
      <button class="remove-btn" onclick="cartRemove(${item.id})">${ICONS.trash}</button>
    </div>
  </div>`;
}

function cartChange(id, qty) { updateQty(id, qty); renderCart(document.getElementById("app")); }
function cartRemove(id) { removeItem(id); renderCart(document.getElementById("app")); }

function handleCheckout() {
  const btn = document.getElementById("checkoutBtn");
  btn.classList.add("loading");
  btn.innerHTML = `<span class="spin" style="display:inline-block">${ICONS.loader}</span> PLACING ORDER...`;
  setTimeout(() => {
    const order = "SKR-" + Date.now().toString().slice(-8);
    clearCart();
    window.location.hash = `/success?order=${order}&time=25-35 min`;
  }, 1400);
}

/* ======= SUCCESS PAGE ======= */
function renderSuccess(app) {
  const hash = window.location.hash;
  const orderMatch = hash.match(/order=([^&]+)/);
  const timeMatch = hash.match(/time=([^&]+)/);
  const orderNum = orderMatch ? decodeURIComponent(orderMatch[1]) : "SKR-XXXXXXXX";
  const time = timeMatch ? decodeURIComponent(timeMatch[1]) : "25-35 min";

  app.innerHTML = `
  <div class="success-page">
    <div class="container">
      <div class="success-card">
        <div class="success-icon">✓</div>
        <h1 class="success-title font-display">Order Confirmed!</h1>
        <p class="success-subtitle">
          Thank you for choosing Sakura Sushi. Our master chefs are preparing your omakase experience.
        </p>
        <div class="success-details">
          <div class="success-row">
            <span class="success-row-label">Order Number</span>
            <span class="success-row-value">${orderNum}</span>
          </div>
          <div class="success-row">
            <span class="success-row-label">Est. Delivery Time</span>
            <span class="success-row-value highlight">${time}</span>
          </div>
        </div>
        <button class="success-back" onclick="navigate('/')">
          RETURN HOME ${ICONS.arrow}
        </button>
      </div>
    </div>
  </div>
  ${footerHTML()}`;
}

/* ======= FOOTER ======= */
function footerHTML() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <div class="nav-logo" onclick="navigate('/')">
          <div class="nav-logo-circle">S</div>
          <span class="nav-logo-text">SAKURA SUSHI</span>
        </div>
        <p class="footer-copy">© ${new Date().getFullYear()} Sakura Sushi. Crafted with intention.</p>
      </div>
    </div>
  </footer>`;
}

/* ======= MOBILE MENU TOGGLE ======= */
window.toggleMobileMenu = function() {
  document.getElementById("mobileMenu").classList.toggle("open");
};
