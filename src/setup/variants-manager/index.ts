const MASS_TRANSITION = { type: "spring", mass: 0.25 };

export const VARIANTS_MANAGER = {
  "fade-in": {
    opacity: 1,
  },
  "fade-out": {
    opacity: 0,
  },
  "slide-in": {
    x: 0,
    opacity: 1,
    transition: MASS_TRANSITION,
  },
  "slide-from-left": {
    x: "-20%",
    opacity: 0,
    transition: MASS_TRANSITION,
  },
  "slide-from-right": {
    x: "20%",
    opacity: 0,
    transition: MASS_TRANSITION,
  },
  "pop-in": {
    opacity: 1,
    y: "0",
    scale: 1,
  },
  "pop-out": {
    opacity: 0.3,
    y: "-20%",
    scale: 0.5,
  },
  "toast-slide-down": {
    y: 0,
    x: "-50",
  },
  "toast-slide-up": {
    y: "-100%",
    x: "-50%",
  },
};
