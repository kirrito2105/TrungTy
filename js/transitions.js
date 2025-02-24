class PageTransition {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.transitionElement = document.querySelector('.page-transition');
        this.loadingIcon = document.querySelector('.loading-icon');
        this.links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');
        this.contentWrapper = document.querySelector('.content-wrapper');
    }

    bindEvents() {
        this.contentWrapper?.classList.add('visible');
        
        this.links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                this.transitionTo(link.href);
            });
        });

        window.addEventListener('pageshow', e => {
            if (e.persisted) {
                this.resetTransition();
            }
        });
    }

    async transitionTo(target) {
        this.loadingIcon?.classList.add('active');
        this.transitionElement?.classList.add('active');
        
        // Đợi animation hoàn thành
        await new Promise(resolve => setTimeout(resolve, 800));
        
        this.contentWrapper?.classList.remove('visible');
        
        // Chuyển trang sau khi animation kết thúc
        await new Promise(resolve => setTimeout(resolve, 200));
        window.location.href = target;
    }

    resetTransition() {
        this.transitionElement?.classList.remove('active');
        this.loadingIcon?.classList.remove('active');
        this.contentWrapper?.classList.add('visible');
    }
}

// Initialize after DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add transition elements if not exist
    if (!document.querySelector('.page-transition')) {
        const transitionHTML = `
            <div class="page-transition">
                <div class="transition-panel"></div>
                <div class="transition-panel"></div>
                <div class="transition-panel"></div>
            </div>
            <div class="loading-icon">
                <svg viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" />
                </svg>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', transitionHTML);
    }

    new PageTransition();
});
