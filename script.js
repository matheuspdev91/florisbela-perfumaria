import {
    animate,
    stagger
} from "https://cdn.jsdelivr.net/npm/motion@13.4.0/+esm";


/* =========================================================
   FLORISBELA — MOTION SYSTEM
   ========================================================= */

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const isTouch = window.matchMedia(
    "(pointer: coarse)"
).matches;


/* =========================================================
   DEBUG
   ========================================================= */

console.log("🌸 Florisbela Motion carregado.");
console.log("prefers-reduced-motion:", reduceMotion);
console.log("pointer coarse:", isTouch);


/* =========================================================
   NAVEGAÇÃO
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const id = link.getAttribute("href");

        if (!id || id === "#") {
            return;
        }

        const target = document.querySelector(id);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   VÍDEOS
   ---------------------------------------------------------
   Controla reprodução conforme o vídeo entra/sai da tela.
   ========================================================= */

const videos = document.querySelectorAll("video");

const videoObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            const video = entry.target;

            if (entry.isIntersecting) {

                video.play().catch(() => { });

            } else {

                video.pause();

            }

        });

    },
    {
        threshold: 0.15
    }
);

videos.forEach((video) => {
    videoObserver.observe(video);
});


/* =========================================================
   HERO — ENTRADA
   ========================================================= */

const hero = document.querySelector(".hero");

if (hero) {

    const heroItems = hero.querySelectorAll(
        ".hero-center > *"
    );

    if (heroItems.length) {

        if (reduceMotion) {

            heroItems.forEach((item) => {
                item.style.opacity = "1";
            });

        } else {

            animate(
                heroItems,
                {
                    opacity: [0, 1],
                    y: [24, 0]
                },
                {
                    duration: 1.1,
                    delay: stagger(0.12),
                    ease: [0.22, 1, 0.36, 1]
                }
            );

        }

    }

}


/* =========================================================
   HERO VIDEO — PARALLAX
   ========================================================= */

const heroMedia = document.querySelector(
    ".hero-media"
);

const heroVideo = heroMedia?.querySelector(
    "video"
);

if (
    heroMedia &&
    heroVideo &&
    !reduceMotion &&
    !isTouch
) {

    pointerMotion(
        heroMedia,
        heroVideo,
        {
            x: 5,
            y: 4,
            scale: 1.015
        }
    );

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealGroups = [

    {
        selector: ".section-marker",
        y: 20,
        duration: 0.8
    },

    {
        selector: ".intro-title-wrap",
        y: 35,
        duration: 0.9
    },

    {
        selector: ".intro-media",
        y: 35,
        duration: 0.9
    },

    {
        selector: ".collection-heading",
        y: 30,
        duration: 0.8
    },

    {
        selector: ".collection-card",
        y: 40,
        duration: 0.9
    },

    {
        selector: ".notes-copy",
        y: 35,
        duration: 0.9
    },

    {
        selector: ".note-card",
        y: 30,
        duration: 0.8
    },

    {
        selector: ".final-cta-inner",
        y: 40,
        duration: 1
    },

    {
        selector: ".site-footer",
        y: 25,
        duration: 0.8
    }

];


if (!reduceMotion) {

    revealGroups.forEach((group) => {

        const elements =
            document.querySelectorAll(
                group.selector
            );

        if (!elements.length) {
            return;
        }

        elements.forEach((element) => {

            element.style.opacity = "0";

            animate(
                element,
                {
                    opacity: [0, 1],
                    y: [group.y, 0]
                },
                {
                    duration: group.duration,
                    ease: [0.22, 1, 0.36, 1],
                    autoplay: false
                }
            ).stop();

        });

    });

}


/* =========================================================
   SCROLL REVEAL — OBSERVER
   ========================================================= */

if (!reduceMotion) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element =
                        entry.target;

                    const selector =
                        [...revealGroups].find(
                            (group) =>
                                element.matches(
                                    group.selector
                                )
                        );

                    if (!selector) {
                        observer.unobserve(element);
                        return;
                    }

                    animate(
                        element,
                        {
                            opacity: [0, 1],
                            y: [selector.y, 0]
                        },
                        {
                            duration: selector.duration,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ]
                        }
                    );

                    observer.unobserve(element);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px"
            }
        );


    revealGroups.forEach((group) => {

        const elements =
            document.querySelectorAll(
                group.selector
            );

        elements.forEach((element) => {

            revealObserver.observe(element);

        });

    });

}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

