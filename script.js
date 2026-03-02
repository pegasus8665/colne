document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Services Accordion with Dynamic Image
    const accordionItems = document.querySelectorAll('.accordion-item');
    const dynamicImage = document.getElementById('dynamic-service-image');

    accordionItems.forEach(item => {
        const headerBtn = item.querySelector('.accordion-header');
        if (headerBtn) {
            headerBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all and remove active classes
                accordionItems.forEach(i => i.classList.remove('active'));

                if (!isActive) {
                    item.classList.add('active');

                    // Update Image if data-image exists
                    const newImgSrc = headerBtn.getAttribute('data-image');
                    if (newImgSrc && dynamicImage) {
                        dynamicImage.style.opacity = 0; // Fade out
                        setTimeout(() => {
                            dynamicImage.src = newImgSrc;
                            dynamicImage.style.opacity = 1; // Fade in
                        }, 400); // Wait for transition
                    }
                }
            });
        }
    });

    // 3. Smooth Scroll for Anchor Links (Buttons)
    const scrollLinks = document.querySelectorAll('.smooth-scroll, a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Offset for sticky header
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
