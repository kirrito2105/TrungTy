document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchMembers');
    const studentCards = document.querySelectorAll('.student-card');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        studentCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                card.style.display = '';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });

    // Clear search on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            studentCards.forEach(card => {
                card.style.display = '';
                card.style.opacity = '1';
            });
            searchInput.blur();
        }
    });
});
