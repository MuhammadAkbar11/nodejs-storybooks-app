export const addAnimateClass = (
  element,
  options = {
    delay: 0.5,
    speed: "animate__faster",
    type: "animate__fadeIn",
  }
) => {
  element.style.setProperty("animation-delay", `${options.delay}s`);
  element.classList.add("animate__animated");
  element.classList.add(options.speed);
  element.classList.add(options.type);
};

export const removeAnimateClass = element => {
  [...element.classList].forEach(v => {
    if (v.startsWith("animate__")) {
      element.classList.remove(v);
    }
  });
};
