// بيانات المنتجات
const products = [
    {
        id: 1,
        name: "سوشي السلمون الخاص",
        category: "sushi",
        price: 45,
        image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400",
        description: "6 قطع من freshest السلمون مع الأفوكادو"
    },
    {
        id: 2,
        name: "رولز كاليفورنيا",
        category: "rolls",
        price: 38,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
        description: "سلطعون، الأفوكادو، الخيار مع السمسم"
    },
    {
        id: 3,
        name: "ساشيمي التونة",
        category: "sashimi",
        price: 55,
        image: "https://images.unsplash.com/photo-1534256958597-7fe685cbd745?w=400",
        description: "8 قطع من أفضل أنواع التونة الحمراء"
    },
    {
        id: 4,
        name: "سوشي الروبيان المقلي",
        category: "sushi",
        price: 42,
        image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400",
        description: "روبيان مقلي مقرمش مع صوص الترياكي"
    },
    {
        id: 5,
        name: "رولز التنين",
        category: "rolls",
        price: 48,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
        description: "سلمون، أفوكادو، الخيار مع صوص السبايسي"
    },
    {
        id: 6,
        name: "ساشيمي السلمون",
        category: "sashimi",
        price: 50,
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400",
        description: "10 قطع من السلمون النرويجي الطازج"
    },
    {
        id: 7,
        name: "شاي أخضر ياباني",
        category: "drinks",
        price: 15,
        image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400",
        description: "شاي ماتشا أصيل من اليابان"
    },
    {
        id: 8,
        name: "ميسو سوشي",
        category: "sushi",
        price: 35,
        image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=400",
        description: "توفو، أعشاب بحرية، مع صوص الميسو"
    }
];

// سلة التسوق
let cart = JSON.parse(localStorage.getItem('sushiCart')) || [];

// تحميل المنتجات
function loadProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// إنشاء بطاقة المنتج
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">${product.price} ر.س</span>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `;
    return card;
}

// ترجمة الفئات
function getCategoryName(category) {
    const names = {
        sushi: 'سوشي',
        sashimi: 'ساشيمي',
        rolls: 'رولز',
        drinks: 'مشروبات'
    };
    return names[category] || category;
}

// إضافة للسلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    showToast('تمت الإضافة للسلة بنجاح!', 'success');
}

// حفظ السلة
function saveCart() {
    localStorage.setItem('sushiCart', JSON.stringify(cart));
}

// تحديث واجهة السلة
function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // تحديث العدد
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // تحديث العناصر
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>السلة فارغة</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} ر.س</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <i class="fas fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
            </div>
        `).join('');
    }
    
    // تحديث الإجمالي
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total} ر.س`;
}

// تحديث الكمية
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
           span>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    <img src="https://images.unsplash.com/photo-1553621042-f6e147245754?w=800" alt="طاهي سوشي">
                </div>
            </div>
        </div>
    </section>

    <!-- سلة التسوق -->
    <div class="cart-sidebar" id="cartSidebar">
        <div class="cart-header">
            <h3>سلة التسوق</h3>
            <button class="close-cart" onclick="toggleCart()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="cart-items" id="cartItems">
            <!-- عناصر السلة تُضاف عبر JavaScript -->
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>الإجمالي:</span>
                <span id="cartTotal">0 ر.س</span>
            </div>
            <button class="checkout-btn" onclick="checkout()">إتمام الطلب</button>
        </div>
    </div>
    <div class="overlay" id="overlay" onclick="toggleCart()"></div>

    <!-- التذييل -->
    <footer id="contact" class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>تواصل معنا</h3>
                    <p><i class="fas fa-phone"></i> 0500 123 456</p>
                    <p><i class="fas fa-envelope"></i> info@sushimaster.com</p>
                    <p><i class="fas fa-map-marker-alt"></i> الرياض، المملكة العربية السعودية</p>
                </div>
                <div class="footer-section">
                    <h3>ساعات العمل</h3>
                    <p>الأحد - الخميس: 12:00 ظ - 11:00 م</p>
                    <p>الجمعة - السبت: 1:00 ظ - 12:00 ص</p>
                </div>
                <div class="footer-section">
                    <h3>تابعنا</h3>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-snapchat"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 سوشي ماستر. جميع الحقوق محفوظة</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
