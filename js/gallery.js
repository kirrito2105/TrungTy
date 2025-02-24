document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');
    const thumbnailsContainer = document.querySelector('.lightbox-thumbnails');
    
    let currentIndex = 0;
    let galleryItems = [];

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            gallery.classList.add('filtering');
            
            setTimeout(() => {
                document.querySelectorAll('.gallery-item').forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                gallery.classList.remove('filtering');
            }, 300);
        });
    });

    // Lightbox functionality
    function openLightbox(index) {
        currentIndex = index;
        const item = galleryItems[currentIndex];
        
        lightboxImage.src = item.querySelector('img').src;
        lightboxCaption.querySelector('h3').textContent = item.querySelector('h3').textContent;
        lightboxCaption.querySelector('p').textContent = item.querySelector('p').textContent;
        
        updateThumbnails();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateThumbnails() {
        thumbnailsContainer.innerHTML = '';
        galleryItems.forEach((item, index) => {
            const thumb = document.createElement('img');
            thumb.src = item.querySelector('img').src;
            thumb.classList.add('lightbox-thumbnail');
            if (index === currentIndex) thumb.classList.add('active');
            thumb.addEventListener('click', () => openLightbox(index));
            thumbnailsContainer.appendChild(thumb);
        });
    }

    // Event listeners
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        galleryItems.push(item);
        item.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(currentIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
});
