document.addEventListener('DOMContentLoaded', () => {
    // Animate elements when they enter viewport
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.feature-card, .student-card');
        const triggerBottom = window.innerHeight * 0.8;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.classList.add('animate');
            }
        });
    };

    // Initial check
    animateOnScroll();

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add floating animation to specific elements
    document.querySelectorAll('.hero-image img').forEach(img => {
        img.classList.add('floating');
    });
});
