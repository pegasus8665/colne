document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(248, 247, 243, 0.9)'; // var(--bg-color) with opacity
            header.style.backdropFilter = 'blur(10px)';
            header.style.padding = '1rem 4rem';
            header.style.position = 'fixed';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.padding = '2rem 4rem';
            header.style.position = 'absolute';
            header.style.boxShadow = 'none';
        }
    });

    // 2. Services Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const headerBtn = item.querySelector('.accordion-header');

        headerBtn.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(acc => {
                acc.classList.remove('active');
                const btn = acc.querySelector('.accordion-header');
                btn.textContent = '+' + btn.textContent.substring(1);
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                headerBtn.textContent = '-' + headerBtn.textContent.substring(1);
            }
        });
    });

    // 3. Scroll to top
    const scrollTopBtn = document.querySelector('.scroll-top');
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
