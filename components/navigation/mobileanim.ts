const drawerEase = [0.76, 0, 0.24, 1] as [number, number, number, number]
const transition = {duration: 1, ease: drawerEase}

export const height = {
    initial: {
      height: 0
    },
    enter: {
      height: "auto",
      transition
    },
    exit: {
      height: 0,
      transition
    }
}
