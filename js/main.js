
/**
 * main.js
 * Handles public-facing UI interactions and data display from LocalStorage
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    loadPublicData();
    handleContactForm();
});

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

function loadPublicData() {
    // 1. Load Notices for Home Page
    const noticesContainer = document.getElementById('notices-container');
    const noticesSection = document.getElementById('notices-section');
    
    if (noticesContainer) {
        const notices = JSON.parse(localStorage.getItem('pharmacy_notices') || '[]');
        if (notices.length > 0) {
            noticesSection.classList.remove('hidden');
            noticesContainer.innerHTML = notices.map(n => `
                <div class="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500">
                    <p class="text-slate-700 font-medium">${n.text}</p>
                    <span class="text-slate-400 text-xs mt-2 block">${n.date}</span>
                </div>
            `).join('');
        }
    }

    // 2. Load Products for Services Page
    const productsDisplay = document.getElementById('products-display');
    if (productsDisplay) {
        const products = JSON.parse(localStorage.getItem('pharmacy_products') || '[]');
        if (products.length === 0) {
            productsDisplay.innerHTML = `
                <div class="bg-slate-100 p-8 rounded-xl text-center text-slate-500 col-span-full">
                    No products currently featured. Check back later!
                </div>
            `;
        } else {
            productsDisplay.innerHTML = products.map(p => `
                <div class="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:scale-[1.02] transition-transform">
                    <div class="w-full h-32 bg-slate-50 rounded-lg flex items-center justify-center mb-4 text-emerald-300">
                        <i class="fas fa-pills text-4xl"></i>
                    </div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">${p.category}</span>
                    <h3 class="font-bold text-slate-900 mt-2">${p.name}</h3>
                    <p class="text-emerald-600 font-bold text-lg mt-1">$${parseFloat(p.price).toFixed(2)}</p>
                    <button class="w-full mt-4 bg-slate-900 text-white py-2 rounded-lg text-sm hover:bg-emerald-600 transition">Enquire</button>
                </div>
            `).join('');
        }
    }
}

function handleContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            if (name.length < 2 || !email.includes('@')) {
                showFeedback('Please provide valid contact information.', false);
                return;
            }

            // Mock submission
            form.classList.add('opacity-50', 'pointer-events-none');
            showFeedback('Sending your message...', null);

            setTimeout(() => {
                form.reset();
                form.classList.remove('opacity-50', 'pointer-events-none');
                showFeedback('Thank you! Your message has been sent successfully.', true);
            }, 1500);
        });
    }

    function showFeedback(msg, success) {
        if (!feedback) return;
        feedback.textContent = msg;
        feedback.classList.remove('hidden', 'bg-red-100', 'text-red-600', 'bg-emerald-100', 'text-emerald-600', 'bg-blue-100', 'text-blue-600');
        
        if (success === true) {
            feedback.classList.add('bg-emerald-100', 'text-emerald-600');
        } else if (success === false) {
            feedback.classList.add('bg-red-100', 'text-red-600');
        } else {
            feedback.classList.add('bg-blue-100', 'text-blue-600');
        }
        feedback.classList.remove('hidden');
    }
}