if (reduceMotion) {

    document
        .querySelectorAll(
            [
                ".section-marker",
                ".intro-title-wrap",
                ".intro-media",
                ".collection-heading",
                ".collection-card",
                ".notes-copy",
                ".note-card",
                ".final-cta-inner",
                ".site-footer"
            ].join(",")
        )
        .forEach((element) => {

            element.style.opacity = "1";
            element.style.transform = "none";

        });

}


/* =========================================================
   ESSÊNCIA — VIDEO PARALLAX
   ========================================================= */

const essenceMedia = document.querySelector(
    ".intro-media"
);

const essenceVideo = essenceMedia?.querySelector(
    "video"
);

if (
    essenceMedia &&
    essenceVideo &&
    !reduceMotion &&
    !isTouch
) {

    pointerMotion(
        essenceMedia,
        essenceVideo,
        {
            x: 11,
            y: 7,
            scale: 1.025
        }
    );

}


/* =========================================================
   ESSÊNCIA — TITLE PARALLAX
   ========================================================= */

const essenceTitle = document.querySelector(
    ".intro-title-wrap"
);

if (
    essenceTitle &&
    !reduceMotion &&
    !isTouch
) {

    pointerMotion(
        essenceTitle,
        essenceTitle,
        {
            x: 3,
            y: 2,
            scale: 1
        }
    );

}


/* =========================================================
   COLLECTION
   ========================================================= */

const collectionCards =
    document.querySelectorAll(
        ".collection-card"
    );


collectionCards.forEach((card) => {

    const video =
        card.querySelector("video");

    /*
     * CORREÇÃO:
     *
     * Antes:
     * .collection-card-copy
     *
     * HTML real:
     * .card-copy
     */

    const content =
        card.querySelector(".card-copy");


    if (
        reduceMotion ||
        isTouch
    ) {
        return;
    }


    /* -----------------------------------------------------
       VIDEO
       ----------------------------------------------------- */

    if (video) {

        pointerMotion(
            card,
            video,
            {
                x: 8,
                y: 6,
                scale: 1.035
            }
        );

    }


    /* -----------------------------------------------------
       TEXTO
       ----------------------------------------------------- */

    if (content) {

        pointerMotion(
            card,
            content,
            {
                x: 3,
                y: 2,
                scale: 1
            }
        );

    }

});


/* =========================================================
   COLLECTION — HOVER EXTRA
   ========================================================= */

collectionCards.forEach((card) => {

    if (reduceMotion || isTouch) {
        return;
    }

    const arrow =
        card.querySelector(".card-copy b i");

    if (!arrow) {
        return;
    }


    card.addEventListener(
        "pointerenter",
        () => {

            animate(
                arrow,
                {
                    x: 6
                },
                {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                }
            );

        }
    );


    card.addEventListener(
        "pointerleave",
        () => {

            animate(
                arrow,
                {
                    x: 0
                },
                {
                    type: "spring",
                    stiffness: 250,
                    damping: 18
                }
            );

        }
    );

});


/* =========================================================
   NOTES
   ========================================================= */

const notes =
    document.querySelectorAll(
        ".note-card"
    );


notes.forEach((note) => {

    const art =
        note.querySelector(".note-art");


    if (
        !art ||
        reduceMotion ||
        isTouch
    ) {
        return;
    }


    let rect = null;


    /* -----------------------------------------------------
       ENTER
       ----------------------------------------------------- */

    note.addEventListener(
        "pointerenter",
        () => {

            rect =
                note.getBoundingClientRect();

            animate(
                art,
                {
                    scale: 1.035
                },
                {
                    duration: 0.45,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ]
                }
            );

        }
    );


    /* -----------------------------------------------------
       MOVE
       ----------------------------------------------------- */

    note.addEventListener(
        "pointermove",
        (event) => {

            if (!rect) {

                rect =
                    note.getBoundingClientRect();

            }


            const px =
                (event.clientX - rect.left) /
                rect.width -
                0.5;


            const py =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            animate(
                art,
                {
                    x: px * 5,
                    y: py * 4
                },
                {
                    duration: 0.25,
                    ease: "easeOut"
                }
            );

        }
    );


    /* -----------------------------------------------------
       LEAVE
       ----------------------------------------------------- */

    note.addEventListener(
        "pointerleave",
        () => {

            animate(
                art,
                {
                    x: 0,
                    y: 0,
                    scale: 1
                },
                {
                    type: "spring",
                    stiffness: 180,
                    damping: 22
                }
            );

            rect = null;

        }
    );

});


/* =========================================================
   BOTÕES MAGNÉTICOS
   =========================================================
   
   CORREÇÃO:
   
   HTML usa:
   
   .button
   .header-cta
   
   Não:
   
   .btn
   .hero-cta
   ========================================================= */

