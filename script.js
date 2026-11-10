
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. MOBILE NAVIGATION MENU
    // ==========================================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll("#nav-links a");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Close menu after clicking a navigation link
        navItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';
            });

        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {

            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';
            }

        });

    }


    // ==========================================
    // 2. SCROLL REVEAL ANIMATION
    // ==========================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("show");
        });

    }


    // ==========================================
    // 3. CONTACT FORM WITH FORMSPREE
    // ==========================================

    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const buttonText = document.getElementById("button-text");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {

        contactForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            // Check required fields
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            // Get form data
            const formData = new FormData(contactForm);

            // Prevent multiple submissions
            submitBtn.disabled = true;
            buttonText.textContent = "Sending...";
            formStatus.textContent = "";
            formStatus.className = "form-status";

            try {

                // Send message to Formspree
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                });

                const result = await response.json();

                if (response.ok && result.ok !== false) {

                    // Success
                    formStatus.textContent =
                        "✓ Your message has been sent successfully! Thank you for contacting me.";

                    formStatus.classList.add("success");

                    contactForm.reset();

                } else {

                    // Formspree error
                    const errorMessage = result.errors
                        ? result.errors.map(error => error.message).join(", ")
                        : "Something went wrong. Please try again.";

                    throw new Error(errorMessage);

                }

            } catch (error) {

                // Error
                formStatus.textContent =
                    "✕ " + (error.message || "Unable to send your message. Please try again.");

                formStatus.classList.add("error");

            } finally {

                // Restore button
                submitBtn.disabled = false;

                buttonText.textContent = "Send Message";

            }

        });

    }


    // ==========================================
    // 4. AUTOMATIC COPYRIGHT YEAR
    // ==========================================

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ==========================================
    // 5. NAVIGATION ACTIVE LINK
    // ==========================================

    const sections = document.querySelectorAll(
        "#header, #about, #project, #contact"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const sectionId = entry.target.id;

                        navItems.forEach(function (link) {

                            link.classList.remove("active-link");

                            if (link.getAttribute("href") === "#" + sectionId) {
                                link.classList.add("active-link");
                            }

                        });

                    }

                });

            },
            {
                threshold: 0.35
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }


    // ==========================================
    // 6. IMAGE LOADING CHECK
    // ==========================================

    const images = document.querySelectorAll("img");

    images.forEach(function (img) {

        img.addEventListener("error", function () {

            console.warn("Image not found: " + img.src);

        });

    });


    console.log("Portfolio website successfully loaded!");

});
