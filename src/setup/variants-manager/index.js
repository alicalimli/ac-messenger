export const VARIANTS_MANAGER = {
  'slide-in': {
    x:0,
    opacity: 1,
    transition: { type: "spring", mass: 0.25 }
  },
  'slide-from-left': {
    x: "-50%",
    opacity: 0,
    transition: { type: "spring", mass: 0.25 }
  },
  'slide-from-right': {
    x: "50%",
    opacity: 0,
    transition: { type: "spring", mass: 0.25 }
  }
}