const magneticElements =
    document.querySelectorAll(
        ".button, .header-cta"
    );


magneticElements.forEach((element) => {

    if (
        reduceMotion ||
        isTouch
    ) {
        return;
    }

    magnetic(
        element,
        5
    );

});


/* =========================================================
   PRESS DOS BOTÕES
   ========================================================= */

const buttons =
    document.querySelectorAll(
        ".button, .header-cta"
    );


buttons.forEach((button) => {

    if (reduceMotion) {
        return;
    }


    button.addEventListener(
        "pointerdown",
        () => {

            animate(
                button,
                {
                    scale: 0.97
                },
                {
                    duration: 0.12
                }
            );

        }
    );


    button.addEventListener(
        "pointerup",
        () => {

            animate(
                button,
                {
                    scale: 1
                },
                {
                    type: "spring",
                    stiffness: 400,
                    damping: 20
                }
            );

        }
    );


    button.addEventListener(
        "pointerleave",
        () => {

            animate(
                button,
                {
                    scale: 1
                },
                {
                    type: "spring",
                    stiffness: 400,
                    damping: 20
                }
            );

        }
    );

});


/* =========================================================
   FINAL CTA
   ========================================================= */

const finalCTA =
    document.querySelector(
        ".final-cta"
    );


if (
    finalCTA &&
    !reduceMotion &&
    !isTouch
) {

    /*
     * CORREÇÃO:
     *
     * HTML real:
     * .final-cta-inner
     *
     * Não:
     * .final-cta-content
     */

    const content =
        finalCTA.querySelector(
            ".final-cta-inner"
        );


    if (content) {

        pointerMotion(
            finalCTA,
            content,
            {
                x: 4,
                y: 3,
                scale: 1
            }
        );

    }

}


/* =========================================================
   POINTER MOTION
   ========================================================= */

function pointerMotion(
    container,
    target,
    options = {}
) {

    const {
        x = 8,
        y = 6,
        scale = 1
    } = options;


    let rect = null;


    /* -----------------------------------------------------
       ENTER
       ----------------------------------------------------- */

    container.addEventListener(
        "pointerenter",
        () => {

            rect =
                container.getBoundingClientRect();


            if (scale !== 1) {

                animate(
                    target,
                    {
                        scale
                    },
                    {
                        duration: 0.5,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1
                        ]
                    }
                );

            }

        }
    );


    /* -----------------------------------------------------
       MOVE
       ----------------------------------------------------- */

    container.addEventListener(
        "pointermove",
        (event) => {

            if (!rect) {

                rect =
                    container.getBoundingClientRect();

            }


            const px =
                (event.clientX - rect.left) /
                rect.width -
                0.5;


            const py =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            animate(
                target,
                {
                    x: px * x,
                    y: py * y
                },
                {
                    duration: 0.25,
                    ease: "easeOut"
                }
            );

        }
    );


    /* -----------------------------------------------------
       LEAVE
       ----------------------------------------------------- */

    container.addEventListener(
        "pointerleave",
        () => {

            animate(
                target,
                {
                    x: 0,
                    y: 0,
                    scale: 1
                },
                {
                    type: "spring",
                    stiffness: 180,
                    damping: 22
                }
            );


            rect = null;

        }
    );

}


/* =========================================================
   MAGNETIC
   ========================================================= */

function magnetic(
    element,
    strength = 5
) {

    let rect = null;


    /* -----------------------------------------------------
       ENTER
       ----------------------------------------------------- */

    element.addEventListener(
        "pointerenter",
        () => {

            rect =
                element.getBoundingClientRect();

        }
    );


    /* -----------------------------------------------------
       MOVE
       ----------------------------------------------------- */

    element.addEventListener(
        "pointermove",
        (event) => {

            if (!rect) {

                rect =
                    element.getBoundingClientRect();

            }


            const px =
                (event.clientX - rect.left) /
                rect.width -
                0.5;


            const py =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            animate(
                element,
                {
                    x: px * strength,
                    y: py * strength
                },
                {
                    duration: 0.22,
                    ease: "easeOut"
                }
            );

        }
    );


    /* -----------------------------------------------------
       LEAVE
       ----------------------------------------------------- */

    element.addEventListener(
        "pointerleave",
        () => {

            animate(
                element,
                {
                    x: 0,
                    y: 0
                },
                {
                    type: "spring",
                    stiffness: 180,
                    damping: 22
                }
            );


            rect = null;

        }
    );

}


/* =========================================================
   FIM
   ========================================================= */

console.log(
    "🌸 Florisbela Motion inicializado."
);