// Smooth scroll for navbar and dropdown links
document.querySelectorAll('.navbar a[href^="#"], .dropdown_menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Close sidebar when a link is clicked
        const dropDownMenu = document.querySelector('.dropdown_menu');
        const toggleBtnIcon = document.querySelector('.toggle_btn i');
        const overlay = document.querySelector('.sidebar-overlay');
        if (dropDownMenu.classList.contains('open')) {
            dropDownMenu.classList.remove('open');
            overlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
            toggleBtnIcon.classList = 'fa-solid fa-bars';
        }
    });
});

// Hero slider
document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll('.hero-slider img');
    let index = 0;

    function changeSlide() {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }

    setInterval(changeSlide, 4000);
});

// ===== REVIEW AUTO-SCROLL + ARROWS =====
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".review-slider");
    const prevBtn = document.querySelector(".review-prev");
    const nextBtn = document.querySelector(".review-next");
    if (!slider) return;

    let paused = false;
    let pauseTimeout = null;
    const speed = 0.5; // pixels per frame
    const arrowScrollAmount = 300;

    // Seamless loop: halfway is where duplicates start
    const halfWidth = () => slider.scrollWidth / 2;

    function animate() {
        if (!paused) {
            slider.scrollLeft += speed;
            // When we've scrolled past the original cards, snap back
            if (slider.scrollLeft >= halfWidth()) {
                slider.scrollLeft -= halfWidth();
            }
        }
        requestAnimationFrame(animate);
    }

    function pauseTemporarily(ms) {
        paused = true;
        if (pauseTimeout) clearTimeout(pauseTimeout);
        pauseTimeout = setTimeout(() => { paused = false; }, ms || 3000);
    }

    // Arrow buttons
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            pauseTemporarily(2000);
            slider.scrollBy({ left: arrowScrollAmount, behavior: "smooth" });
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            pauseTemporarily(2000);
            slider.scrollBy({ left: -arrowScrollAmount, behavior: "smooth" });
        });
    }

    // Pause on hover (desktop)
    slider.addEventListener("mouseenter", () => { paused = true; });
    slider.addEventListener("mouseleave", () => { paused = false; });

    // Pause on touch (mobile)
    slider.addEventListener("touchstart", () => pauseTemporarily(3000), { passive: true });

    requestAnimationFrame(animate);
});

// Navbar scroll effect — add 'scrolled' class on scroll
window.addEventListener("scroll", function () {
    const header = document.getElementById("main-header");
    const backToTop = document.getElementById("backToTop");
    const waButton = document.querySelector(".wa-button");

    // Navbar background change
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // Back to top button
    if (window.scrollY > window.innerHeight / 2) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

    // WhatsApp button
    if (window.scrollY > 100) {
        waButton.classList.add("show");
    } else {
        waButton.classList.remove("show");
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Gallery zoom with animation
function zoomImage(img) {
    const modal = document.getElementById("zoomModal");
    const zoomedImage = document.getElementById("zoomedImage");
    const caption = document.getElementById("modalCaption");

    zoomedImage.src = img.src;
    caption.textContent = img.alt || '';
    modal.style.display = "flex";
    // Trigger animation on next frame
    requestAnimationFrame(() => {
        modal.classList.add("active");
    });
    document.body.style.overflow = "hidden";
}

function closeZoom(e) {
    // Only close if clicking backdrop or close button, not the image
    if (e && e.target.classList.contains('modal-content')) return;
    const modal = document.getElementById("zoomModal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
        modal.style.display = "none";
    }, 400);
}

// ESC key to close modal
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeZoom();
});

// ===== SIDEBAR TOGGLE =====
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const sidebarClose = document.querySelector('.sidebar-close');

function openSidebar() {
    dropDownMenu.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.classList.add('sidebar-open');
    toggleBtnIcon.classList = 'fa-solid fa-xmark';
}

function closeSidebar() {
    dropDownMenu.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
    toggleBtnIcon.classList = 'fa-solid fa-bars';
}

toggleBtn.onclick = function () {
    if (dropDownMenu.classList.contains('open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
};

if (sidebarOverlay) {
    sidebarOverlay.onclick = closeSidebar;
}

if (sidebarClose) {
    sidebarClose.onclick = closeSidebar;
}