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
    if (!grid) return;
    
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
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">${product.price} ر.س</span>
                <button class="add-to-cart" onclick="addToCart(${product.id})" aria-label="إضافة للسلة">
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
    if (!product) return;
    
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
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartCount || !cartItems || !cartTotal) return;
    
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
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

// حذف من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showToast('تم الحذف من السلة', 'error');
}

// فتح/إغلاق السلة
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    if (!sidebar || !overlay) return;
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

// إتمام الطلب
function checkout() {
    if (cart.length === 0) {
        showToast('السلة فارغة!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showToast(`تم إرسال طلبك بقيمة ${total} ر.س!`, 'success');
    
    // إفراغ السلة بعد 2 ثانية
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartUI();
        toggleCart();
    }, 2000);
}

// رسالة تنبيه
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    // إزالة أي toast سابق
    const existingToast = document.querySelector('.toast.show');
    if (existingToast && existingToast !== toast) {
        existingToast.classList.remove('show');
    }
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// قائمة الجوال
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;
    
    navLinks.classList.toggle('active');
}

// التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // تحميل المنتجات
    loadProducts();
    
    // تحديث السلة
    updateCartUI();
    
    // أزرار التصفية
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadProducts(this.dataset.filter);
        });
    });
    
    // التمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // إغلاق القائمة في الجوال
                document.getElementById('navLinks')?.classList.remove('active');
            }
        });
    });
    
    // تحديث active link عند التمرير
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    });
});

// تصدير الدوال للـ global scope
window.toggleCart = toggleCart;
window.toggleMenu = toggleMenu;
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
