const laundryConfig = {
    businessName: "FreshWash Laundry",
    slogan: "Pakaian Bersih, Waktu Lebih Praktis.",
    whatsappNumber: "6281262127339", 
    address: "Pasar V Kebun Kelapa",
    operationalHours: "Senin - Sabtu: 08.00 - 2000 WIB",
    services: [
        {
            name: "Cuci Kering",
            desc: "Pakaian dicuci bersih dan dikeringkan mesin. Cocok untuk pakaian harian.",
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10Z"/><path d="M12 2v20"/><path d="M12 7a5 5 0 1 0 0 10"/></svg>`
        },
        {
            name: "Cuci Setrika",
            desc: "Layanan komplit cucian bersih, kering, dan rapi disetrika. Siap masuk lemari.",
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 16.5V22"/><path d="M15 16.5V22"/><path d="M3 12h18"/><path d="M4 12v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></svg>`
        },
        {
            name: "Setrika Saja",
            desc: "Bawa pakaian bersih Anda, kami yang merapikannya dengan setrika uap.",
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`
        },
        {
            name: "Cuci Bed Cover",
            desc: "Pencucian khusus untuk bed cover, selimut, dan sprei agar wangi dan bebas tungau.",
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`
        }
    ],
    pricing: [
        { item: "Cuci Kering", price: "Rp6.000 / kg" },
        { item: "Cuci Setrika", price: "Rp8.000 / kg" },
        { item: "Setrika Saja", price: "Rp5.000 / kg" },
        { item: "Bed Cover", price: "Mulai Rp20.000 / pcs" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nav-brand-name').textContent = laundryConfig.businessName;
    document.getElementById('about-brand-name').textContent = laundryConfig.businessName;
    document.getElementById('footer-brand-name').textContent = laundryConfig.businessName;
    document.getElementById('copyright-name').textContent = laundryConfig.businessName;
    
    document.getElementById('info-address').textContent = laundryConfig.address;
    document.getElementById('info-hours').textContent = laundryConfig.operationalHours;
    
    document.getElementById('current-year').textContent = new Date().getFullYear();

    const servicesContainer = document.getElementById('services-container');
    if(servicesContainer) {
        servicesContainer.innerHTML = laundryConfig.services.map(service => `
            <div class="service-card">
                <div class="service-icon">${service.icon}</div>
                <h3>${service.name}</h3>
                <p>${service.desc}</p>
                <button class="btn btn-outline" onclick="orderLaundry('${service.name}')">Pesan Ini</button>
            </div>
        `).join('');
    }

    const pricingContainer = document.getElementById('pricing-container');
    if(pricingContainer) {
        pricingContainer.innerHTML = laundryConfig.pricing.map(price => `
            <div class="price-item">
                <span class="price-name">${price.item}</span>
                <span class="price-value">${price.price}</span>
            </div>
        `).join('');
    }
});

function orderLaundry(serviceType) {
    const waNumber = laundryConfig.whatsappNumber;
    
    if (!waNumber || waNumber.trim() === "") {
        alert("Peringatan Demo: Nomor WhatsApp usaha belum dikonfigurasi di file script.js.");
        return;
    }

    let message = `Halo ${laundryConfig.businessName}, saya ingin bertanya mengenai layanan laundry.`;
    if (serviceType !== 'Tanya Umum' && serviceType !== 'Pemesanan Baru') {
        message = `Halo ${laundryConfig.businessName}, saya ingin memesan layanan *${serviceType}*.`;
    }

    const cleanNumber = waNumber.replace(/\D/g,'');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
}

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

const accordions = document.querySelectorAll('.accordion-header');
accordions.forEach(acc => {
    acc.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
            document.querySelectorAll('.accordion-header').forEach(h => h.setAttribute('aria-expanded', 'false'));
            
            this.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute("id");
        const navTarget = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
        
        if (navTarget) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navTarget.classList.add("active");
            } else {
                navTarget.classList.remove("active");
            }
        }
    });
});