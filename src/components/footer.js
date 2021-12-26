import { appearOnScroll } from "../utils";

const footer = document.querySelector(".footer");

if (footer) {
  const divider = footer.querySelector("hr");
  const copyright = footer.querySelector(".footer-copyright");

  const footerNavLinks = [].slice.call(
    footer.querySelectorAll(".footer-nav .nav-item")
  );

  footerNavLinks.forEach((link, i) => {
    link.style.setProperty("animation-delay", `.${i + 1}s`);
    appearOnScroll(
      "animate__animated animate__fadeInUp animate_faster"
    ).observe(link);
  });

  divider.parentElement.style.setProperty("animation-delay", `.5s`);
  appearOnScroll("animate__animated animate__fadeIn animate_faster").observe(
    divider.parentElement
  );
  copyright.style.setProperty("animation-delay", `.6s`);
  appearOnScroll("animate__animated animate__fadeInUp animate_faster").observe(
    copyright
  );
}
