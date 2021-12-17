import { addAnimateClass, removeAnimateClass } from "../utils";

const breadcrumb = document.querySelector(".breadcrumb");

addAnimateClass(breadcrumb, {
  delay: 0.3,
  type: "animate__fadeInLeft",
  speed: "animate__fast",
});
