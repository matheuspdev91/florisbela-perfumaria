import {
    animate,
    inView,
    hover,
    stagger
} from "https://cdn.jsdelivr.net/npm/motion@13.4.0/+esm";

"use strict";

/* =========================================================
   FLORISBELA — PERFUMARIA FEMININA
   Motion.dev — mesmo padrão da página masculina
========================================================= */

/*
   Durante o desenvolvimento, mantemos Motion ativo mesmo
   quando o navegador informa prefers-reduced-motion.
*/

const reduceMotion = false;

const ease = [0.16, 1, 0.3, 1];

/* =========================================================
   ELEMENTOS
========================================================= */

const hero = document.querySelector(".fem-hero");
const heroImage = document.querySelector(".fem-hero-image");
const heroShade = document.querySelector(".fem-hero-shade");
const heroContent = document.querySelector(".fem-hero-content");

const eyebrow = document.querySelector(
    ".fem-hero .eyebrow-line"
);

const heroTitle = document.querySelector(
    ".fem-hero h1"
);

const heroText = document.querySelector(
    ".fem-hero-content > p"
);

const heroTags = document.querySelector(
    ".fem-tags"
);

const scrollIndicator = document.querySelector(
    ".fem-scroll"
);

const intro = document.querySelector(
    ".fem-intro"
);

const introMarker = document.querySelector(
    ".fem-intro .section-marker"
);

const introTitle = document.querySelector(
    ".fem-intro h2"
);

const introText = document.querySelector(
    ".fem-intro p"
);

const gallery = document.querySelector(
    ".fem-gallery"
);

const galleryHeading = document.querySelector(
    ".fem-gallery-heading"
);

const galleryGrid = document.querySelector(
    ".fem-gallery-grid"
);

const cards = [
    ...document.querySelectorAll(".fem-card")
];

const cta = document.querySelector(
    ".fem-cta"
);

const ctaLabel = document.querySelector(
    ".fem-cta > span"
);

const ctaTitle = document.querySelector(
    ".fem-cta h2"
);

const ctaButton = document.querySelector(
    ".fem-cta .button"
);

console.log(
    `[Florisbela] Motion.dev feminino ativo — ${cards.length} cards encontrados.`
);

/* =========================================================
   ESTADO INICIAL
========================================================= */

