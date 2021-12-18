import { appearOnScroll } from "../utils";

const storiesBox = [].slice.call(document.querySelectorAll(".story-box"));

storiesBox.forEach((sb, i) => {
  sb.style.setProperty("animation-delay", `.${i + 1}s`);
  appearOnScroll("animate__animated animate__fadeInUp animate_faster").observe(
    sb
  );
});
