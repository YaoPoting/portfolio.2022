const hoverElements = document.querySelectorAll('.bigger');

hoverElements.forEach((el) => {
    const animation = gsap.to(el, {
        scale: 1.05,
        rotate: -3,
        duration: 0.3,
        paused: true,
        ease: "power1.out"
    });
    el.addEventListener("mouseenter", () => animation.play());
    el.addEventListener("mouseleave", () => animation.reverse());
});

gsap.registerPlugin(ScrollTrigger);

const sections = [
    { trigger: ".myCard-container", target: ".myCard" },
    { trigger: ".white-container", target: ".white" },
    { trigger: ".prize-container", target: ".prize" }
];

sections.forEach(section => {
    gsap.from(section.target, {
        scrollTrigger: {
            trigger: section.trigger,
            start: "top 75%",
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.3,
        ease: "power2.out"
    });
});

gsap.to(".girl", {
    scrollTrigger: {
        trigger: ".girl",
        start: "top 80%",
        once: true
    },
    y: -15,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});