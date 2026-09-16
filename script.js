document.addEventListener("DOMContentLoaded", () => {
    initHeroVideo();
    initSmoothScroll();
    initFlorisbelaAnimations();
});

function initHeroVideo() {
    const video = document.querySelector(".hero-video");
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
        if (video.paused) {
            video.play().catch(() => {
                console.warn("Florisbela: reprodução automática bloqueada.");
            });
        }
    };

    if (video.readyState >= 2) {
        playVideo();
    } else {
        video.addEventListener("loadeddata", playVideo, { once: true });
        video.addEventListener("canplay", playVideo, { once: true });
    }

    document.addEventListener("click", playVideo, { once: true });

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) playVideo();
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const selector = link.getAttribute("href");
            if (!selector || selector === "#") return;

            const target = document.querySelector(selector);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

function initFlorisbelaAnimations() {
    if (typeof anime === "undefined") return;

    const isPerfumePage = document.querySelector(".perfume-hero");

    if (isPerfumePage) {
        initPerfumePageAnimations();
    } else {
        initHomeAnimations();
    }
}

function initPerfumePageAnimations() {
    document.body.classList.add("anime-ready");

    const heroImage = document.querySelector(".perfume-hero__image");
    const heroOverlay = document.querySelector(".perfume-hero__overlay");
    const eyebrow = document.querySelector(".perfume-hero__eyebrow");
    const title = document.querySelector(".perfume-hero__content h1");
    const description = document.querySelector(".perfume-hero__content p");

    const introItems = document.querySelectorAll(
        ".perfume-intro .section-eyebrow, .perfume-intro h2, .perfume-intro p"
    );

    const catalogHeader = document.querySelector(".perfume-catalog__header");
    const cards = document.querySelectorAll(".perfume-card");
    const cta = document.querySelector(".perfume-cta__content");
    const footer = document.querySelector(".site-footer__inner");

    const heroTimeline = anime.timeline({
        easing: "easeOutExpo"
    });

    heroTimeline
        .add({
            targets: heroImage,
            opacity: [0, 1],
            scale: [1.15, 1],
            duration: 1500
        })
        .add({
            targets: heroOverlay,
            opacity: [0, 1],
            duration: 900
        }, "-=1050")
        .add({
            targets: eyebrow,
            opacity: [0, 1],
            translateY: [18, 0],
            duration: 700
        }, "-=350")
        .add({
            targets: title,
            opacity: [0, 1],
            translateY: [42, 0],
            duration: 950
        }, "-=520")
        .add({
            targets: description,
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 750
        }, "-=620");

    initReveal(introItems, {
        translateY: 42,
        duration: 900,
        stagger: 110
    });

    initReveal(catalogHeader, {
        translateY: 35,
        duration: 800
    });

    initReveal(cards, {
        translateY: 55,
        scale: [0.985, 1],
        duration: 850,
        stagger: 100
    });

    initReveal(cta, {
        translateY: 45,
        duration: 900
    });

    initReveal(footer, {
        translateY: 25,
        duration: 700
    });
}

function initReveal(targets, options = {}) {
    if (!targets || (targets.length === 0 && !targets.nodeType)) return;

    const elementList = targets.nodeType ? [targets] : Array.from(targets);
    elementList.forEach((element) => element.classList.add("ff-reveal"));

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            anime({
                targets: entry.target,
                opacity: [0, 1],
                translateY: options.translateY ? [options.translateY, 0] : [35, 0],
                scale: options.scale ?? [1, 1],
                duration: options.duration ?? 800,
                easing: "easeOutExpo",
                delay: options.delay ?? 0
            });

            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px"
    });

    elementList.forEach((element) => observer.observe(element));
}

function initHomeAnimations() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const content = hero.querySelector(".hero-content");
    const eyebrow = hero.querySelector(".eyebrow");
    const title = hero.querySelector("h1");
    const text = hero.querySelector(".hero-text");
    const actions = hero.querySelector(".hero-actions");

    if (!content || !eyebrow || !title) return;

    anime.timeline({ easing: "easeOutExpo" })
        .add({
            targets: content,
            opacity: [0, 1],
            duration: 900
        })
        .add({
            targets: eyebrow,
            opacity: [0, 1],
            translateY: [18, 0],
            duration: 650
        }, "-=600")
        .add({
            targets: title,
            opacity: [0, 1],
            translateY: [38, 0],
            duration: 900
        }, "-=480")
        .add({
            targets: [text, actions].filter(Boolean),
            opacity: [0, 1],
            translateY: [22, 0],
            duration: 700,
            delay: anime.stagger(90)
        }, "-=600");

    initReveal(document.querySelectorAll(".intro-content, .section-heading, .collection-card, .note-row, .final-cta-inner"), {
        translateY: 40,
        duration: 850
    });

    initReveal(document.querySelectorAll(".collection-card"), {
        translateY: 45,
        duration: 750,
        stagger: 120
    });
}
