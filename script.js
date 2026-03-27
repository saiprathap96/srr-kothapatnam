// Sticky Navbar functionality
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Parallax Effect
document.addEventListener('mousemove', (e) => {
    const heroContent = document.querySelector('.parallax-content');
    if (!heroContent) return;
    
    // Calculate mouse position relative to center of screen
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    
    // Apply transform only if within the hero section
    if (window.scrollY < window.innerHeight) {
        heroContent.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Mobile menu toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    if(navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#FFFFFF';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '#1A1A1A');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Intersection Observer for Scroll Animations
const revealElements = document.querySelectorAll('.reveal');

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    scrollObserver.observe(el);
});

// Dynamic Menu Data
const menuData = [
    { id: 1, name: "Authentic Chicken Biryani", category: "biryani", type: "non-veg", price: 350, img: "assets/images/chicken_biryani_dish_1774592106081.png", tag: "Bestseller", desc: "Rich spices, perfectly cooked basmati rice, garnished with fried onions." },
    { id: 2, name: "Mutton Paya Soup", category: "soups", type: "non-veg", price: 220, img: "assets/images/mutton_paya_soup_1774592206628.png", tag: "", desc: "Rich computationally slow-cooked flavorful South Indian soup." },
    { id: 3, name: "Nalli Ghost Biryani", category: "biryani", type: "non-veg", price: 450, img: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", tag: "Popular", desc: "Tender mutton shank biryani full of authentic aroma." },
    { id: 4, name: "Chicken 65", category: "starters", type: "non-veg", price: 280, img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", tag: "Spicy", desc: "Spicy, deep-fried chicken signature starter." },
    { id: 5, name: "Paneer Tikka", category: "starters", type: "veg", price: 250, img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", tag: "", desc: "Marinated paneer chunks grilled to perfection." },
    { id: 6, name: "Veg Dum Biryani", category: "biryani", type: "veg", price: 280, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", tag: "Must Try", desc: "Aromatic basmati rice cooked with fresh seasonal vegetables." },
];

let cart = [];
let currentFilter = 'all';

function renderMenu(items) {
    const grid = document.getElementById('dynamic-menu-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    if(items.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 40px; font-size:1.1rem; color: #757575;">No items found matching your criteria.</div>';
        return;
    }

    items.forEach((item, index) => {
        const tagHtml = item.tag ? `<div class="menu-tag">${item.tag}</div>` : '';
        const vegIconColor = item.type === 'veg' ? '#4CAF50' : '#E53935';
        const vegIcon = item.type === 'veg' ? 'ph-leaf' : 'ph-bone';
        
        const card = document.createElement('div');
        card.className = 'menu-card menu-item';
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="fav-btn"><i class="ph-fill ph-heart"></i></div>
            <div class="menu-img-wrapper">
                <img src="${item.img}" alt="${item.name}" class="menu-img" loading="lazy">
                ${tagHtml}
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                    <i class="ph ph-shopping-cart"></i> Add
                </button>
            </div>
            <div class="menu-info">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <h3 style="margin-bottom:0;">${item.name} <i class="ph-fill ${vegIcon}" title="${item.type}" style="color:${vegIconColor}; font-size:1.2rem; margin-left:5px; vertical-align: middle;"></i></h3>
                </div>
                <p style="margin-top:10px;">${item.desc}</p>
                <div class="menu-price">₹${item.price}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterMenu() {
    const searchTerm = document.getElementById('menu-search')?.value.toLowerCase() || '';
    const isVegOnly = document.getElementById('veg-toggle')?.checked || false;
    
    const filtered = menuData.filter(item => {
        const matchesCategory = currentFilter === 'all' || item.category === currentFilter;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) || item.desc.toLowerCase().includes(searchTerm);
        const matchesVeg = !isVegOnly || item.type === 'veg';
        
        return matchesCategory && matchesSearch && matchesVeg;
    });
    
    renderMenu(filtered);
}

// Event Listeners for Menu Controls
if (document.getElementById('dynamic-menu-grid')) {
    // Initial render
    renderMenu(menuData);
    
    // Category filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterMenu();
        });
    });
    
    // Search input
    document.getElementById('menu-search')?.addEventListener('input', filterMenu);
    
    // Veg toggle
    document.getElementById('veg-toggle')?.addEventListener('change', filterMenu);
    
    // Favorite toggle delegation
    document.getElementById('dynamic-menu-grid').addEventListener('click', (e) => {
        const favBtn = e.target.closest('.fav-btn');
        if(favBtn) {
            favBtn.classList.toggle('active');
            favBtn.style.transform = 'scale(1.3)';
            setTimeout(() => favBtn.style.transform = '', 200);
        }
    });
}

// ============== CART LOGIC ============== //
window.addToCart = function(id) {
    const item = menuData.find(i => i.id === id);
    if (!item) return;
    
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    
    updateCartUI();
    openCart();
    
    // Optional: Show toast or feedback
}

window.updateCartUI = function() {
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if(!cartItemsContainer) return;

    let totalQty = 0;
    let totalPrice = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            totalQty += item.qty;
            totalPrice += item.price * item.qty;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div class="cart-item-title">${item.name}</div>
                        <i class="ph ph-trash remove-item" onclick="removeFromCart(${index})"></i>
                    </div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
    
    if(cartCount) {
        cartCount.textContent = totalQty;
        // Bounce animation on update
        cartCount.style.transform = 'scale(1.5)';
        setTimeout(() => cartCount.style.transform = '', 300);
    }
    if(cartTotalPrice) cartTotalPrice.textContent = '₹' + totalPrice;
}

window.updateQty = function(index, delta) {
    if(cart[index].qty + delta > 0) {
        cart[index].qty += delta;
    } else {
        cart.splice(index, 1);
    }
    updateCartUI();
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
}

window.openCart = function() {
    document.getElementById('cart-drawer')?.classList.add('active');
    document.getElementById('cart-overlay')?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeCart = function() {
    document.getElementById('cart-drawer')?.classList.remove('active');
    document.getElementById('cart-overlay')?.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('open-cart-btn')?.addEventListener('click', openCart);
document.getElementById('close-cart-btn')?.addEventListener('click', closeCart);
document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

// Form Submission Simulation
const bookingForm = document.getElementById('booking-form');
const formSuccess = document.getElementById('form-success');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            formSuccess.classList.remove('hidden');
            bookingForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        }, 800);
    });
}

// Testimonial Carousel
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (slides.length > 0) {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);
        let currentIndex = 0;

        const updateSlider = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[index].classList.add('active');
            currentIndex = index;
        };

        nextBtn.addEventListener('click', () => {
            let index = currentIndex + 1;
            if (index >= slides.length) index = 0;
            updateSlider(index);
        });

        prevBtn.addEventListener('click', () => {
            let index = currentIndex - 1;
            if (index < 0) index = slides.length - 1;
            updateSlider(index);
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                updateSlider(index);
            });
        });

        // Auto-play
        setInterval(() => {
            let index = currentIndex + 1;
            if (index >= slides.length) index = 0;
            updateSlider(index);
        }, 5000);
    }
}

// Gamification Popup Trigger
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('promo-popup')?.classList.add('show');
    }, 5000); // Prompts 5 seconds after load
});
