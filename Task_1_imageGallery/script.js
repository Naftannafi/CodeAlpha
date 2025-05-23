document.addEventListener('DOMContentLoaded', function() {
    // Gallery data
    const galleryData = [
        {
            src: './assets/waterfull nature.jpg',
            alt: 'Beautiful waterfall in nature',
            category: 'nature',
            caption: 'Majestic Waterfall'
        },
        {
            src: './assets/modern skycraper.jpg',
            alt: 'Modern skyscraper architecture',
            category: 'architecture',
            caption: 'Urban Skyscraper'
        },
        {
            src: './assets/portrait women.jpg',
            alt: 'Portrait of a woman',
            category: 'people',
            caption: 'Elegant Portrait'
        },
        {
            src: './assets/mountain.jpg',
            alt: 'Mountain during sunset',
            category: 'nature',
            caption: 'Sunset Mountains'
        },
        {
            src: './assets/city at night.jpg',
            alt: 'City at night',
            category: 'architecture',
            caption: 'City Lights'
        },
        {
            src: './assets/couple.jpg',
            alt: 'Couple on the beach',
            category: 'people',
            caption: 'Beach Romance'
        },
        {
            src: './assets/forest.jpg',
            alt: 'Misty forest',
            category: 'nature',
            caption: 'Enchanted Forest'
        },
        {
            src: './assets/modern skycraper.jpg',
            alt: 'Modern bridge architecture',
            category: 'architecture',
            caption: 'Architectural Marvel'
        },
        {
            src: './assets/child.jpg',
            alt: 'Child playing',
            category: 'people',
            caption: 'Joyful Moment'
        }
    ];

    // DOM Elements
    const galleryGrid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentImageIndex = 0;
    let filteredImages = [];

    // Initialize gallery
    function initGallery() {
        galleryGrid.innerHTML = '';
        filteredImages = galleryData;

        galleryData.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${image.category}`;
            galleryItem.dataset.index = index;
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" class="gallery-img">
                <div class="gallery-caption">${image.caption}</div>
            `;
            
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Filter gallery
    function filterGallery(category) {
        if (category === 'all') {
            filteredImages = galleryData;
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.style.display = 'block';
            });
        } else {
            filteredImages = galleryData.filter(img => img.category === category);
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.style.display = item.classList.contains(category) ? 'block' : 'none';
            });
        }
    }

    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = filteredImages.findIndex(img => 
            galleryData.indexOf(img) === parseInt(index)
        );
        
        if (currentImageIndex === -1) currentImageIndex = 0;
        
        updateLightbox();
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Update lightbox content
    function updateLightbox() {
        const image = filteredImages[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        lightboxCaption.textContent = image.caption;
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Navigate to previous image
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightbox();
    }

    // Navigate to next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightbox();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            switch (e.key) {
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
            }
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterGallery(btn.dataset.filter);
        });
    });

    // Initialize the gallery
    initGallery();
});