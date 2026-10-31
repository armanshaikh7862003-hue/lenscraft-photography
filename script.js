
// Page Loader

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    setTimeout(function () {
        loader.classList.add("hide");
    }, 500);
});


// Mobile Navigation

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});


// Scroll Reveal Animation

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});


// Portfolio Filter

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const category = button.getAttribute("data-filter");

        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        galleryItems.forEach(function (item) {
            const itemCategory = item.getAttribute("data-category");

            if (category === "all" || category === itemCategory) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});


// Image Lightbox

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
        const image = item.querySelector("img");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
    });
});

function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});


// Animated Statistics

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = Number(counter.getAttribute("data-target"));
            let current = 0;

            const increment = Math.max(1, Math.ceil(target / 60));

            const timer = setInterval(function () {
                current += increment;

                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                counter.textContent = current;
            }, 25);

            counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(function (counter) {
    counterObserver.observe(counter);
});


// Minimum Booking Date

const dateInput = document.getElementById("date");

function getLocalDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}

dateInput.min = getLocalDate();


// Booking Form and WhatsApp Integration

const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const message = document.getElementById("message").value.trim();

    formMessage.textContent = "";

    if (!name || !email || !phone || !service || !date) {
        formMessage.textContent = "Please fill in all required fields.";
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        formMessage.textContent = "Please enter a valid 10-digit phone number.";
        return;
    }

    if (date < getLocalDate()) {
        formMessage.textContent = "Please select today or a future date.";
        return;
    }

    const photographerNumber = "917977396600";

    const whatsappMessage =
        "NEW PHOTOGRAPHY BOOKING INQUIRY\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Customer Phone: " + phone + "\n" +
        "Service: " + service + "\n" +
        "Event Date: " + date + "\n" +
        "Additional Details: " + (message || "Not provided") + "\n\n" +
        "Sent through LensCraft Photography Website.";

    const whatsappURL =
        "https://wa.me/" +
        photographerNumber +
        "?text=" +
        encodeURIComponent(whatsappMessage);

    formMessage.textContent = "Opening WhatsApp. Please send your booking message there.";

    window.location.href = whatsappURL;
});


// Back to Top Button

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// Dynamic Copyright Year

document.getElementById("year").textContent = new Date().getFullYear();

