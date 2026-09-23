import {
    animate,
    inView,
    hover
} from "https://cdn.jsdelivr.net/npm/motion@13.4.0/+esm";

console.log("[Florisbela] body-splash.js carregado.");
console.log("[Florisbela] Motion.dev carregado.");

document.addEventListener("DOMContentLoaded", () => {

    /*
    ============================================================
    FLORISBELA — BODY SPLASH
    Motion.dev
    ============================================================
    */

    const ease = [0.16, 1, 0.3, 1];

    /*
    ============================================================
    HERO
    ============================================================
    */

    const heroElements = [
        {
            selector: ".body-eyebrow",
            y: 35,
            delay: 0
        },
        {
            selector: ".body-hero h1",
            y: 55,
            delay: 0.12
        },
        {
            selector: ".body-hero p",
            y: 35,
            delay: 0.28
        },
        {
            selector: ".body-tags",
            y: 25,
            delay: 0.42
        }
    ];

    heroElements.forEach(({ selector, y, delay }) => {

        const element = document.querySelector(selector);

        if (!element) {
            console.warn(
                `[Florisbela] Elemento não encontrado: ${selector}`
            );
            return;
        }

        /*
        Estado inicial
        */

        element.style.opacity = "0";

        animate(
            element,
            {
                opacity: [0, 1],
                y: [y, 0]
            },
            {
                duration: 1,
                delay,
                ease
            }
        );
    });


    /*
    ============================================================
    HERO ORBS
    ============================================================
    */

    const orbOne = document.querySelector(".orb-one");
    const orbTwo = document.querySelector(".orb-two");

    if (orbOne) {

        animate(
            orbOne,
            {
                x: [0, 25, -10, 0],
                y: [0, -20, 15, 0],
                scale: [1, 1.04, 0.98, 1]
            },
            {
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
            }
        );

    }

    if (orbTwo) {

        animate(
            orbTwo,
            {
                x: [0, -20, 15, 0],
                y: [0, 15, -15, 0],
                scale: [1, 1.05, 0.97, 1]
            },
            {
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut"
            }
        );

    }


    /*
    ============================================================
    SCROLL INDICATOR
    ============================================================
    */

    const scrollLine = document.querySelector(".body-scroll i");

    if (scrollLine) {

        animate(
            scrollLine,
            {
                scaleY: [0.45, 1, 0.45],
                opacity: [0.3, 1, 0.3]
            },
            {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        );

    }


    /*
    ============================================================
    REVEAL — SEÇÕES
    ============================================================
    */

    const sectionElements = document.querySelectorAll(
        ".body-section-marker, " +
        ".body-intro-grid h2, " +
        ".body-intro-grid p, " +
        ".body-gallery-heading, " +
        ".body-store, " +
        ".body-cta"
    );

    sectionElements.forEach((element, index) => {

        /*
        Estado inicial
        */

        element.style.opacity = "0";

        inView(
            element,
            (target) => {

                console.log(
                    "[Florisbela] Reveal:",
                    target
                );

                animate(
                    target,
                    {
                        opacity: [0, 1],
                        y: [50, 0]
                    },
                    {
                        duration: 1,
                        delay: index * 0.04,
                        ease
                    }
                );

            },
            {
                amount: 0.15
            }
        );

    });


    /*
    ============================================================
    CARDS
    ============================================================
    */

    const cards = document.querySelectorAll(".body-card");

    console.log(
        `[Florisbela] ${cards.length} cards encontrados.`
    );


    cards.forEach((card, index) => {

        const image = card.querySelector("img");
        const imageContainer =
            card.querySelector(".body-card-image");

        const caption =
            card.querySelector("figcaption");

        /*
        Estado inicial do card
        */

        card.style.opacity = "0";


        /*
        --------------------------------------------------------
        ENTRADA
        --------------------------------------------------------
        */

        inView(
            card,
            (target) => {

                console.log(
                    `[Florisbela] Card ${index + 1} entrou na tela.`
                );

                animate(
                    target,
                    {
                        opacity: [0, 1],
                        y: [70, 0]
                    },
                    {
                        duration: 1,
                        delay: index * 0.08,
                        ease
                    }
                );


                /*
                Imagem
                */

                if (image) {

                    animate(
                        image,
                        {
                            scale: [1.08, 1]
                        },
                        {
                            duration: 1.4,
                            delay: index * 0.08,
                            ease
                        }
                    );

                }


                /*
                Caption
                */

                if (caption) {

                    caption.style.opacity = "0";

                    animate(
                        caption,
                        {
                            opacity: [0, 1],
                            y: [20, 0]
                        },
                        {
                            duration: 0.8,
                            delay: 0.2 + index * 0.08,
                            ease
                        }
                    );

                }

            },
            {
                amount: 0.12
            }
        );


        /*
        --------------------------------------------------------
        HOVER
        --------------------------------------------------------
        */

        hover(card, (element) => {

            /*
            Card inteiro
            */

            animate(
                element,
                {
                    y: -8
                },
                {
                    duration: 0.35,
                    ease
                }
            );


            /*
            Container da imagem
            */

            if (imageContainer) {

                animate(
                    imageContainer,
                    {
                        scale: 1.015
                    },
                    {
                        duration: 0.5,
                        ease
                    }
                );

            }


            /*
            Imagem
            */

            if (image) {

                animate(
                    image,
                    {
                        scale: 1.035
                    },
                    {
                        duration: 0.7,
                        ease
                    }
                );

            }


            /*
            Glow
            */

            const glow =
                card.querySelector(".card-glow");

            if (glow) {

                animate(
                    glow,
                    {
                        opacity: 1,
                        x: 20
                    },
                    {
                        duration: 0.6,
                        ease
                    }
                );

            }


            /*
            Mouse saiu
            */

            return () => {

                animate(
                    element,
                    {
                        y: 0
                    },
                    {
                        duration: 0.45,
                        ease
                    }
                );


                if (imageContainer) {

                    animate(
                        imageContainer,
                        {
                            scale: 1
                        },
                        {
                            duration: 0.5,
                            ease
                        }
                    );

                }


                if (image) {

                    animate(
                        image,
                        {
                            scale: 1
                        },
                        {
                            duration: 0.7,
                            ease
                        }
                    );

                }


                if (glow) {

                    animate(
                        glow,
                        {
                            opacity: 0,
                            x: 0
                        },
                        {
                            duration: 0.6,
                            ease
                        }
                    );

                }

            };

        });

    });


    /*
    ============================================================
    STORE
    ============================================================
    */

    const store = document.querySelector(".body-store");

    if (store) {

        inView(
            store,
            (element) => {

                animate(
                    element,
                    {
                        opacity: [0, 1],
                        y: [60, 0]
                    },
                    {
                        duration: 1.1,
                        ease
                    }
                );

            },
            {
                amount: 0.1
            }
        );

    }


    /*
    ============================================================
    STORE LINK
    ============================================================
    */

    const storeLink =
        document.querySelector(".store-content a");

    if (storeLink) {

        hover(storeLink, (element) => {

            animate(
                element,
                {
                    x: 8
                },
                {
                    duration: 0.3,
                    ease
                }
            );

            return () => {

                animate(
                    element,
                    {
                        x: 0
                    },
                    {
                        duration: 0.3,
                        ease
                    }
                );

            };

        });

    }


    /*
    ============================================================
    CTA
    ============================================================
    */

    const cta =
        document.querySelector(".body-cta > a");

    if (cta) {

        hover(cta, (element) => {

            animate(
                element,
                {
                    y: -5,
                    scale: 1.04
                },
                {
                    duration: 0.3,
                    ease
                }
            );

            return () => {

                animate(
                    element,
                    {
                        y: 0,
                        scale: 1
                    },
                    {
                        duration: 0.3,
                        ease
                    }
                );

            };

        });

    }


    /*
    ============================================================
    FINAL
    ============================================================
    */

    console.log(
        "[Florisbela] Todas as animações foram inicializadas."
    );

});