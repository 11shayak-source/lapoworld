// ==========================================
// LAPOWORLD x FUEL X - PREMIUM ANIMATION ENGINE
// Powered by GSAP & ScrollTrigger
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 2. CUSTOM FLUID CURSOR (GSAP quickTo)
    // ==========================================
    // We use quickTo for highly performant, zero-lag mouse tracking
    
    // Set initial transform so cursor stays centered on the mouse pointer
    gsap.set(".custom-cursor", { xPercent: -50, yPercent: -50 });
    gsap.set(".custom-cursor-follower", { xPercent: -50, yPercent: -50 });

    const xToCursor = gsap.quickTo(".custom-cursor", "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(".custom-cursor", "y", { duration: 0.1, ease: "power3" });
    
    const xToFollower = gsap.quickTo(".custom-cursor-follower", "x", { duration: 0.5, ease: "power3.out" });
    const yToFollower = gsap.quickTo(".custom-cursor-follower", "y", { duration: 0.5, ease: "power3.out" });

    window.addEventListener("mousemove", (e) => {
        xToCursor(e.clientX);
        yToCursor(e.clientY);
        xToFollower(e.clientX);
        yToFollower(e.clientY);
    });

    // Hide custom cursor when leaving the window
    document.addEventListener("mouseleave", () => {
        gsap.to([".custom-cursor", ".custom-cursor-follower"], { opacity: 0, duration: 0.3 });
    });
    document.addEventListener("mouseenter", () => {
        gsap.to([".custom-cursor", ".custom-cursor-follower"], { opacity: 1, duration: 0.3 });
    });


    // ==========================================
    // 3. DYNAMIC NAVIGATION BAR
    // ==========================================
    // Hides the navbar when scrolling down, reveals it when scrolling up

    const navbar = document.querySelector('.navbar');
    
    const showNav = gsap.from(navbar, { 
        yPercent: -100,
        paused: true,
        duration: 0.4,
        ease: "power3.out"
    }).progress(1);

    ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
            // Ignore small scroll bounces at the very top
            if (self.scrollY < 50) {
                showNav.play();
                return;
            }
            // self.direction 1 is down, -1 is up
            if (self.direction === 1) {
                showNav.reverse();
            } else {
                showNav.play();
            }
        }
    });


    // ==========================================
    // 4. HERO PARALLAX EFFECT
    // ==========================================
    // Makes the background image move slightly slower than the page scrolls
    
    gsap.to(".parallax-bg", {
        yPercent: 30, // Moves the image down by 30% of its height
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true // Ties the animation frame perfectly to the scrollbar
        }
    });


    // ==========================================
    // 5. SCROLL REVEALS (Framer-style spring fade-ups)
    // ==========================================
    // Replaces the old Intersection Observer with bouncy GSAP math
    
    const fadeElements = document.querySelectorAll(".fade-up");

    fadeElements.forEach((el) => {
        gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out", // Gives that snappy, fast-then-slow premium feel
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Triggers when the top of the element hits 85% down the viewport
                toggleActions: "play none none reverse" // Animates in, and animates out if you scroll back up
            }
        });
    });


    // ==========================================
    // 6. STAGGERED GRID REVEALS
    // ==========================================
    // For services and pricing cards, we want them to pop in one after another
    
    // Services Grid
    gsap.to(".service-card", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15, // 0.15 second delay between each card
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Pricing Grid
    gsap.to(".price-card", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // ==========================================
    // 7. MARQUEE SCROLL INTERACTION (Optional Flair)
    // ==========================================
    // Speeds up or reverses the CSS marquee based on scroll direction
    
    let marqueeTween = gsap.to(".marquee-content", {
        xPercent: -50,
        repeat: -1,
        duration: 15,
        ease: "linear"
    }).timeScale(1);

    ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
            // Speed up the marquee when actively scrolling
            gsap.to(marqueeTween, { 
                timeScale: self.direction === 1 ? 2.5 : -2.5, 
                duration: 0.3 
            });
            
            // Return to normal speed when scrolling stops
            clearTimeout(window.marqueeTimer);
            window.marqueeTimer = setTimeout(() => {
                gsap.to(marqueeTween, { timeScale: 1, duration: 0.8 });
            }, 100);
        }
    });

});
