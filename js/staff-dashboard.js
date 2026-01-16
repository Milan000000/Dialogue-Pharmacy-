
/**
 * staff-dashboard.js
 * Handles CRUD operations for products and notices using LocalStorage
 */

// Import simple auth guard check from logic
const AUTH_KEY = 'lifecare_staff_session';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Auth Guard Check
    const session = localStorage.getItem(AUTH_KEY);
    if (!session) {
        window.location.href = 'staff-login.html';
        return;
    }
    
    // Reveal dashboard if authed
    document.getElementById('auth-guard').classList.remove('hidden');

    // 2. Initial Render
    renderProducts();
    renderNotices();

    // 3. Event Listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem(AUTH_KEY);
        window.location.href = 'index.html';
    });

    // Product Form
    const addBtn = document.getElementById('add-product-btn');
    const cancelBtn = document.getElementById('cancel-form');
    const formContainer = document.getElementById('product-form-container');
    const prodForm = document.getElementById('product-form');

    addBtn.addEventListener('click', () => {
        resetProductForm();
        formContainer.classList.remove('hidden');
        document.getElementById('prod-name').focus();
    });

    cancelBtn.addEventListener('click', () => {
        formContainer.classList.add('hidden');
    });

    prodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProduct();
    });

    // Notice Form
    const noticeForm = document.getElementById('notice-form');
    noticeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveNotice();
    });
}

// --- PRODUCT CRUD ---

function renderProducts() {
    const products = getStoredData('pharmacy_products');
    const tableBody = document.getElementById('products-table-body');
    
    if (products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="px-6 py-10 text-center text-slate-400">No products found. Start by adding one.</td></tr>`;
        return;
    }

    tableBody.innerHTML = products.map(p => `
        <tr class="hover:bg-slate-50 transition">
            <td class="px-6 py-4 font-bold text-slate-900">${p.name}</td>
            <td class="px-6 py-4"><span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">${p.category}</span></td>
            <td class="px-6 py-4 text-emerald-600 font-bold">$${parseFloat(p.price).toFixed(2)}</td>
            <td class="px-6 py-4 text-right">
                <button onclick="editProduct('${p.id}')" class="text-blue-500 hover:text-blue-700 mr-4">Edit</button>
                <button onclick="deleteProduct('${p.id}')" class="text-red-500 hover:text-red-700">Delete</button>
            </td>
        </tr>
    `).join('');
}

function saveProduct() {
    const id = document.getElementById('edit-id').value;
    const name = document.getElementById('prod-name').value;
    const category = document.getElementById('prod-category').value;
    const price = document.getElementById('prod-price').value;

    let products = getStoredData('pharmacy_products');

    if (id) {
        // Edit existing
        products = products.map(p => p.id === id ? { ...p, name, category, price } : p);
        showToast('Product updated successfully');
    } else {
        // Add new
        const newProduct = {
            id: Date.now().toString(),
            name,
            category,
            price
        };
        products.push(newProduct);
        showToast('New product added');
    }

    setStoredData('pharmacy_products', products);
    renderProducts();
    document.getElementById('product-form-container').classList.add('hidden');
}

window.editProduct = (id) => {
    const products = getStoredData('pharmacy_products');
    const p = products.find(item => item.id === id);
    if (!p) return;

    document.getElementById('edit-id').value = p.id;
    document.getElementById('prod-name').value = p.name;
    document.getElementById('prod-category').value = p.category;
    document.getElementById('prod-price').value = p.price;
    
    document.getElementById('form-title').innerText = 'Edit Product';
    document.getElementById('product-form-container').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.deleteProduct = (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    let products = getStoredData('pharmacy_products');
    products = products.filter(p => p.id !== id);
    setStoredData('pharmacy_products', products);
    renderProducts();
    showToast('Product deleted');
};

function resetProductForm() {
    document.getElementById('product-form').reset();
    document.getElementById('edit-id').value = '';
    document.getElementById('form-title').innerText = 'Add New Product';
}

// --- NOTICE CRUD ---

function renderNotices() {
    const notices = getStoredData('pharmacy_notices');
    const list = document.getElementById('notices-list');
    
    if (notices.length === 0) {
        list.innerHTML = `<p class="text-slate-400 text-sm italic">No active notices.</p>`;
        return;
    }

    list.innerHTML = notices.map(n => `
        <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="flex-1 mr-4">
                <p class="text-slate-700 text-sm font-medium">${n.text}</p>
                <span class="text-[10px] text-slate-400">${n.date}</span>
            </div>
            <button onclick="deleteNotice('${n.id}')" class="text-slate-300 hover:text-red-500">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).reverse().join('');
}

function saveNotice() {
    const input = document.getElementById('notice-text');
    const text = input.value;
    
    let notices = getStoredData('pharmacy_notices');
    const newNotice = {
        id: Date.now().toString(),
        text: text,
        date: new Date().toLocaleDateString()
    };

    notices.push(newNotice);
    setStoredData('pharmacy_notices', notices);
    input.value = '';
    renderNotices();
    showToast('Notice posted');
}

window.deleteNotice = (id) => {
    let notices = getStoredData('pharmacy_notices');
    notices = notices.filter(n => n.id !== id);
    setStoredData('pharmacy_notices', notices);
    renderNotices();
    showToast('Notice removed');
};

// --- HELPERS ---

function getStoredData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function setStoredData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.replace('opacity-0', 'opacity-100');
    setTimeout(() => {
        toast.classList.replace('opacity-100', 'opacity-0');
    }, 3000);
}
