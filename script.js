// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Loader
    setTimeout(() => { const loader = document.getElementById('loader'); if(loader) loader.style.opacity = '0'; setTimeout(() => loader?.remove(), 800); }, 1000);

    // Menú hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger?.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));

    // Back to top
    const backBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => { backBtn.style.display = window.scrollY > 500 ? 'flex' : 'none'; });
    backBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Animación contadores
    const counters = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        counters.forEach(c => { const target = parseInt(c.getAttribute('data-count')); let current = 0; const increment = target/50; const update = () => { current += increment; if(current<target){ c.innerText = Math.floor(current); requestAnimationFrame(update); } else c.innerText = target; }; update(); });
    };
    const observer = new IntersectionObserver((entries) => { if(entries[0].isIntersecting) animateCounters(); }, { threshold: 0.5 });
    const statsSection = document.querySelector('.stats-container');
    if(statsSection) observer.observe(statsSection);

    // Servicios data
    const services = [
        { name: "Pérgolas", icon: "fa-tree", desc: "Diseño y construcción de pérgolas modernas.", img: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Kioscos", icon: "fa-umbrella-beach", desc: "Kioscos para zonas comunes y residenciales.", img: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Balcones", icon: "fa-building", desc: "Balcones estructurales de alta resistencia.", img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Estructuras de playa", icon: "fa-water", desc: "Ambientes playeros con madera y diseño tropical.", img: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Construcción de Casas", icon: "fa-home", desc: "Viviendas de lujo llave en mano.", img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Apartamentos", icon: "fa-city", desc: "Edificios residenciales con altos estándares.", img: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Dirección de Obras", icon: "fa-hard-hat", desc: "Gerencia y supervisión técnica.", img: "https://images.pexels.com/photos/209224/pexels-photo-209224.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Presupuestos y Consultoría", icon: "fa-chart-line", desc: "Asesoría integral y estudios de costos.", img: "https://images.pexels.com/photos/313690/pexels-photo-313690.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ];
    const servicesGrid = document.getElementById('servicesGrid');
    if(servicesGrid) services.forEach(s => { servicesGrid.innerHTML += `<div class="service-card"><div class="service-img" style="background-image:url('${s.img}')"></div><div class="service-content"><i class="fas ${s.icon} service-icon"></i><h4>${s.name}</h4><p>${s.desc}</p><button class="btn-outline" style="margin-top:10px;">Ver más</button></div></div>`; });

    // Galería proyectos (filtros con lightbox)
    const galleryItems = [
        { category: "pergolas", img: "https://images.pexels.com/photos/2092502/pexels-photo-2092502.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Pérgola moderna" },
        { category: "casas", img: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Casa de lujo" },
        { category: "apartamentos", img: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Apartamento vista al mar" },
        { category: "obras", img: "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Gran obra civil" },
        { category: "playa", img: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Estructura para playa" },
        { category: "pergolas", img: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Pérgola tropical" }
    ];
    const galleryGrid = document.getElementById('galleryGrid');
    function renderGallery(filter = "all") { if(!galleryGrid) return; galleryGrid.innerHTML = galleryItems.filter(i => filter === "all" || i.category === filter).map(i => `<div class="gallery-item" style="background-image:url('${i.img}'); background-size:cover; background-position:center;" data-img="${i.img}"></div>`).join(''); document.querySelectorAll('.gallery-item').forEach(el => el.addEventListener('click', () => { const imgSrc = el.style.backgroundImage.slice(5, -2); const lightbox = document.createElement('div'); lightbox.style.position='fixed'; lightbox.style.top=0; lightbox.style.left=0; lightbox.style.width='100%'; lightbox.style.height='100%'; lightbox.style.background='rgba(0,0,0,0.9)'; lightbox.style.zIndex=9999; lightbox.style.display='flex'; lightbox.style.justifyContent='center'; lightbox.style.alignItems='center'; lightbox.innerHTML = `<img src="${imgSrc}" style="max-width:90%; max-height:90%; border-radius:20px;"><span style="position:absolute; top:20px; right:30px; color:white; font-size:40px; cursor:pointer;">&times;</span>`; document.body.appendChild(