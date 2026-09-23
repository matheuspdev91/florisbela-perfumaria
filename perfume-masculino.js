import {
    animate,
    inView,
    hover,
    stagger
} from "https://cdn.jsdelivr.net/npm/motion@13.4.0/+esm";

"use strict";

/* =========================================================
   FLORISBELA — PERFUMARIA MASCULINA
   Motion.dev — versão cinematográfica
========================================================= */

const reduceMotion = false;

const ease = [0.16, 1, 0.3, 1];

/* =========================================================
   ELEMENTOS
========================================================= */

const hero = document.querySelector(".masc-hero");
const heroImage = document.querySelector(".masc-hero-image");
const heroShade = document.querySelector(".masc-hero-shade");
const heroContent = document.querySelector(".masc-hero-content");

const eyebrow = document.querySelector(".eyebrow-line");
const heroTitle = document.querySelector(".masc-hero h1");
const heroText = document.querySelector(".masc-hero-content > p");
const heroTags = document.querySelector(".masc-tags");
const scrollIndicator = document.querySelector(".masc-scroll");

const intro = document.querySelector(".masc-intro");
const introMarker = document.querySelector(".masc-intro .section-marker");
const introTitle = document.querySelector(".masc-intro h2");
const introText = document.querySelector(".masc-intro p");

const gallery = document.querySelector(".masc-gallery");
const galleryHeading = document.querySelector(".masc-gallery-heading");
const cards = [...document.querySelectorAll(".masc-card")];

console.log(
    `[Florisbela] Motion.dev ativo — ${cards.length} cards encontrados.`
);

/* =========================================================
   ESTADO INICIAL
========================================================= */

function setInitial(elements) {
    elements
        .filter(Boolean)
        .forEach((element) => {
            element.style.opacity = "0";
            element.style.willChange = "transform, opacity";
        });
}

function showAllImmediately() {
    [
        eyebrow,
        heroTitle,
        heroText,
        heroTags,
        scrollIndicator,
        introMarker,
        introTitle,
        introText,
        galleryHeading,
        ...cards
    ]
        .filter(Boolean)
        .forEach((element) => {
            element.style.opacity = "1";
            element.style.transform = "none";
            element.style.willChange = "auto";
        });
}

/* =========================================================
   REDUCED MOTION
========================================================= */

if (reduceMotion) {
    showAllImmediately();
} else {
    initAnimations();
}

/* =========================================================
   INIT
========================================================= */

function initAnimations() {
    heroAnimation();
    introAnimation();
    galleryAnimation();
    cardInteractions();
    ctaInteraction();
}

/* =========================================================
   HERO — ENTRADA CINEMATOGRÁFICA
========================================================= */

function heroAnimation() {
    const heroElements = [
        eyebrow,
        heroTitle,
        heroText,
        heroTags
    ].filter(Boolean);

    setInitial(heroElements);

    if (heroImage) {
        animate(
            heroImage,
            {
                scale: [1.10, 1]
            },
            {
                duration: 2.2,
                ease
            }
        );
    }

    if (heroShade) {
        animate(
            heroShade,
            {
                opacity: [0.45, 1]
            },
            {
                duration: 1.8,
                ease: "easeOut"
            }
        );
    }

    if (heroElements.length) {
        animate(
            heroElements,
            {
                opacity: [0, 1],
                y: [42, 0]
            },
            {
                duration: 1.05,
                delay: stagger(0.16, {
                    startDelay: 0.25
                }),
                ease
            }
        );
    }

    if (scrollIndicator) {
        scrollIndicator.style.opacity = "0";

        animate(
            scrollIndicator,
            {
                opacity: [0, 1],
                y: [10, 0]
            },
            {
                duration: 0.8,
                delay: 1.75,
                ease
            }
        );

        const line = scrollIndicator.querySelector("i");

        if (line) {
            line.style.transformOrigin = "top center";

            animate(
                line,
                {
                    scaleY: [0, 1]
                },
                {
                    duration: 0.8,
                    delay: 1.95,
                    ease
                }
            );
        }
    }

    /* PARALLAX DO HERO */

    if (hero && heroImage) {
        let ticking = false;

        window.addEventListener(
            "scroll",
            () => {
                if (ticking) return;

                ticking = true;

                requestAnimationFrame(() => {
                    const rect = hero.getBoundingClientRect();

                    if (
                        rect.bottom > 0 &&
                        rect.top < window.innerHeight
                    ) {
                        const progress = Math.max(
                            0,
                            Math.min(
                                1,
                                -rect.top /
                                Math.max(hero.offsetHeight, 1)
                            )
                        );

                        heroImage.style.translate =
                            `0 ${progress * 22}px`;
                    }

                    ticking = false;
                });
            },
            { passive: true }
        );
    }

    /* PARALLAX DO CONTEÚDO */

    if (hero && heroContent) {
        let ticking = false;

        window.addEventListener(
            "scroll",
            () => {
                if (ticking) return;

                ticking = true;

                requestAnimationFrame(() => {
                    const rect = hero.getBoundingClientRect();

                    if (
                        rect.bottom > 0 &&
                        rect.top < window.innerHeight
                    ) {
                        const progress = Math.max(
                            0,
                            Math.min(
                                1,
                                -rect.top /
                                Math.max(hero.offsetHeight, 1)
                            )
                        );

                        heroContent.style.translate =
                            `0 ${progress * -12}px`;
                    }

                    ticking = false;
                });
            },
            { passive: true }
        );
    }
}

