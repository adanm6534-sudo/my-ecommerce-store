let allProducts = [];
let cart = [];
let activeCategory = 'All';

// Load Products from Python Backend
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const result = await response.json();
        if (result.status === 'success') {
            allProducts = result.data;
            renderProducts(allProducts);
        }
    } catch (error) {
        console.error("Backend Error, using fallback data:", error);
    }
}

// Render Product Cards
function renderProducts(products) {
    const grid = document.getElementById('productGrid');
    if (products.length === 0) {
        grid.innerHTML = '<p>No products found.</p>';
        return;
    }

    grid.innerHTML = products.map(item => `
        <div class="product-card">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="price">Rs. ${item.price.toLocaleString()}</div>
            <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Category Filter
function selectCategory(category) {
    activeCategory = category;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText === category || (category === 'All' && btn.innerText === 'All Products'));
    });
    filterProducts();
}

// Search & Category Combined Filter
function filterProducts() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allProducts.filter(item => {
        const matchesCategory = (activeCategory === 'All') || (item.category === activeCategory);
        const matchesSearch = item.name.toLowerCase().includes(searchVal);
        return matchesCategory && matchesSearch;
    });
    renderProducts(filtered);
}

// Toggle Cart Drawer
function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('active');
}

// Add to Cart
function addToCart(id) {
    const product = allProducts.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
}

// Update Cart View
function updateCartUI() {
    document.getElementById('cartCount').innerText = cart.length;
    const cartContainer = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-msg">Cart is empty</p>';
    } else {
        cartContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>Rs. ${item.price.toLocaleString()}</small>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">&times;</button>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cartTotal').innerText = total.toLocaleString();
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// WhatsApp Order Integration
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert("Aapka cart khali hai!");
        return;
    }

    let orderMsg = "Hello ADAN STORE, main ye items order karna chahta hoon:\n\n";
    cart.forEach((item, index) => {
        orderMsg += `${index + 1}. ${item.name} - Rs. ${item.price}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    orderMsg += `\n*Total Amount:* Rs. ${total.toLocaleString()}`;

    const whatsappNumber = "923218611647";
    const url = `[https://wa.me/$](https://wa.me/$){whatsappNumber}?text=${encodeURIComponent(orderMsg)}`;
    window.open(url, '_blank');
}
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Aapka cart khali hai! Pehle kuch products select karein.");
        return;
    }
    
    // Professional & Clean Auto Message Format
    let message = "🛒 *New Order from ADAN STORE*\n";
    message += "----------------------------------\n\n";
    
    cart.chargez = cart.forEach((item, i) => {
        // Yeh line har item ko add karegi
    });
    
    cart.forEach((item, i) => {
        message += `${i + 1}. *${item.title}* \n   Category: ${item.category} \n   Price: Rs. ${item.price.toLocaleString()}\n\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += "----------------------------------\n";
    message += `💰 *Total Bill Amount:* *Rs. ${total.toLocaleString()}*\n\n`;
    message += "Kindly confirm my order and share delivery details. Thank you!";

    // Aapka WhatsApp Number (Yahan apna number check karlein)
    const whatsappNum = "923218611647"; 
    
    // URL Encode karke WhatsApp redirect karna
    const url = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
// Initialize on Page Load
document.addEventListener('DOMContentLoaded', fetchProducts);