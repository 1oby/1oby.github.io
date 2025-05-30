// Current image index for lightbox
let currentImageIndex = 0;
let currentImages = [];

// Image upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('imageUpload');
    const galleryGrid = document.getElementById('galleryGrid');

    if (imageUpload) {
        imageUpload.addEventListener('change', function(e) {
            const files = e.target.files;
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const galleryItem = document.createElement('div');
                        galleryItem.className = 'gallery-item';
                        galleryItem.onclick = function() {
                            const newIndex = currentImages.length;
                            currentImages.push(e.target.result);
                            openLightbox(newIndex);
                        };
                        
                        const imgElement = document.createElement('img');
                        imgElement.src = e.target.result;
                        imgElement.alt = 'Uploaded Photo';
                        
                        galleryItem.appendChild(imgElement);
                        galleryGrid.appendChild(galleryItem);
                    };
                    
                    reader.readAsDataURL(file);
                }
            }
        });
    }

    // Initialize current images array from existing gallery items
    initializeGallery();

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (name && email && subject && message) {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});

// Initialize gallery images
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    currentImages = Array.from(galleryItems).map(img => img.src);
}

// Lightbox functionality
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg && currentImages[index]) {
        lightboxImg.src = currentImages[index];
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.src = currentImages[currentImageIndex];
    }
}

// Close lightbox when clicking outside the image
document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});