/* =========================================================
   INTRO
========================================================= */

function introAnimation() {
    if (!intro) return;

    const elements = [
        introMarker,
        introTitle,
        introText
    ].filter(Boolean);

    setInitial(elements);

    inView(
        intro,
        () => {
            animate(
                elements,
                {
                    opacity: [0, 1],
                    y: [42, 0]
                },
                {
                    duration: 1,
                    delay: stagger(0.14),
                    ease
                }
            );
        },
        {
            amount: 0.18,
            once: true
        }
    );
}

/* =========================================================
   GALERIA
========================================================= */

function galleryAnimation() {
    if (!gallery) return;

    /* TÍTULO */

    if (galleryHeading) {
        setInitial([galleryHeading]);

        inView(
            galleryHeading,
            () => {
                animate(
                    galleryHeading,
                    {
                        opacity: [0, 1],
                        y: [48, 0]
                    },
                    {
                        duration: 1,
                        ease
                    }
                );
            },
            {
                amount: 0.2,
                once: true
            }
        );
    }

    /* CARDS */

    cards.forEach((card, index) => {
        const image = card.querySelector("img");
        const category = card.querySelector(
            ".masc-card__category"
        );
        const title = card.querySelector(
            ".masc-card__info h3"
        );
        const link = card.querySelector(
            ".masc-card__link"
        );

        card.style.opacity = "0";
        card.style.willChange = "transform, opacity";

        if (image) {
            image.style.willChange = "transform";
        }

        [category, title, link]
            .filter(Boolean)
            .forEach((element) => {
                element.style.opacity = "0";
                element.style.willChange =
                    "transform, opacity";
            });

        inView(
            card,
            () => {

                /* CARD */

                animate(
                    card,
                    {
                        opacity: [0, 1],
                        y: [55, 0],
                        scale: [0.965, 1]
                    },
                    {
                        duration: 1.05,
                        delay: index * 0.07,
                        ease
                    }
                );

                /* IMAGEM */

                if (image) {
                    animate(
                        image,
                        {
                            scale: [1.055, 1]
                        },
                        {
                            duration: 1.35,
                            delay: index * 0.07,
                            ease
                        }
                    );
                }

                /* TEXTO */

                const infoElements = [
                    category,
                    title,
                    link
                ].filter(Boolean);

                if (infoElements.length) {
                    animate(
                        infoElements,
                        {
                            opacity: [0, 1],
                            y: [18, 0]
                        },
                        {
                            duration: 0.65,
                            delay: 0.16 + index * 0.07,
                            stagger: 0.07,
                            ease
                        }
                    );
                }

            },
            {
                amount: 0.13,
                margin: "0px 0px -60px 0px",
                once: true
            }
        );
    });
}

/* =========================================================
   HOVER DOS CARDS
========================================================= */

function cardInteractions() {
    cards.forEach((card) => {

        const image = card.querySelector("img");
        const info = card.querySelector(
            ".masc-card__info"
        );

        hover(card, () => {

            animate(
                card,
                {
                    y: -7
                },
                {
                    type: "spring",
                    stiffness: 300,
                    damping: 24
                }
            );

            if (image) {
                animate(
                    image,
                    {
                        scale: 1.045
                    },
                    {
                        type: "spring",
                        stiffness: 220,
                        damping: 20
                    }
                );
            }

            if (info) {
                animate(
                    info,
                    {
                        y: -5
                    },
                    {
                        type: "spring",
                        stiffness: 280,
                        damping: 22
                    }
                );
            }

            return () => {

                animate(
                    card,
                    {
                        y: 0
                    },
                    {
                        type: "spring",
                        stiffness: 300,
                        damping: 24
                    }
                );

                if (image) {
                    animate(
                        image,
                        {
                            scale: 1
                        },
                        {
                            type: "spring",
                            stiffness: 220,
                            damping: 20
                        }
                    );
                }

                if (info) {
                    animate(
                        info,
                        {
                            y: 0
                        },
                        {
                            type: "spring",
                            stiffness: 280,
                            damping: 22
                        }
                    );
                }
            };
        });

        /* SETA */

        const link = card.querySelector(
            ".masc-card__link"
        );

        const arrow = link?.querySelector("span");

        if (link && arrow) {

            hover(link, () => {

                animate(
                    arrow,
                    {
                        x: 5,
                        y: -5
                    },
                    {
                        type: "spring",
                        stiffness: 400,
                        damping: 18
                    }
                );

                return () => {

                    animate(
                        arrow,
                        {
                            x: 0,
                            y: 0
                        },
                        {
                            type: "spring",
                            stiffness: 400,
                            damping: 18
                        }
                    );

                };
            });
        }
    });
}

/* =========================================================
   CTA
========================================================= */

function ctaInteraction() {

    const ctaButton =
        document.querySelector(".masc-cta .button");

    if (!ctaButton) return;

    ctaButton.style.opacity = "0";

    inView(
        ctaButton,
        () => {

            animate(
                ctaButton,
                {
                    opacity: [0, 1],
                    y: [20, 0]
                },
                {
                    duration: 0.8,
                    ease
                }
            );

        },
        {
            amount: 0.4,
            once: true
        }
    );

    hover(ctaButton, () => {

        animate(
            ctaButton,
            {
                y: -4,
                scale: 1.025
            },
            {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        );

        return () => {

            animate(
                ctaButton,
                {
                    y: 0,
                    scale: 1
                },
                {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }
            );

        };
    });
}