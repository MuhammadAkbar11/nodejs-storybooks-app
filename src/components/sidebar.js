import { addAnimateClass, removeAnimateClass } from "../utils";

const offcanvasElementList = [].slice.call(
  document.querySelectorAll(".offcanvas")
);

offcanvasElementList.map(offCanvas => {
  const offCanvasTitle = offCanvas.querySelector(".offcanvas-title");
  const offCanvasClose = offCanvas.querySelector(".offcanvas-btn-close");
  const sidebarNav = offCanvas.querySelector(".sidebar-nav");
  const navLinks = [].slice.call(sidebarNav.querySelectorAll(".nav-link"));
  offCanvas.addEventListener("show.bs.offcanvas", function () {
    addAnimateClass(offCanvasTitle, {
      delay: 0.8,
      type: "animate__fadeInLeft",
      speed: "animate__fast",
    });
    addAnimateClass(offCanvasClose, {
      delay: 0.1,
      speed: "animate__faster",
      type: "animate__fadeInLeftBig",
    });

    navLinks.map((nv, i) => {
      addAnimateClass(nv, {
        delay: `.${i + 1}`,
        speed: "animate__faster",
        type: "animate__fadeInLeft",
      });
    });
  });

  offCanvas.addEventListener("hidden.bs.offcanvas", function () {
    removeAnimateClass(offCanvasTitle);
    removeAnimateClass(offCanvasClose);
    navLinks.map((nv, i) => {
      removeAnimateClass(nv);
    });
  });
});
