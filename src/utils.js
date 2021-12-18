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

export const addMultipleClass = (el, clsNames) => {
  clsNames.split(" ").map(cls => {
    el.classList.add(cls);
  });
};

const appearOptionsDefault = {
  mt: "250px",
  mr: "0px",
  mb: "0px",
  ml: "0px",
};

export const appearOnScroll = (classNames, options = appearOptionsDefault) =>
  new IntersectionObserver(
    function (entries, appearOnScroll) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          addMultipleClass(entry.target, classNames);
          appearOnScroll.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: `${options.mt} ${options.mr} ${options.mb} ${options.ml}`,
    }
  );

// faders.forEach(fader => {
//   appearOnScroll.observe(fader);
// });