function setInitial(elements) {
    elements
        .filter(Boolean)
        .forEach((element) => {
            element.style.opacity = "0";
            element.style.willChange =
                "transform, opacity";
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

        ...cards,

        ctaLabel,
        ctaTitle,
        ctaButton
    ]
        .filter(Boolean)
        .forEach((element) => {
            element.style.opacity = "1";
            element.style.transform = "none";
            element.style.willChange = "auto";
        });
}

/* =========================================================
   INIT
========================================================= */

if (reduceMotion) {

    showAllImmediately();

} else {

    initAnimations();

}

function initAnimations() {

    heroAnimation();

    introAnimation();

    galleryAnimation();

    cardInteractions();

    ctaAnimation();

}

/* =========================================================
   HERO
========================================================= */

function heroAnimation() {

    const elements = [
        eyebrow,
        heroTitle,
        heroText,
        heroTags
    ].filter(Boolean);

    setInitial(elements);

    /* -----------------------------------------
       IMAGEM
    ----------------------------------------- */

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

    /* -----------------------------------------
       OVERLAY
    ----------------------------------------- */

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

    /* -----------------------------------------
       CONTEÚDO
    ----------------------------------------- */

    if (elements.length) {

        animate(
            elements,
            {
                opacity: [0, 1],
                y: [42, 0]
            },
            {
                duration: 1.05,

                delay: stagger(
                    0.16,
                    {
                        startDelay: 0.25
                    }
                ),

                ease
            }
        );

    }

    /* -----------------------------------------
       SCROLL INDICATOR
    ----------------------------------------- */

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

        const line =
            scrollIndicator.querySelector("i");

        if (line) {

            line.style.transformOrigin =
                "top center";

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

    /* =================================================
       PARALLAX DA IMAGEM
    ================================================= */

    if (hero && heroImage) {

        let ticking = false;

        window.addEventListener(
            "scroll",
            () => {

                if (ticking) return;

                ticking = true;

                requestAnimationFrame(() => {

                    const rect =
                        hero.getBoundingClientRect();

                    if (
                        rect.bottom > 0 &&
                        rect.top <
                        window.innerHeight
                    ) {

                        const progress =
                            Math.max(
                                0,
                                Math.min(
                                    1,
                                    -rect.top /
                                    Math.max(
                                        hero.offsetHeight,
                                        1
                                    )
                                )
                            );

                        heroImage.style.translate =
                            `0 ${progress * 22}px`;

                    }

                    ticking = false;

                });

            },
            {
                passive: true
            }
        );

    }

    /* =================================================
       PARALLAX DO CONTEÚDO
    ================================================= */

    if (hero && heroContent) {

        let ticking = false;

        window.addEventListener(
            "scroll",
            () => {

                if (ticking) return;

                ticking = true;

                requestAnimationFrame(() => {

                    const rect =
                        hero.getBoundingClientRect();

                    if (
                        rect.bottom > 0 &&
                        rect.top <
                        window.innerHeight
                    ) {

                        const progress =
                            Math.max(
                                0,
                                Math.min(
                                    1,
                                    -rect.top /
                                    Math.max(
                                        hero.offsetHeight,
                                        1
                                    )
                                )
                            );

                        heroContent.style.translate =
                            `0 ${progress * -12}px`;

                    }

                    ticking = false;

                });

            },
            {
                passive: true
            }
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

                    delay: stagger(
                        0.14
                    ),

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

    if (!galleryGrid) return;

    /* -----------------------------------------
       TÍTULO DA GALERIA
    ----------------------------------------- */

    if (galleryHeading) {

        setInitial([
            galleryHeading
        ]);

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

    /* -----------------------------------------
       CARDS
    ----------------------------------------- */

    cards.forEach(
        (card, index) => {

            const image = card.querySelector(
                ".fem-card-image img"
            );

            const category = card.querySelector(
                ".fem-card__category"
            );

            const title = card.querySelector(
                ".fem-card__info h3"
            );

            const link = card.querySelector(
                ".fem-card__link"
            );

            card.style.opacity = "0";
            card.style.willChange =
                "transform, opacity";

            if (image) {
                image.style.willChange =
                    "transform";
            }

            [
                category,
                title,
                link
            ]
                .filter(Boolean)
                .forEach((element) => {

                    element.style.opacity = "0";

                    element.style.willChange =
                        "transform, opacity";

                });

            /* Estado inicial */

            card.style.opacity = "1";

            card.style.willChange =
                "transform, opacity";

            if (image) {

                image.style.willChange =
                    "transform";

            }

            [
                category,
                title,
                link
            ]
                .filter(Boolean)
                .forEach((element) => {
                    element.style.opacity = "0";
                    element.style.willChange =
                        "transform, opacity";
                });

            /* ---------------------------------
               IN VIEW
            --------------------------------- */

            inView(
                card,
                () => {

                    /* CARD */

                    animate(
                        card,
                        {
                            opacity: [0, 1],

                            y: [55, 0],

                            scale: [
                                0.965,
                                1
                            ]
                        },
                        {
                            duration: 1.05,

                            delay:
                                index * 0.07,

                            ease
                        }
                    );

                    /* IMAGEM */

                    if (image) {

                        animate(
                            image,
                            {
                                scale: [
                                    1.055,
                                    1
                                ]
                            },
                            {
                                duration: 1.35,

                                delay:
                                    index *
                                    0.07,

                                ease
                            }
                        );

                    }

                    /* TEXTO */

                    const text =
                        [
                            category,
                            title,
                            link
                        ]
                            .filter(Boolean);

                    if (text.length) {

                        animate(
                            text,
                            {
                                opacity: [
                                    0,
                                    1
                                ],

                                y: [
                                    16,
                                    0
                                ]
                            },
                            {
                                duration: 0.65,

                                delay:
                                    0.16 +
                                    index *
                                    0.07,

                                stagger: 0.07,

                                ease
                            }
                        );

                    }

                },
                {
                    amount: 0.13,

                    margin:
                        "0px 0px -60px 0px",

                    once: true
                }
            );

        }
    );

}

/* =========================================================
   HOVER DOS CARDS
========================================================= */

function cardInteractions() {

    cards.forEach(
        (card) => {

            const image =
                card.querySelector(
                    ".fem-card-image img"
                );

            const caption =
                card.querySelector(
                    "figcaption"
                );

            hover(
                card,
                () => {

                    /* CARD */

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

                    /* IMAGEM */

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

                    /* LEGENDA */

                    if (caption) {

                        animate(
                            caption,
                            {
                                y: -4
                            },
                            {
                                type: "spring",

                                stiffness: 280,

                                damping: 22
                            }
                        );

                    }

                    /* RESET */

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

                        if (caption) {

                            animate(
                                caption,
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

                }
            );

        }
    );

}

/* =========================================================
   CTA
========================================================= */

function ctaAnimation() {

    if (!cta) return;

    const elements = [
        ctaLabel,
        ctaTitle,
        ctaButton
    ].filter(Boolean);

    setInitial(elements);

    inView(
        cta,
        () => {

            animate(
                elements,
                {
                    opacity: [0, 1],
                    y: [28, 0]
                },
                {
                    duration: 0.9,

                    delay: stagger(
                        0.12
                    ),

                    ease
                }
            );

        },
        {
            amount: 0.25,
            once: true
        }
    );

    /* -----------------------------------------
       HOVER DO CTA
    ----------------------------------------- */

    if (ctaButton) {

        hover(
            ctaButton,
            () => {

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

            }
        );

    }

}