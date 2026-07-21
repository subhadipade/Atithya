document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SYSTEM OVERLAY ROUTINES (Explore Journey Panel)
    const exploreBtn = document.getElementById('exploreBtn');
    const closeItinerary = document.getElementById('closeItinerary');
    const itineraryView = document.getElementById('itineraryView');

    if (exploreBtn && itineraryView && closeItinerary) {
        exploreBtn.addEventListener('click', () => {
            itineraryView.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });

        closeItinerary.addEventListener('click', () => {
            itineraryView.classList.remove('active');
            document.body.style.overflow = 'auto'; 
        });
    }

    // 2. MODAL IMAGERY CONTROLS (Lightbox Layer)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('closeLightbox');

    function setupLightboxItems(items) {
        items.forEach(item => {
            item.addEventListener('click', () => {
                const highResSrc = item.getAttribute('data-src');
                lightboxImg.setAttribute('src', highResSrc);
                lightbox.classList.add('active');
            });
        });
    }

    if (lightbox && lightboxImg && closeLightbox) {
        const initialItems = document.querySelectorAll('.gallery-item');
        setupLightboxItems(initialItems);

        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
            lightboxImg.setAttribute('src', '');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                lightboxImg.setAttribute('src', '');
            }
        });
    }

    // document.addEventListener("DOMContentLoaded", function () {
    //     const container = document.getElementById('marquee-container');

    //     // Clone the inner content (the spans) 3 times to ensure a long, smooth loop
    //     const originalContent = container.innerHTML;

    //     container.innerHTML += originalContent + originalContent;
    // });

    document.querySelectorAll('*').forEach(el => {
        if (el.offsetWidth > document.documentElement.offsetWidth) {
            console.log('The element causing the overflow is:', el);
        }
    });

    // 3. SCROLL-DRIVEN ENTRY EFFECTS
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null, 
            threshold: 0.12, 
            rootMargin: '0px 0px -40px 0px' 
        });

        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add('revealed'));
    }
});