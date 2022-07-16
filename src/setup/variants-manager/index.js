const MASS_TRANSITION = { type: "spring", mass: 0.25 };

export const VARIANTS_MANAGER = {
  'slide-in': {
    x:0,
    opacity: 1,
    transition: MASS_TRANSITION,
  },
  'slide-from-left': {
    x: "-50%",
    opacity: 0,
    transition: MASS_TRANSITION,
  },
  'slide-from-right': {
    x: "50%",
    opacity: 0,
    transition: MASS_TRANSITION,
  }
}